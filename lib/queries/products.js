import { getLocale } from "@/lib/i18n/server";
import { getProductCategorySlugMap } from "@/lib/queries/category-groups";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/product-utils";

const RELATED_PRODUCTS_LIMIT = 6;
const SECONDARY_CATEGORY_PRODUCTS_LIMIT = 3;
const SEZLONG_SECONDARY_PRODUCTS_LIMIT = 5;
const SECONDARY_CATEGORY_GROUP_SLUG = "oturma-gruplari";
const SEZLONG_CATEGORY_SLUG = "sezlong";

const productListInclude = {
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 images: { orderBy: { sortOrder: "asc" } },
};

const productDetailInclude = {
 categoryGroup: {
  select: { id: true, slug: true, name: true, nameEn: true },
 },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function getProductBySlug(slug) {
 try {
  const locale = await getLocale();
  const product = await prisma.product.findFirst({
   where: { slug, isPublished: true },
   include: productDetailInclude,
  });

  return serializeProduct(product, locale);
 } catch (error) {
  console.error("[getProductBySlug]", error);
  return null;
 }
}

export async function getCategoryRelatedProducts(productSlug) {
 const categoryMap = await getProductCategorySlugMap();
 const categorySlug = Object.keys(categoryMap).find((slug) =>
  categoryMap[slug].includes(productSlug)
 );

 if (!categorySlug) return [];

 const relatedSlugs = categoryMap[categorySlug].filter((slug) => slug !== productSlug);

 if (!relatedSlugs.length) return [];

 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    slug: { in: relatedSlugs },
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  const serialized = products.map((product) => serializeProduct(product, locale));
  return serialized.slice(0, RELATED_PRODUCTS_LIMIT);
 } catch (error) {
  console.error("[getCategoryRelatedProducts]", error);
  return [];
 }
}

export async function getSecondaryCategoryGroupProducts(
 productSlug,
 currentCategorySlug,
 limit = SECONDARY_CATEGORY_PRODUCTS_LIMIT
) {
 if (currentCategorySlug === SECONDARY_CATEGORY_GROUP_SLUG) return null;

 const categoryMap = await getProductCategorySlugMap();
 const relatedSlugs = (categoryMap[SECONDARY_CATEGORY_GROUP_SLUG] ?? []).filter(
  (item) => item !== productSlug
 );

 if (!relatedSlugs.length) return null;

 try {
  const locale = await getLocale();
  const [products, group] = await Promise.all([
   prisma.product.findMany({
    where: {
     isPublished: true,
     slug: { in: relatedSlugs },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: productListInclude,
   }),
   prisma.productCategoryGroup.findFirst({
    where: { slug: SECONDARY_CATEGORY_GROUP_SLUG, isPublished: true },
    select: { slug: true, name: true, nameEn: true },
   }),
  ]);

  if (!group) return null;

  const serialized = products
   .map((product) => serializeProduct(product, locale))
   .slice(0, limit);

  if (!serialized.length) return null;

  return {
   label: locale === "en" ? group.nameEn || group.name : group.name,
   href: `/urunler?kategori=${group.slug}`,
   products: serialized,
  };
 } catch (error) {
  console.error("[getSecondaryCategoryGroupProducts]", error);
  return null;
 }
}

export async function getProductDetailSecondaryCategoryGroup(
 productSlug,
 categorySlug,
 categoryProductsCount
) {
 if (!categorySlug) return null;

 if (categorySlug === SEZLONG_CATEGORY_SLUG) {
  return getSecondaryCategoryGroupProducts(
   productSlug,
   categorySlug,
   SEZLONG_SECONDARY_PRODUCTS_LIMIT
  );
 }

 if (categoryProductsCount < 3) {
  return getSecondaryCategoryGroupProducts(productSlug, categorySlug);
 }

 return null;
}

export async function getPublishedProductSlugs() {
 try {
  const products = await prisma.product.findMany({
   where: { isPublished: true },
   select: { slug: true },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return products.map((product) => product.slug);
 } catch (error) {
  console.error("[getPublishedProductSlugs]", error);
  return [];
 }
}

export async function getPublishedProducts(categorySlug = null) {
 try {
  const locale = await getLocale();
  const products = await prisma.product.findMany({
   where: {
    isPublished: true,
    ...(categorySlug
     ? { categoryGroup: { slug: categorySlug, isPublished: true } }
     : {}),
   },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: productListInclude,
  });

  return products.map((product) => serializeProduct(product, locale));
 } catch (error) {
  console.error("[getPublishedProducts]", error);
  return [];
 }
}
