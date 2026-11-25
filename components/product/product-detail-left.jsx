/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { showFavoriteToast } from "@/components/favorites/favorite-toast";
import { ProductDimensionsScrollButton } from "@/components/product/product-dimensions-scroll-button";
import { ProductInfoScrollButton } from "@/components/product/product-info-scroll-button";
import { SeoH1 } from "@/components/seo/seo-h1";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { PRODUCT_DETAIL_GRID_MQ } from "@/lib/layout/breakpoints";
import {
 productDetailActionButtonClass,
 productDetailActionIconClass,
 productDetailPanelClass,
 productDetailPriceAmountClass,
 productDetailPriceCurrencyClass,
 productDetailPriceRowClass,
 productDetailPriceTotalLabelClass,
} from "@/lib/layout/product-styles";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled, Payments } from "@/lib/icons";
import {
 getDisplayPriceItems,
 getFormattedProductPriceParts,
 getPriceItemDisplayAmount,
 getPriceItemLabel,
 getPriceBreakdownItems,
 getProductCardBottomLabel,
 getProductDisplayPrice,
 hasManualProductPriceTotal,
 getProductFavoriteToastLabel,
} from "@/lib/product-utils";
import { formatSeoTitle } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/favorites-provider";

const productBreadcrumbLinkClass =
 "inline-block scale-100 touch-manipulation transition-[scale,color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:text-charcoal motion-reduce:duration-150 motion-reduce:active:scale-100";

const productBreadcrumbRootLinkClass = cn(productBreadcrumbLinkClass, "origin-right");

const productBreadcrumbCategoryLinkClass = cn(
 productBreadcrumbLinkClass,
 "origin-left"
);

function formatLineItemPrice(item, locale, totalValue) {
 const lineAmount = getPriceItemDisplayAmount(item);
 const resolvedAmount = lineAmount ?? totalValue ?? null;

 if (resolvedAmount == null) {
  return { itemAmount: "—", currency: "" };
 }

 const { amount: itemAmount, currency } = getFormattedProductPriceParts(
  resolvedAmount,
  locale
 );

 return { itemAmount, currency };
}

function ProductDetailPriceTotalRow({ amount, currency, t }) {
 return (
  <div className="flex items-baseline justify-between gap-3 border-t border-charcoal/10 pt-3 ultra:gap-4 ultra:pt-4 tv:gap-5 tv:pt-5">
   <span className={productDetailPriceTotalLabelClass}>
    {t("product.priceTotal")}
   </span>
   <div className="flex items-baseline gap-2 ultra:gap-2.5 tv:gap-3">
    <span className={productDetailPriceAmountClass}>{amount}</span>
    <span className={productDetailPriceCurrencyClass}>{currency}</span>
   </div>
  </div>
 );
}

