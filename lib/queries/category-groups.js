import { defaultLocale } from "@/lib/i18n/config";
import { prisma } from "@/lib/prisma";
import { getPrimaryImageUrl, getProductCardBottomLabel } from "@/lib/product-utils";

const menuProductSelect = {
 slug: true,
 name: true,
 nameEn: true,
 images: {
  orderBy: { sortOrder: "asc" },
  take: 1,
  where: { isPrimary: true },
 },
};

function mapGroupForMenu(group, locale = defaultLocale) {
 return {
  slug: group.slug,
  label: locale === "en" ? group.nameEn || group.name : group.name,
  href: `/urunler?kategori=${group.slug}`,
  coverImage: group.coverImage ?? null,
  coverImages: group.coverImages ?? null,
  items: group.products.map((product) => {
   const label = getProductCardBottomLabel(product, locale);

   return {
    slug: product.slug,
    label,
    href: `/urunler/${product.slug}`,
    image: getPrimaryImageUrl(product),
   };
  }),
 };
}

export async function getCategoryGroupsForMenu(locale = defaultLocale) {
 try {
  const groups = await prisma.productCategoryGroup.findMany({
   where: { isPublished: true },
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: {
    products: {
     where: { isPublished: true },
     orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
     select: menuProductSelect,
    },
   },
  });

  return groups.map((group) => mapGroupForMenu(group, locale));
 } catch (error) {
  console.error("[getCategoryGroupsForMenu]", error);
  return [];
 }
}

export async function getProductCategorySlugMap() {
 try {
  const groups = await prisma.productCategoryGroup.findMany({
   where: { isPublished: true },
   include: {
    products: {
     where: { isPublished: true },
     select: { slug: true },
    },
   },
  });

  return Object.fromEntries(
   groups.map((group) => [group.slug, group.products.map((product) => product.slug)])
  );
 } catch (error) {
  console.error("[getProductCategorySlugMap]", error);
  return {};
 }
}

export async function getCategoryGroupBySlug(slug, locale = defaultLocale) {
 if (!slug) return null;

 try {
  const group = await prisma.productCategoryGroup.findFirst({
   where: { slug, isPublished: true },
   include: {
    products: {
     where: { isPublished: true },
     orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
     select: menuProductSelect,
    },
   },
  });

  return group ? mapGroupForMenu(group, locale) : null;
 } catch (error) {
  console.error("[getCategoryGroupBySlug]", error);
  return null;
 }
}
