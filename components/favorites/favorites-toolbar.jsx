"use client";

import { FavoritesMobileControls } from "@/components/favorites/favorites-mobile-controls";
import { ProductsSortMenu } from "@/components/catalog/products-sort-menu";
import { useTranslations } from "@/contexts/locale-provider";
import { getFavoritesSortOptions } from "@/lib/i18n/catalog";
import {
 catalogSearchFieldClass,
 catalogSearchIconClass,
 catalogSearchInputClass,
 catalogSearchPillClass,
} from "@/lib/layout/header-styles";
import { Search } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function FavoritesToolbar({
 search,
 onSearchChange,
 sort,
 onSortChange,
 categories,
 selectedCategory,
 onCategoryChange,
}) {
 const { t, dictionary } = useTranslations();
 const sortOptions = getFavoritesSortOptions(dictionary);

 return (
  <>
   <FavoritesMobileControls
    search={search}
    onSearchChange={onSearchChange}
    sort={sort}
    onSortChange={onSortChange}
    categories={categories}
    selectedCategory={selectedCategory}
    onCategoryChange={onCategoryChange}
    sortOptions={sortOptions}
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
       placeholder={t("favorites.searchPlaceholder")}
       className={catalogSearchInputClass}
       aria-label={t("favorites.search")}
      />
      <Search className={catalogSearchIconClass} aria-hidden />
     </div>
    </form>

    <ProductsSortMenu
     sort={sort}
     onSortChange={onSortChange}
     sortOptions={sortOptions}
    />
   </div>
  </>
 );
}
