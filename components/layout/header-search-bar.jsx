/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Search } from "@/lib/icons";
import { HeaderSearchForm } from "@/components/layout/header-search-form";
import { useTranslations } from "@/contexts/locale-provider";
import { getCategoryLabelForProduct } from "@/lib/product-category";
import { getPrimaryImageUrl, getProductCardBottomLabel } from "@/lib/product-utils";
import { containerPremiumClass, navPressClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const searchResultsBackdropTopClass =
 "top-[calc(var(--header-height-mobile)+4.75rem)] sm:mobile-layout:top-[calc(var(--header-height-mobile-sm)+4.75rem)] lg:top-[calc(var(--header-height-desktop)+4.75rem)]";

function SearchProductCard({ product, onNavigate, dictionary, locale }) {
 const imageUrl = getPrimaryImageUrl(product);
 const categoryLabel = getCategoryLabelForProduct(product, dictionary);
 const bottomLabel = getProductCardBottomLabel(product, locale);

 return (
  <Link
   href={`/urunler/${product.slug}`}
   onClick={onNavigate}
   className={cn("group block", navPressClass)}
  >
   <div className="search-product-card relative aspect-5/4 overflow-hidden rounded-2xl border border-charcoal/10 bg-cream/50 shadow-[0_2px_10px_rgb(0_0_0/5%)] transition-[border-color,box-shadow] duration-200 hover:border-charcoal/20 hover:shadow-[0_6px_20px_rgb(0_0_0/8%)]">
    {imageUrl ? (
     <Image
      src={imageUrl}
      alt={product.images?.[0]?.alt ?? product.name}
      fill
      sizes="(max-width: 640px) 50vw, 25vw"
      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
     />
    ) : (
     <div className="absolute inset-0 bg-cream/70" aria-hidden />
    )}
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent" />
    {categoryLabel ? (
     <span className="absolute top-2 right-2 z-10 inline-flex rounded-2xl bg-white/92 px-2.5 py-1 text-[0.65rem] font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {categoryLabel}
     </span>
    ) : null}
    <div className="absolute right-2 bottom-2 left-2">
     <span className="inline-flex max-w-[85%] rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-charcoal shadow-sm backdrop-blur-sm">
      {bottomLabel}
     </span>
    </div>
   </div>
  </Link>
 );
}

export function HeaderSearchBar({
 open,
 onClose,
 inline = false,
 query,
 onQueryChange,
 submittedQuery,
 onSubmittedQueryChange,
 onClear,
}) {
 const { t, dictionary, locale } = useTranslations();
 const pathname = usePathname();
 const isHome = pathname === "/";
 const inputRef = useRef(null);
 const [mounted, setMounted] = useState(false);
 const [loading, setLoading] = useState(false);
 const [results, setResults] = useState({ products: [] });

 const showMobilePanel = open;
 const showDesktopResultsPanel = inline && Boolean(submittedQuery);
 const showResultsPanel = Boolean(submittedQuery);

 useEffect(() => {
  setMounted(true);
 }, []);

 useEffect(() => {
  if (!open) return;

  const timer = window.setTimeout(() => {
   inputRef.current?.focus({ preventScroll: true });
  }, 80);
  return () => window.clearTimeout(timer);
 }, [open]);

 useEffect(() => {
  if (!submittedQuery) {
   setResults({ products: [] });
   setLoading(false);
   return;
  }

  setLoading(true);
  const controller = new AbortController();

  (async () => {
   try {
    const response = await fetch(
     `/api/search?q=${encodeURIComponent(submittedQuery)}`,
     { signal: controller.signal }
    );
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    setResults({
     products: data.products ?? [],
    });
   } catch (error) {
    if (error.name !== "AbortError") {
     setResults({ products: [] });
    }
   } finally {
    setLoading(false);
   }
  })();

  return () => controller.abort();
 }, [submittedQuery]);

 const handleNavigate = useCallback(() => {
  onClose();
 }, [onClose]);

 const handleSubmit = (event) => {
  event.preventDefault();
  onSubmittedQueryChange(query.trim());
 };

 const handleClear = () => {
  onClear?.();
  inputRef.current?.focus();
 };

 const hasResults = results.products.length > 0;
 const showEmpty = submittedQuery && !loading && !hasResults;

 const resultsPanel =
  showResultsPanel ? (
   <div
    className={cn(
     "mt-3 max-h-[min(70vh,36rem)] overflow-y-auto rounded-[1.75rem] border border-(--pill-border) bg-[oklch(0.995_0.004_90/96%)] p-5 shadow-[0_12px_48px_rgb(0_0_0/12%)] transition-[opacity,transform] duration-220 ease-out",
     (hasResults || loading || showEmpty)
      ? "translate-y-0 opacity-100"
      : "translate-y-[-0.35rem] opacity-0"
    )}
   >
    {loading ? (
     <div className="flex justify-center px-2 py-6 text-center text-sm text-charcoal/60">
      <div className="relative grid size-13 place-items-center" role="status" aria-label={t("common.searching")}>
       <div className="absolute inset-0 animate-[search-overlay-loader-spin_0.9s_cubic-bezier(0.45,0.05,0.35,0.95)_infinite] rounded-full border-2 border-charcoal/10 border-t-kalif-blue border-r-[oklch(0.52_0.14_250/40%)]" />
       <div className="absolute inset-[0.4rem] animate-[search-overlay-loader-glow_1.6s_ease-in-out_infinite] rounded-full bg-[oklch(0.52_0.14_250/6%)]" />
       <Search className="relative z-1 size-4.5 animate-[search-overlay-loader-icon_1.6s_ease-in-out_infinite] text-charcoal/70" aria-hidden />
      </div>
     </div>
    ) : null}

    {!loading && results.products.length > 0 ? (
     <section className="not-first:mt-5 not-first:border-t not-first:border-charcoal/8 not-first:pt-5">
      <h3 className="mb-3 text-[0.6875rem] font-semibold tracking-[0.12em] text-charcoal/60 uppercase">
       {t("catalog.products")}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
       {results.products.map((product) => (
        <SearchProductCard
         key={product.id}
         product={product}
         dictionary={dictionary}
         locale={locale}
         onNavigate={handleNavigate}
        />
       ))}
      </div>
     </section>
    ) : null}

    {showEmpty ? (
     <p className="px-2 py-6 text-center text-sm text-charcoal/60">{t("catalog.noSearchResults")}</p>
    ) : null}
   </div>
  ) : null;

 const renderBackdrop = (visible) =>
  mounted && visible
   ? createPortal(
    <button
     type="button"
     className={cn(
      "search-backdrop-layer fixed inset-0 z-40 cursor-pointer border-0 bg-black/38 animate-[search-backdrop-in_0.28s_ease-out] [backdrop-filter:blur(3px)] [-webkit-backdrop-filter:blur(3px)]",
      isHome && "bg-black/45"
     )}
     onClick={onClose}
     aria-label={t("common.closeSearch")}
    />,
    document.body
   )
   : null;

 const renderResultsBackdrop = (visible) =>
  mounted && visible && showResultsPanel && !isHome
   ? createPortal(
    <button
     type="button"
     className={cn(
      "search-results-backdrop fixed right-0 bottom-0 left-0 z-40 cursor-pointer border-0 bg-[oklch(0.99_0.006_88/55%)] [backdrop-filter:blur(14px)_saturate(120%)] [-webkit-backdrop-filter:blur(14px)_saturate(120%)]",
      searchResultsBackdropTopClass
     )}
     onClick={onClose}
     aria-label={t("common.closeSearch")}
    />,
    document.body
   )
   : null;

 return (
  <>
   {renderBackdrop(showMobilePanel)}
   {renderBackdrop(showDesktopResultsPanel)}

   {showMobilePanel && !inline ? (
    <div
     className={cn(
      "header-search-shell absolute inset-x-0 top-full z-50 pb-4 pt-3",
      containerPremiumClass
     )}
     role={showResultsPanel ? "dialog" : undefined}
     aria-modal={showResultsPanel ? "true" : undefined}
     aria-label={showResultsPanel ? t("common.searchResults") : undefined}
    >
     <HeaderSearchForm
      query={query}
      onQueryChange={onQueryChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
      inputRef={inputRef}
     />
     {resultsPanel}
    </div>
   ) : null}

   {showMobilePanel && inline ? (
    <div
     className={cn(
      "header-search-shell absolute inset-x-0 top-full z-50 pb-4 pt-3 lg:hidden",
      containerPremiumClass
     )}
     role={showResultsPanel ? "dialog" : undefined}
     aria-modal={showResultsPanel ? "true" : undefined}
     aria-label={showResultsPanel ? t("common.searchResults") : undefined}
    >
     <HeaderSearchForm
      query={query}
      onQueryChange={onQueryChange}
      onSubmit={handleSubmit}
      onClear={handleClear}
      inputRef={inputRef}
     />
     {resultsPanel}
    </div>
   ) : null}

   {showDesktopResultsPanel ? (
    <div
     className={cn(
      "header-search-shell absolute inset-x-0 top-full z-50 hidden pb-4 pt-3 lg:block",
      containerPremiumClass
     )}
     role="dialog"
     aria-modal="true"
     aria-label={t("common.searchResults")}
    >
     {resultsPanel}
    </div>
   ) : null}

   {renderResultsBackdrop(showMobilePanel)}
   {renderResultsBackdrop(showDesktopResultsPanel)}
  </>
 );
}
