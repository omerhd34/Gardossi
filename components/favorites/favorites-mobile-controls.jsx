"use client";

import { useMemo, useState } from "react";
import { FavoritesCategoryFilter } from "@/components/favorites/favorites-filter-content";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";
import { CloseIcon, FilterIcon, Search, X } from "@/lib/icons";
import { catalogFilterSheetOverlayClass } from "@/lib/layout/header-styles";
import {
 catalogFilterSheetClass,
 catalogMobileActionClass,
 catalogMobileGlassClass,
 catalogMobileSearchClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

function ActiveFilterChip({ label, onRemove, removeLabel }) {
 return (
  <button
   type="button"
   onClick={onRemove}
   className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-charcoal/12 bg-white px-3 py-1.5 text-xs font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] transition hover:border-charcoal/20"
  >
   <span>{label}</span>
   <X className="size-3 text-charcoal/50" aria-hidden />
   <span className="sr-only">{removeLabel}</span>
  </button>
 );
}

export function FavoritesMobileControls({
 search,
 onSearchChange,
 sort,
 onSortChange,
 categories,
 selectedCategory,
 onCategoryChange,
 sortOptions,
}) {
 const { t } = useTranslations();
 const [filterOpen, setFilterOpen] = useState(false);

 const activeFilterCount = selectedCategory ? 1 : 0;

 const activeCategoryLabel = categories.find(
  (category) => category.slug === selectedCategory
 )?.label;

 return (
  <div className="space-y-3 lg:hidden">
   <div className="flex items-center gap-2.5">
    <button
     type="button"
     onClick={() => setFilterOpen(true)}
     className={cn(catalogMobileActionClass, catalogMobileGlassClass)}
     aria-expanded={filterOpen}
    >
     <FilterIcon className="size-4 text-charcoal/65" aria-hidden />
     <span>{t("catalog.filter")}</span>
     {activeFilterCount > 0 ? (
      <span className="flex size-5 items-center justify-center rounded-full bg-charcoal text-[0.65rem] font-semibold text-white">
       {activeFilterCount}
      </span>
     ) : null}
    </button>

    <ProductsSortMenu
     sort={sort}
     onSortChange={onSortChange}
     sortOptions={sortOptions}
    />
   </div>

   <form
    role="search"
    onSubmit={(event) => event.preventDefault()}
    className={cn(catalogMobileSearchClass, catalogMobileGlassClass)}
   >
    <Search className="size-4 shrink-0 text-charcoal/45" aria-hidden />
    <input
     type="text"
     inputMode="search"
     enterKeyHint="search"
     autoComplete="off"
     value={search}
     onChange={(event) => onSearchChange(event.target.value)}
     placeholder={t("favorites.searchPlaceholder")}
     className="min-w-0 flex-1 appearance-none border-0 bg-transparent text-sm text-charcoal outline-none placeholder:text-charcoal/45"
     aria-label={t("favorites.search")}
    />
    {search ? (
     <button
      type="button"
      onClick={() => onSearchChange("")}
      className="flex size-6 cursor-pointer items-center justify-center rounded-full text-charcoal/40 transition hover:bg-charcoal/5 hover:text-charcoal"
      aria-label={t("common.clearSearch")}
     >
      <X className="size-3.5" />
     </button>
    ) : null}
   </form>

   {(selectedCategory || search.trim()) && (
    <div className="flex flex-wrap items-center gap-2">
     {selectedCategory && activeCategoryLabel ? (
      <ActiveFilterChip
       label={activeCategoryLabel}
       onRemove={() => onCategoryChange(null)}
       removeLabel={t("catalog.removeFilter")}
      />
     ) : null}
     {search.trim() ? (
      <ActiveFilterChip
       label={`"${search.trim()}"`}
       onRemove={() => onSearchChange("")}
       removeLabel={t("catalog.removeFilter")}
      />
     ) : null}
     <button
      type="button"
      onClick={() => {
       onCategoryChange(null);
       onSearchChange("");
      }}
      className="cursor-pointer text-xs font-medium text-charcoal/50 transition hover:text-charcoal"
     >
      {t("catalog.clearAll")}
     </button>
    </div>
   )}

   <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
    <SheetContent
     side="bottom"
     showCloseButton={false}
     overlayClassName={catalogFilterSheetOverlayClass}
     className={catalogFilterSheetClass}
    >
     <SheetHeader className="sr-only">
      <SheetTitle>{t("catalog.productFilters")}</SheetTitle>
     </SheetHeader>

     <div className="flex shrink-0 items-center justify-between border-b border-charcoal/8 px-5 py-4">
      <div>
       <p className="text-base font-semibold text-charcoal">{t("catalog.filter")}</p>
       <p className="mt-0.5 text-xs text-charcoal/50">
        {t("favorites.selectFilters")}
       </p>
      </div>
      <button
       type="button"
       onClick={() => setFilterOpen(false)}
       className="flex size-9 cursor-pointer items-center justify-center rounded-full text-charcoal/60 transition hover:bg-charcoal/6 hover:text-charcoal"
       aria-label={t("catalog.closeFilters")}
      >
       <CloseIcon className="size-5 stroke-[1.75]" aria-hidden />
      </button>
     </div>

     <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
      {categories.length > 0 ? (
       <section>
        <h3 className="text-xs font-semibold tracking-[0.14em] text-charcoal/45 uppercase">
         {t("catalog.category")}
        </h3>
        <div className="mt-3">
         <FavoritesCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          variant="grid"
         />
        </div>
       </section>
      ) : null}
     </div>

     <div className="flex shrink-0 gap-2.5 border-t border-charcoal/8 px-5 py-4">
      <button
       type="button"
       onClick={() => onCategoryChange(null)}
       disabled={!selectedCategory}
       className="h-11 flex-1 cursor-pointer rounded-full border border-charcoal/12 bg-white text-sm font-medium text-charcoal transition hover:border-charcoal/20 disabled:cursor-not-allowed disabled:opacity-40"
      >
       {t("catalog.clear")}
      </button>
      <button
       type="button"
       onClick={() => setFilterOpen(false)}
       className="h-11 flex-1 cursor-pointer rounded-full bg-charcoal text-sm font-medium text-white transition hover:bg-charcoal/90"
      >
       {t("catalog.showProducts")}
      </button>
     </div>
    </SheetContent>
   </Sheet>
  </div>
 );
}