function ProductDetailPriceBody({
 displayPriceItems,
 locale,
 isSingleItem,
 amount,
 currency,
 totalValue,
 showLinePrices,
 t,
 showLabel = true,
}) {
 const showTotalRow = !isSingleItem || !showLinePrices;

 if (isSingleItem && showLinePrices) {
  const item = displayPriceItems[0];
  const itemLabel = getPriceItemLabel(item);
  const { itemAmount, currency: itemCurrency } = formatLineItemPrice(
   item,
   locale,
   totalValue
  );
  const lineCurrency = itemCurrency || currency;

  return (
   <div className="flex min-w-0 flex-1 flex-col gap-2 ultra:gap-3 tv:gap-4">
    {showLabel ? (
     <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase ultra:text-xs tv:text-sm">
      {t("product.price")}
     </span>
    ) : null}
    {itemLabel ? (
     <div className={cn(productDetailPriceRowClass, "gap-y-1")}>
      <p className="font-medium wrap-break-word text-charcoal">{itemLabel}</p>
      <div className="flex shrink-0 items-baseline justify-end gap-1.5 text-right ultra:gap-2 tv:gap-2.5">
       <span className={productDetailPriceAmountClass}>{itemAmount}</span>
       {lineCurrency ? (
        <span className={productDetailPriceCurrencyClass}>{lineCurrency}</span>
       ) : null}
      </div>
     </div>
    ) : (
     <div className="flex items-baseline gap-2 ultra:gap-2.5 tv:gap-3">
      <span className={productDetailPriceAmountClass}>{itemAmount}</span>
      {lineCurrency ? (
       <span className={productDetailPriceCurrencyClass}>{lineCurrency}</span>
      ) : null}
     </div>
    )}
   </div>
  );
 }

 return (
  <div className="flex min-w-0 flex-1 flex-col gap-3 ultra:gap-4 tv:gap-5">
   {showLabel ? (
    <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase ultra:text-xs tv:text-sm">
     {t("product.price")}
    </span>
   ) : null}
   {displayPriceItems.length > 0 ? (
    <ul className="flex flex-col gap-2 ultra:gap-2.5 tv:gap-3">
     {displayPriceItems.map((item) => {
      const itemLabel = getPriceItemLabel(item);

      if (!showLinePrices) {
       return (
        <li key={item._displayKey}>
         <span className="font-medium wrap-break-word text-charcoal">{itemLabel ?? "-"}</span>
        </li>
       );
      }

      const { itemAmount, currency: itemCurrency } = formatLineItemPrice(
       item,
       locale,
       null
      );

      return (
       <li key={item._displayKey} className={productDetailPriceRowClass}>
        <span className="font-medium wrap-break-word">{itemLabel ?? "-"}</span>
        <span className="shrink-0 text-right tabular-nums text-charcoal/75">
         {itemAmount}
         {itemCurrency ? ` ${itemCurrency}` : ""}
        </span>
       </li>
      );
     })}
    </ul>
   ) : null}
   {showTotalRow ? (
    <ProductDetailPriceTotalRow amount={amount} currency={currency} t={t} />
   ) : null}
  </div>
 );
}

