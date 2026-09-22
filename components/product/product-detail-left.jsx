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
import { LG_MQ } from "@/lib/layout/breakpoints";
import { productDetailActionButtonClass } from "@/lib/layout/product-styles";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled, Payments } from "@/lib/icons";
import {
 getDisplayPriceItems,
 getFormattedProductPriceParts,
 getPriceItemDisplayAmount,
 getPriceItemLabel,
 getPriceItems,
 getProductCardBottomLabel,
 getProductDisplayPrice,
 getProductFavoriteToastLabel,
} from "@/lib/product-utils";
import { formatSeoTitle } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/favorites-provider";

const productPanelClassName =
 "overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]";

const productBreadcrumbLinkClass =
 "inline-block scale-100 touch-manipulation transition-[scale,color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:text-charcoal motion-reduce:duration-150 motion-reduce:active:scale-100";

const productBreadcrumbRootLinkClass = cn(productBreadcrumbLinkClass, "origin-right");

const productBreadcrumbCategoryLinkClass = cn(
 productBreadcrumbLinkClass,
 "origin-left"
);

function ProductDetailPriceBody({
 displayPriceItems,
 locale,
 isSingleItem,
 amount,
 currency,
 t,
 showLabel = true,
}) {
 if (isSingleItem) {
  const item = displayPriceItems[0];
  const itemLabel = getPriceItemLabel(item);
  const { amount: itemAmount } = getFormattedProductPriceParts(
   getPriceItemDisplayAmount(item),
   locale
  );

  return (
   <div className="flex min-w-0 flex-1 flex-col gap-2">
    {showLabel ? (
     <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase">
      {t("product.price")}
     </span>
    ) : null}
    {itemLabel ? (
     <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1">
      <p className="text-sm font-medium wrap-break-word text-charcoal">{itemLabel}</p>
      <div className="flex shrink-0 items-baseline justify-end gap-1.5 text-right">
       <span className="font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl">
        {itemAmount}
       </span>
       <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
        {currency}
       </span>
      </div>
     </div>
    ) : (
     <div className="flex items-baseline gap-2">
      <span className="font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl">
       {itemAmount}
      </span>
      <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
       {currency}
      </span>
     </div>
    )}
   </div>
  );
 }

 return (
  <div className="flex min-w-0 flex-1 flex-col gap-3">
   {showLabel ? (
    <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-charcoal/40 uppercase">
     {t("product.price")}
    </span>
   ) : null}
   <ul className="flex flex-col gap-2">
    {displayPriceItems.map((item) => {
     const itemLabel = getPriceItemLabel(item);
     const { amount: itemAmount } = getFormattedProductPriceParts(
      getPriceItemDisplayAmount(item),
      locale
     );

     return (
      <li
       key={item._displayKey}
       className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 text-sm text-charcoal"
      >
       <span className="font-medium wrap-break-word">{itemLabel ?? "-"}</span>
       <span className="shrink-0 text-right tabular-nums text-charcoal/75">
        {itemAmount} {currency}
       </span>
      </li>
     );
    })}
   </ul>
   <div className="flex items-baseline justify-between gap-3 border-t border-charcoal/10 pt-3">
    <span className="text-sm font-semibold text-charcoal">{t("product.priceTotal")}</span>
    <div className="flex items-baseline gap-2">
     <span className="font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl">
      {amount}
     </span>
     <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
      {currency}
     </span>
    </div>
   </div>
  </div>
 );
}

function ProductDetailPrice({ product, locale, className }) {
 const { t } = useLocale();
 const [open, setOpen] = useState("");
 const priceItems = getPriceItems(product);
 const total = getProductDisplayPrice(product);

 useEffect(() => {
  if (window.matchMedia(LG_MQ).matches) {
   setOpen("price");
  }
 }, []);

 if (priceItems.length === 0 || total == null) return null;

 const { amount, currency } = getFormattedProductPriceParts(total, locale);
 const displayPriceItems = getDisplayPriceItems(priceItems);
 const isSingleItem = displayPriceItems.length === 1;
 const isOpen = open === "price";

 return (
  <Accordion
   type="single"
   collapsible
   value={open}
   onValueChange={setOpen}
   className={cn("product-detail-price w-full", className)}
  >
   <AccordionItem value="price" className={productPanelClassName}>
    <AccordionTrigger className="cursor-pointer items-center gap-3 rounded-none border-0 py-4 hover:no-underline">
     <Payments className="size-5 shrink-0 text-black" aria-hidden />
     <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
      <span className="text-sm font-medium text-charcoal">{t("product.price")}</span>
      {!isOpen ? (
       <span className="flex shrink-0 items-baseline gap-1.5">
        <span className="font-heading text-lg font-semibold tracking-tight text-charcoal tabular-nums">
         {amount}
        </span>
        <span className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
         {currency}
        </span>
       </span>
      ) : null}
     </span>
    </AccordionTrigger>
    <AccordionContent className="pb-6">
     <ProductDetailPriceBody
      displayPriceItems={displayPriceItems}
      locale={locale}
      isSingleItem={isSingleItem}
      amount={amount}
      currency={currency}
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
    "shrink-0 text-black",
    iconPosition === "end" ? "size-4" : "size-5"
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
    <ol className="text-muted-foreground flex flex-wrap items-center gap-y-1 text-xs font-medium tracking-[0.14em] uppercase">
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
    className="font-heading min-w-0 text-xl font-semibold tracking-tight wrap-break-word text-charcoal md:text-2xl"
   >
    {getProductCardBottomLabel(product, locale)}
   </SeoH1>
  </div>
 ) : null;

 const controls = showControls ? (
  <div className="flex flex-col gap-4">
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
  <aside className={cn("flex min-w-0 flex-col gap-8", className)}>
   {header}
   {controls}
  </aside>
 );
}