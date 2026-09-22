"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { FavoritesFiltersSidebar } from "@/components/favorites/favorites-filters-sidebar";
import { FavoritesToolbar } from "@/components/favorites/favorites-toolbar";
import { useFavorites } from "@/contexts/favorites-provider";
import { useLocale } from "@/contexts/locale-provider";
import { favoriteToProductCard, enrichFavoriteForDisplay } from "@/lib/favorites";
import {
 filterFavorites,
 getAvailableFavoriteCategories,
 sortFavorites,
} from "@/lib/favorites-filters";
import { headingDisplayClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function FavoritesView({ productMetaBySlug = {} }) {
 const { favorites, hydrated } = useFavorites();
 const { t, dictionary } = useLocale();
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState(null);
 const [selectedCategory, setSelectedCategory] = useState(null);

 const displayFavorites = useMemo(
  () => favorites.map((favorite) => enrichFavoriteForDisplay(favorite, productMetaBySlug)),
  [favorites, productMetaBySlug]
 );

 const categories = useMemo(
  () => getAvailableFavoriteCategories(displayFavorites, dictionary),
  [displayFavorites, dictionary]
 );

 const filteredFavorites = useMemo(() => {
  const filtered = filterFavorites(displayFavorites, {
   search,
   categorySlug: selectedCategory,
   dictionary,
  });

  return sortFavorites(filtered, sort);
 }, [displayFavorites, search, selectedCategory, sort, dictionary]);

 if (!hydrated) {
  return (
   <p className="text-muted-foreground text-sm">{t("common.loading")}…</p>
  );
 }

 if (favorites.length === 0) {
  return (
   <div className="rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-20 text-center">
    <h1 className={cn(headingDisplayClass, "text-charcoal")}>{t("favorites.title")}</h1>
    <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm">
     {t("favorites.emptyDescription")}
    </p>
    <Link
     href="/urunler"
     className="mt-8 inline-flex scale-100 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-white touch-manipulation transition-[scale,background-color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:bg-charcoal/90 motion-reduce:duration-150 motion-reduce:active:scale-100"
    >
     {t("favorites.browseProducts")}
    </Link>
   </div>
  );
 }

 return (
  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
   <FavoritesFiltersSidebar
    categories={categories}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
    className="hidden lg:block"
   />

   <div className="min-w-0 flex-1 space-y-6 md:space-y-8">
    <div>
     <h1 className={cn(headingDisplayClass, "text-charcoal")}>{t("favorites.title")}</h1>
     <p className="text-muted-foreground mt-2 text-sm">
      {t("favorites.listing", { count: filteredFavorites.length })}
     </p>
    </div>

    <FavoritesToolbar
     search={search}
     onSearchChange={setSearch}
     sort={sort}
     onSortChange={setSort}
     categories={categories}
     selectedCategory={selectedCategory}
     onCategoryChange={setSelectedCategory}
    />

    {filteredFavorites.length > 0 ? (
     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:gap-6">
      {filteredFavorites.map((favorite, index) => (
       <ProductCard
        key={favorite.slug}
        product={favoriteToProductCard(favorite)}
        priority={index < 2}
        variant="catalog"
        showFavoriteButton
       />
      ))}
     </div>
    ) : (
     <div className="rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-20 text-center">
      <p className="text-sm font-medium text-charcoal">{t("favorites.noResults")}</p>
      <p className="text-muted-foreground mt-2 text-sm">
       {t("favorites.tryAgain")}
      </p>
     </div>
    )}
   </div>
  </div>
 );
}
