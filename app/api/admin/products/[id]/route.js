import {
 validateAdminName,
 validateAdminNameEn,
 validateDimensionItemsText,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import {
 assignCategoryProductOrder,
 compactCategoryProductOrders,
} from "@/lib/admin/category-product-order";
import {
 assignFeaturedOrder,
 compactFeaturedOrders,
} from "@/lib/admin/featured-order";
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

export async function GET(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  const product = await prisma.product.findUnique({
   where: { id },
   include: productInclude,
  });

  if (!product) {
   return Response.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }

  return Response.json({
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
   cornerStandardSideACm:
    product.cornerStandardSideACm != null
     ? Number(product.cornerStandardSideACm)
     : null,
   cornerStandardSideBCm:
    product.cornerStandardSideBCm != null
     ? Number(product.cornerStandardSideBCm)
     : null,
   dimensionItems: Array.isArray(product.dimensionItems)
    ? product.dimensionItems.map((item) => ({
     ...item,
     widthCm: item.widthCm != null ? Number(item.widthCm) : null,
     depthCm: item.depthCm != null ? Number(item.depthCm) : null,
     heightCm: item.heightCm != null ? Number(item.heightCm) : null,
     amount: item.amount != null ? Number(item.amount) : null,
     quantity: item.quantity != null ? Number(item.quantity) : null,
    }))
    : [],
  });
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
   return Response.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const name = body.name?.trim() ?? existing.name;
  const slug =
   name === existing.name ? existing.slug : slugify(name) || existing.slug;
  if (slug !== existing.slug) {
   const conflict = await prisma.product.findUnique({ where: { slug } });
   if (conflict) {
    return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
   }
  }
  const nameEn = body.nameEn?.trim() || null;

  const nameError = validateAdminName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }

  const imageError = validateProductImages(body.images);
  if (imageError) {
   return Response.json({ error: imageError }, { status: 400 });
  }

  const dimensionItemsError = validateDimensionItemsText(body.dimensionItems);
  if (dimensionItemsError) {
   return Response.json({ error: dimensionItemsError }, { status: 400 });
  }

  const categoryGroupId =
   body.categoryGroupId !== undefined
    ? body.categoryGroupId?.trim() || null
    : existing.categoryGroupId;
  if (!categoryGroupId) {
   return Response.json({ error: "Kategori seçin." }, { status: 400 });
  }

  const categoryGroup = await prisma.productCategoryGroup.findUnique({
   where: { id: categoryGroupId },
  });
  if (!categoryGroup) {
   return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 400 });
  }

  const media = parseProductMedia(body, slug, name, nameEn);
  const cornerStandard = parseCornerStandardFields(body, categoryGroup.slug);

  const isFeatured = body.isFeatured ?? existing.isFeatured;
  const featuredLimitError = await getFeaturedLimitError({
   isFeatured,
   excludeProductId: id,
  });
  if (featuredLimitError) {
   return Response.json({ error: featuredLimitError }, { status: 400 });
  }

  const requestedFeaturedOrder = parseAdminRank(
   body.featuredOrder,
   existing.featuredOrder || 1
  );
  const requestedSortOrder = parseAdminRank(body.sortOrder, existing.sortOrder || 1);

  const product = await prisma.$transaction(async (tx) => {
   await tx.image.deleteMany({ where: { productId: id } });

   await tx.product.update({
    where: { id },
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
     isPublished: body.isPublished ?? existing.isPublished,
     isFeatured,
     featuredOrder: isFeatured ? requestedFeaturedOrder : 0,
     categoryGroupId,
     sku: media.sku,
     images: media.images,
    },
   });

   if (isFeatured) {
    await assignFeaturedOrder(tx, id, requestedFeaturedOrder);
   } else if (existing.isFeatured) {
    await compactFeaturedOrders(tx);
   }

   await assignCategoryProductOrder(tx, id, categoryGroupId, requestedSortOrder);
   if (
    existing.categoryGroupId &&
    existing.categoryGroupId !== categoryGroupId
   ) {
    await compactCategoryProductOrders(tx, existing.categoryGroupId);
   }

   return tx.product.findUnique({
    where: { id },
    include: productInclude,
   });
  });

  revalidateProductPages();

  return Response.json(product);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PATCH(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  if (body.featuredOrder === undefined) {
   return Response.json({ error: "Vitrin sırası gerekli." }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
   return Response.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  if (!existing.isFeatured) {
   return Response.json(
    { error: "Vitrin sırası yalnızca vitrindeki ürünler için güncellenebilir." },
    { status: 400 }
   );
  }

  const finalOrder = await prisma.$transaction(async (tx) =>
   assignFeaturedOrder(tx, id, body.featuredOrder)
  );

  if (finalOrder == null) {
   return Response.json({ error: "Vitrin sırası güncellenemedi." }, { status: 400 });
  }

  revalidateProductPages();

  return Response.json({
   id,
   featuredOrder: finalOrder,
   isFeatured: true,
  });
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.$transaction(async (tx) => {
   const existing = await tx.product.findUnique({
    where: { id },
    select: { isFeatured: true, categoryGroupId: true },
   });
   await tx.product.delete({ where: { id } });
   if (existing?.isFeatured) {
    await compactFeaturedOrders(tx);
   }
   if (existing?.categoryGroupId) {
    await compactCategoryProductOrders(tx, existing.categoryGroupId);
   }
  });
  revalidateProductPages();
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}
