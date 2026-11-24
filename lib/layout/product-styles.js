export const catalogProductCardClass =
 "product-card-kalif--catalog border border-charcoal/12 shadow-[0_2px_12px_rgb(0_0_0/5%)] transition-[border-color,box-shadow] duration-200 group-hover/card:border-charcoal/20 group-hover/card:shadow-[0_8px_28px_rgb(0_0_0/8%)]";

export const productCategoryTileClass =
 "product-category-tile border border-charcoal/12 bg-cream/60 shadow-[0_2px_10px_rgb(0_0_0/4%)] transition-[border-color,box-shadow] duration-200 hover:border-charcoal/20 hover:shadow-[0_6px_20px_rgb(0_0_0/7%)]";

export const productDetailAccordionItemClass =
 "scroll-mt-6 overflow-hidden rounded-3xl border border-charcoal/12 bg-white px-5 shadow-[0_1px_3px_rgb(0_0_0/4%)] ultra:rounded-4xl ultra:px-6 tv:rounded-4xl tv:px-7";

export const productDetailAccordionTriggerClass =
 "cursor-pointer items-center gap-3 py-4 text-base font-semibold text-charcoal hover:no-underline ultra:gap-4 ultra:py-5 ultra:text-lg tv:gap-5 tv:py-6 tv:text-xl";

export const productDetailPanelClass = productDetailAccordionItemClass;

export const productRelatedPanelClass =
 "product-related-panel border border-charcoal/12 bg-cream/30 shadow-[0_8px_30px_rgb(0_0_0/5%)]";

export const productRelatedPanelHeaderClass =
 "product-related-panel__header border-b border-charcoal/10 bg-white/80";

export const productRelatedItemClass =
 "product-related-item border border-charcoal/12 bg-white shadow-[0_1px_4px_rgb(0_0_0/4%)] hover:border-charcoal/22 hover:bg-cream/40 hover:shadow-[0_4px_16px_rgb(0_0_0/8%)]";

export const productRelatedItemThumbClass =
 "product-related-item__thumb border border-charcoal/10 bg-cream/60";

export const productGalleryFrameClass =
 "product-gallery-frame border border-charcoal/14 bg-white shadow-[0_2px_14px_rgb(0_0_0/6%)]";

export const productProtectedImageClass =
 "pointer-events-none select-none [-webkit-touch-callout:none] [-webkit-user-drag:none]";

export function preventImageSaveInteraction(event) {
 event.preventDefault();
}

export const productGalleryMobileCarouselClass =
 "[&_[data-slot=carousel-content]]:overflow-hidden [&_[data-slot=carousel-content]]:rounded-3xl [&_[data-slot=carousel-content]]:border [&_[data-slot=carousel-content]]:border-charcoal/14 [&_[data-slot=carousel-content]]:bg-white [&_[data-slot=carousel-content]]:shadow-[0_2px_14px_rgb(0_0_0/6%)] [&_[data-slot=carousel-item]]:min-w-full";

export const productDetailScrollClass =
 "overscroll-contain [scrollbar-width:thin] [scrollbar-color:oklch(0.62_0.01_260/0.45)_transparent] hover:[&::-webkit-scrollbar-thumb]:bg-charcoal/55 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-charcoal/40 [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5";

export const productSimilarScrollClass =
 "[scrollbar-width:thin] [scrollbar-color:oklch(0.62_0.01_260/0.32)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-charcoal/32";

export const productDetailActionButtonClass =
 "flex w-full cursor-pointer items-center gap-3 rounded-3xl border border-charcoal/12 bg-white px-5 py-4 text-left text-base font-semibold text-charcoal shadow-[0_1px_3px_rgb(0_0_0/4%)] transition hover:border-charcoal/18 hover:shadow-[0_4px_16px_rgb(0_0_0/6%)] ultra:gap-4 ultra:rounded-4xl ultra:px-6 ultra:py-5 ultra:text-lg tv:gap-5 tv:px-7 tv:py-6 tv:text-xl";

export const productDetailActionIconClass =
 "shrink-0 text-black size-5 ultra:size-6 tv:size-7";

export const productDetailBodyTextClass =
 "text-sm leading-relaxed text-charcoal/75 ultra:text-base ultra:leading-7 tv:text-lg tv:leading-8";

export const productDetailTableWrapClass =
 "overflow-hidden rounded-xl border border-charcoal/10 bg-cream/20 ultra:rounded-2xl tv:rounded-2xl";

export const productDetailTableClass =
 "text-xs text-charcoal/75 ultra:text-sm tv:text-base";

export const productDetailTableHeadClass =
 "h-8 px-2 font-semibold text-charcoal/55 ultra:h-10 ultra:px-3 ultra:text-sm tv:h-12 tv:px-4 tv:text-base";

export const productDetailTableCellClass =
 "px-2 py-2 ultra:px-3 ultra:py-2.5 tv:px-4 tv:py-3";

export const productDetailPriceRowClass =
 "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 text-sm text-charcoal ultra:gap-x-4 ultra:text-base tv:gap-x-5 tv:text-lg";

export const productDetailPriceAmountClass =
 "font-heading text-xl font-semibold tracking-tight text-charcoal tabular-nums sm:text-2xl ultra:text-3xl tv:text-4xl";

export const productDetailPriceCurrencyClass =
 "text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase ultra:text-sm tv:text-base";

export const productDetailPriceTotalLabelClass =
 "text-sm font-semibold text-charcoal ultra:text-base tv:text-lg";

export const catalogFilterSheetClass =
 "flex max-h-[min(88dvh,40rem)] flex-col rounded-t-[1.75rem] border-charcoal/10 bg-cream/95 p-0 text-charcoal backdrop-blur-xl shadow-[0_-12px_40px_rgb(0_0_0/10%)]!";

export const catalogMobileGlassClass =
 "[backdrop-filter:blur(12px)_saturate(140%)] [-webkit-backdrop-filter:blur(12px)_saturate(140%)]";

export const catalogMobileActionClass =
 "flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-charcoal/12 bg-white px-4 text-sm font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] transition hover:border-charcoal/20";

export const catalogMobileSearchClass =
 "flex h-11 items-center gap-2.5 rounded-full border border-charcoal/12 bg-white px-4 shadow-[0_1px_2px_rgb(0_0_0/4%)]";
