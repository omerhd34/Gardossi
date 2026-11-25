"use client";

import { ProductsMobileCatalogControls } from "@/components/catalog/products-mobile-catalog-controls";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import {
 catalogSearchFieldClass,
 catalogSearchIconClass,
 catalogSearchInputClass,
 catalogSearchPillClass,
} from "@/lib/layout/header-styles";
import { Search } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ProductsCatalogToolbar({
 search,
 onSearchChange,
 sort,
 onSortChange,
}) {
 const { t } = useTranslations();

 return (
  <>
   <ProductsMobileCatalogControls
    search={search}
    onSearchChange={onSearchChange}
    sort={sort}
    onSortChange={onSortChange}
   />

   <div className="hidden flex-col gap-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
    <form
     role="search"
     onSubmit={(event) => event.preventDefault()}
     className={cn(catalogSearchPillClass, "flex-1")}
    >
     <div className={cn(catalogSearchFieldClass, "bg-transparent")}>
      <input
       type="text"
       inputMode="search"
       enterKeyHint="search"
       autoComplete="off"
       value={search}
       onChange={(event) => onSearchChange(event.target.value)}
       placeholder={t("catalog.searchProductsPlaceholder")}
       className={catalogSearchInputClass}
       aria-label={t("catalog.searchProducts")}
      />
      <Search className={catalogSearchIconClass} aria-hidden />
     </div>
    </form>

    <ProductsSortMenu sort={sort} onSortChange={onSortChange} />
   </div>
  </>
 );
}
