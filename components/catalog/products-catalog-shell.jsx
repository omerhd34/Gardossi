"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductsCatalogToolbar } from "@/components/catalog/products-catalog-toolbar";
import { ProductsCategoryCarousel } from "@/components/catalog/products-category-carousel";
import { ProductsCategoryGrid } from "@/components/catalog/products-category-grid";
import { SeoH1 } from "@/components/seo/seo-h1";
import { useLocale } from "@/contexts/locale-provider";
import { getProductDisplayPrice } from "@/lib/product-utils";
import {
 headingDisplayClass,
 pageBodyParagraphClass,
 pageLeadParagraphClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

function compareByPrice(a, b, ascending) {
 const priceA = getProductDisplayPrice(a);
 const priceB = getProductDisplayPrice(b);

 if (priceA == null && priceB == null) return 0;
 if (priceA == null) return 1;
 if (priceB == null) return -1;

 return ascending ? priceA - priceB : priceB - priceA;
}

function sortProducts(products, sort, t) {
 if (!sort) return products;

 const list = [...products];

 const sortAlphabetical = (a, b) =>
  (a.name || "").localeCompare(b.name || "", t("locale") || "tr");

 switch (sort) {
  case "price-asc":
   return list.sort((a, b) => compareByPrice(a, b, true));
  case "price-desc":
   return list.sort((a, b) => compareByPrice(a, b, false));
  case "newest":
   return list.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
   );
  default:
   return list.sort(sortAlphabetical);
 }
}

export function ProductsCatalogShell({
 products,
 activeGroup,
 categorySlug,
}) {
 const { t } = useLocale();
 const [search, setSearch] = useState("");
 const [sort, setSort] = useState(null);

 const isCategoryLanding = !categorySlug;
 const categoryDescription = categorySlug
  ? t(`catalog.categoryDescriptions.${categorySlug}`)
  : null;
 const hasCategoryDescription =
  categoryDescription &&
  categoryDescription !== `catalog.categoryDescriptions.${categorySlug}`;

 const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  const list = products.filter((product) => {
   if (!query) return true;

   return product.name.toLowerCase().includes(query);
  });

  return sortProducts(list, sort, t);
 }, [products, search, sort, t]);

 if (isCategoryLanding) {
  return (
   <div className="space-y-6 md:space-y-8">
    <div className="text-center md:text-left">
     <SeoH1
      categorySlug={null}
      title={t("pages.products.title")}
      className={cn(headingDisplayClass, "text-charcoal")}
     >
      {t("pages.products.title")}
     </SeoH1>
     <p
      className={cn(
       pageLeadParagraphClass,
       "text-muted-foreground mx-auto mt-3 max-w-4xl md:mx-0 ultra:mt-4 ultra:max-w-5xl tv:mt-5 tv:max-w-6xl"
      )}
     >
      {t("home.categoriesDescription")}
     </p>
    </div>
    <div data-nosnippet>
     <ProductsCategoryGrid />
    </div>
   </div>
  );
 }

 return (
  <div className="space-y-6 md:space-y-8">
   <div>
    <SeoH1
     categorySlug={categorySlug}
     title={activeGroup ? activeGroup.label : t("catalog.allProductsTitle")}
     className={cn(headingDisplayClass, "text-charcoal")}
    >
     {activeGroup ? activeGroup.label : t("catalog.allProductsTitle")}
    </SeoH1>
    {hasCategoryDescription ? (
     <p
      className={cn(
       pageLeadParagraphClass,
       "text-muted-foreground mt-3 max-w-4xl ultra:mt-4 ultra:max-w-5xl tv:mt-5 tv:max-w-6xl"
      )}
     >
      {categoryDescription}
     </p>
    ) : null}
   </div>

   <div data-nosnippet>
    <ProductsCatalogToolbar
     search={search}
     onSearchChange={setSearch}
     sort={sort}
     onSortChange={setSort}
    />

    {filteredProducts.length > 0 ? (
     <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:gap-6 md:mt-8 ultra:gap-7 tv:gap-8">
      {filteredProducts.map((product, index) => (
       <ProductCard
        key={product.id}
        product={product}
        priority={index < 2}
        variant="catalog"
        showFavoriteButton
        omitCategoryInLabel
       />
      ))}
     </div>
    ) : (
     <div className="mt-6 rounded-3xl border border-dashed border-charcoal/12 bg-cream/40 px-6 py-16 text-center sm:py-20 md:mt-8 lg:px-8 lg:py-24 ultra:rounded-[2rem] ultra:px-10 ultra:py-28 tv:rounded-[2.25rem] tv:px-12 tv:py-32">
      <p
       className={cn(
        pageBodyParagraphClass,
        "mx-auto max-w-md font-medium text-charcoal sm:max-w-lg lg:max-w-xl ultra:max-w-2xl tv:max-w-3xl"
       )}
      >
       {t("catalog.noProducts")}
      </p>
      <p
       className={cn(
        pageLeadParagraphClass,
        "text-muted-foreground mx-auto mt-2 max-w-md sm:max-w-lg lg:mt-3 lg:max-w-xl ultra:mt-4 ultra:max-w-2xl tv:mt-5 tv:max-w-3xl"
       )}
      >
       {t("catalog.tryAgain")}
      </p>
     </div>
    )}

    {categorySlug ? (
     <div className="mt-8 md:mt-12 ultra:mt-14 tv:mt-16">
      <div
       className="border-t border-charcoal/8"
       role="separator"
       aria-hidden="true"
      />
      <div className="pt-5 md:pt-8 ultra:pt-10 tv:pt-12">
       <ProductsCategoryCarousel activeSlug={categorySlug} />
      </div>
     </div>
    ) : null}
   </div>
  </div>
 );
}
