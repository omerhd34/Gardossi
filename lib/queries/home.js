import { cache } from "react";
import { getLocale } from "@/lib/i18n/server";
import { MAX_FEATURED_PRODUCTS } from "@/lib/admin/featured-products";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

async function fetchFeaturedProducts(locale) {
 const products = await prisma.product.findMany({
  where: { isPublished: true, isFeatured: true },
  orderBy: [{ featuredOrder: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
  take: MAX_FEATURED_PRODUCTS,
  include: {
   categoryGroup: { select: { name: true, nameEn: true, slug: true } },
   images: {
    orderBy: { sortOrder: "asc" },
    take: 1,
    where: { isPrimary: true },
   },
  },
 });

 return products.map((product) => serializeProduct(product, locale));
}

export const getHomePageData = cache(async function getHomePageData() {
 const locale = await getLocale();
 const featuredProducts = await fetchFeaturedProducts(locale);

 return { featuredProducts };
});

