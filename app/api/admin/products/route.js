import {
 validateAdminName,
 validateAdminNameEn,
 validateDimensionItemsText,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { assignCategoryProductOrder } from "@/lib/admin/category-product-order";
import { assignFeaturedOrder } from "@/lib/admin/featured-order";
import { getFeaturedLimitError } from "@/lib/admin/featured-products";
import {
 parseCornerStandardFields,
 parseDimensionItems,
 parseProductMedia,
 validateProductImages,
} from "@/lib/admin/product-payload";
import { parseAdminInt, parseAdminRank } from "@/lib/admin/parse-admin-int";
import { revalidateProductPages } from "@/lib/admin/revalidate-products";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

const productInclude = {
 categoryGroup: { select: { id: true, name: true, slug: true } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function GET() {
 try {
  await requireAdmin();

  const products = await prisma.product.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: {
    categoryGroup: { select: { id: true, name: true, slug: true } },
    _count: { select: { images: true } },
   },
  });

  return Response.json(products);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function POST(request) {
 try {
  await requireAdmin();
  const body = await request.json();

  const name = body.name?.trim();
  const nameEn = body.nameEn?.trim();

  const nameError = validateAdminName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug) {
   return Response.json({ error: "Ad gereklidir." }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
  }

  const categoryGroupId = body.categoryGroupId?.trim() || null;
  if (!categoryGroupId) {
   return Response.json({ error: "Kategori seçin." }, { status: 400 });
  }

  const categoryGroup = await prisma.productCategoryGroup.findUnique({
   where: { id: categoryGroupId },
  });
  if (!categoryGroup) {
   return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 400 });
  }

  const imageError = validateProductImages(body.images);
  if (imageError) {
   return Response.json({ error: imageError }, { status: 400 });
  }

  const dimensionItemsError = validateDimensionItemsText(body.dimensionItems);
  if (dimensionItemsError) {
   return Response.json({ error: dimensionItemsError }, { status: 400 });
  }

  const media = parseProductMedia(body, slug, name, nameEn);
  const cornerStandard = parseCornerStandardFields(body, categoryGroup.slug);

  const isFeatured = Boolean(body.isFeatured);
  const featuredLimitError = await getFeaturedLimitError({ isFeatured });
  if (featuredLimitError) {
   return Response.json({ error: featuredLimitError }, { status: 400 });
  }

  const requestedFeaturedOrder = parseAdminRank(body.featuredOrder, 1);
  const requestedSortOrder = parseAdminRank(body.sortOrder, 1);

  const product = await prisma.$transaction(async (tx) => {
   const created = await tx.product.create({
    data: {
     slug,
     name,
     nameEn,
     description: body.description?.trim() || null,
     descriptionEn: body.descriptionEn?.trim() || null,
     dimensions: null,
     dimensionItems: parseDimensionItems(body.dimensionItems),
     widthCm: body.widthCm != null && body.widthCm !== "" ? Number(body.widthCm) : null,
     depthCm: body.depthCm != null && body.depthCm !== "" ? Number(body.depthCm) : null,
     heightCm: body.heightCm != null && body.heightCm !== "" ? Number(body.heightCm) : null,
     ...cornerStandard,
     sortOrder: requestedSortOrder,
     isPublished: body.isPublished !== false,
     isFeatured,
     featuredOrder: isFeatured ? requestedFeaturedOrder : 0,
     categoryGroupId,
     sku: media.sku,
     images: media.images,
    },
   });

   if (isFeatured) {
    await assignFeaturedOrder(tx, created.id, requestedFeaturedOrder);
   }

   await assignCategoryProductOrder(
    tx,
    created.id,
    categoryGroupId,
    requestedSortOrder
   );

   return tx.product.findUnique({
    where: { id: created.id },
    include: productInclude,
   });
  });

  revalidateProductPages();

  return Response.json(product, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}
