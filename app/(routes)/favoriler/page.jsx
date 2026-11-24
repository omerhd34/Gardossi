import { FavoritesView } from "@/components/favorites/favorites-view";
import { createPageMetadata } from "@/lib/i18n/page-metadata";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { getProductDisplayPrice } from "@/lib/product-utils";
import { getPublishedProducts } from "@/lib/queries/products";
import { cn } from "@/lib/utils";

export const generateMetadata = createPageMetadata("favorites", { index: false });

const favoritesPageShellClass =
 "relative z-0 flex min-h-dvh flex-col pt-[calc(var(--header-height-mobile)+var(--search-bar-height)+var(--page-header-gap))] pb-6 sm:mobile-layout:pt-[calc(var(--header-height-mobile-sm)+var(--search-bar-height)+var(--page-header-gap))] desktop:pt-[calc(var(--header-height-desktop)+var(--search-bar-height)+var(--page-header-gap))]";

export default async function FavorilerPage() {
 const products = await getPublishedProducts();
 const productMetaBySlug = Object.fromEntries(
  products.map((product) => [
   product.slug,
   {
    name: product.name,
    displayPrice: getProductDisplayPrice(product),
    createdAt: product.createdAt,
   },
  ])
 );

 return (
  <div className={cn(containerPremiumClass, favoritesPageShellClass)}>
   <FavoritesView productMetaBySlug={productMetaBySlug} />
  </div>
 );
}