function ProductDetailPrice({ product, locale, className }) {
 const { t } = useLocale();
 const [open, setOpen] = useState("");
 const total = getProductDisplayPrice(product);

 useEffect(() => {
  if (window.matchMedia(PRODUCT_DETAIL_GRID_MQ).matches) {
   setOpen("price");
  }
 }, []);

 if (total == null) return null;

 const priceItems = getPriceBreakdownItems(product);
 const { amount, currency } = getFormattedProductPriceParts(total, locale);
 const displayPriceItems =
  priceItems.length > 0 ? getDisplayPriceItems(priceItems) : [];
 const isSingleItem = displayPriceItems.length === 1;
 const showLinePrices = !hasManualProductPriceTotal(product);
 const isOpen = open === "price";

 return (
  <Accordion
   type="single"
   collapsible
   value={open}
   onValueChange={setOpen}
   className={cn("product-detail-price w-full", className)}
  >
   <AccordionItem value="price" className={productDetailPanelClass}>
    <AccordionTrigger className="cursor-pointer items-center gap-3 rounded-none border-0 py-4 hover:no-underline ultra:gap-4 ultra:py-5 tv:gap-5 tv:py-6">
     <Payments className={productDetailActionIconClass} aria-hidden />
     <span className="flex min-w-0 flex-1 items-center justify-between gap-3 ultra:gap-4 tv:gap-5">
      <span className="text-sm font-medium text-charcoal ultra:text-base tv:text-lg">
       {t("product.price")}
      </span>
      {!isOpen ? (
       <span className="flex shrink-0 items-baseline gap-1.5 ultra:gap-2 tv:gap-2.5">
        <span className="font-heading text-lg font-semibold tracking-tight text-charcoal tabular-nums ultra:text-2xl tv:text-3xl">
         {amount}
        </span>
        <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase ultra:text-sm tv:text-base">
         {currency}
        </span>
       </span>
      ) : null}
     </span>
    </AccordionTrigger>
    <AccordionContent className="pb-6 ultra:pb-7 tv:pb-8">
     <ProductDetailPriceBody
      displayPriceItems={displayPriceItems}
      locale={locale}
      isSingleItem={isSingleItem}
      amount={amount}
      currency={currency}
      totalValue={total}
      showLinePrices={showLinePrices}
      t={t}
      showLabel={false}
     />
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}

function ActionButton({
 icon: Icon,
 children,
 onClick,
 className,
 iconPosition = "start",
 "aria-pressed": ariaPressed,
}) {
 const iconEl = (
  <Icon
   className={cn(
    productDetailActionIconClass,
    iconPosition === "end" && "size-4 ultra:size-5.5 tv:size-6"
   )}
   aria-hidden
  />
 );

 return (
  <button
   type="button"
   onClick={onClick}
   aria-pressed={ariaPressed}
   className={cn(
    productDetailActionButtonClass,
    iconPosition === "end" && "justify-between gap-0",
    className
   )}
  >
   {iconPosition === "end" ? (
    <>
     <span>{children}</span>
     {iconEl}
    </>
   ) : (
    <>
     {iconEl}
     <span>{children}</span>
    </>
   )}
  </button>
 );
}

export function ProductDetailLeft({
 product,
 categoryLabel,
 categoryHref,
 onViewDimensions,
 onViewProductInfo,
 section = "all",
 className,
}) {
 const { t, dictionary, locale } = useLocale();
 const { isFavorite, toggleFavorite, hydrated } = useFavorites();
 const favorited = hydrated && isFavorite(product.slug);

 const handleToggleFavorite = () => {
  const wasFavorited = isFavorite(product.slug);
  toggleFavorite(product);

  showFavoriteToast({
   added: !wasFavorited,
   title: wasFavorited ? t("favorites.removedToast") : t("favorites.addedToast"),
   titleShort: wasFavorited
    ? t("favorites.removedToastShort")
    : t("favorites.addedToastShort"),
   description: getProductFavoriteToastLabel(product, dictionary),
   closeLabel: t("common.close"),
  });
 };

 const showHeader = section === "all" || section === "header";
 const showControls = section === "all" || section === "controls";

 const header = showHeader ? (
  <div className="min-w-0 space-y-3">
   <nav aria-label={t("catalog.products")}>
    <ol className="text-muted-foreground flex flex-wrap items-center gap-y-1 text-xs font-medium tracking-[0.14em] uppercase ultra:text-sm tv:text-base">
     <li>
      <Link href="/urunler" className={productBreadcrumbRootLinkClass}>
       {t("catalog.products")}
      </Link>
     </li>
     {categoryLabel ? (
      <>
       <li aria-hidden className="shrink-0 px-2 text-charcoal/25 select-none">
        /
       </li>
       <li>
        {categoryHref ? (
         <Link href={categoryHref} className={productBreadcrumbCategoryLinkClass}>
          {categoryLabel}
         </Link>
        ) : (
         categoryLabel
        )}
       </li>
      </>
     ) : null}
    </ol>
   </nav>
   <SeoH1
    title={formatSeoTitle(getProductCardBottomLabel(product, locale))}
    className="font-heading min-w-0 text-xl font-semibold tracking-tight wrap-break-word text-charcoal md:text-2xl ultra:text-3xl tv:text-4xl"
   >
    {getProductCardBottomLabel(product, locale)}
   </SeoH1>
  </div>
 ) : null;

 const controls = showControls ? (
  <div className="flex flex-col gap-4 ultra:gap-5 tv:gap-6">
   <ProductDetailPrice product={product} locale={locale} />

   <ActionButton
    icon={favorited ? HeartFilled : Heart}
    onClick={handleToggleFavorite}
    className={favorited ? "border-charcoal/20 bg-cream/60" : undefined}
    aria-pressed={favorited}
   >
    {favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")}
   </ActionButton>

   {section === "all" ? (
    <>
     <ProductInfoScrollButton
      product={product}
      t={t}
      onClick={onViewProductInfo}
     />
     <ProductDimensionsScrollButton
      product={product}
      t={t}
      onClick={onViewDimensions}
     />
    </>
   ) : null}
  </div>
 ) : null;

 return (
  <aside className={cn("flex min-w-0 flex-col gap-8 ultra:gap-10 tv:gap-12", className)}>
   {header}
   {controls}
  </aside>
 );
}