import {
 validateAdminCategoryName,
 validateAdminCategoryNameEn,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";
import { normalizeCategoryCoverImages } from "@/lib/content/category-cover-images";

export async function GET() {
 try {
  await requireAdmin();

  const groups = await prisma.productCategoryGroup.findMany({
   orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
   include: { _count: { select: { products: true } } },
  });

  return Response.json(groups);
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

  const nameError = validateAdminCategoryName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminCategoryNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug) {
   return Response.json({ error: "Ad gereklidir." }, { status: 400 });
  }

  const existing = await prisma.productCategoryGroup.findUnique({ where: { slug } });
  if (existing) {
   return Response.json({ error: "Bu slug zaten kullanılıyor" }, { status: 409 });
  }

  const { coverImage, coverImages } = normalizeCategoryCoverImages(
   body.coverImages,
   body.coverImage
  );

  const group = await prisma.productCategoryGroup.create({
   data: {
    slug,
    name,
    nameEn,
    coverImage: coverImage || null,
    coverImages: coverImage ? coverImages : null,
    sortOrder: Number(body.sortOrder) || 0,
    isPublished: body.isPublished !== false,
   },
  });

  return Response.json(group, { status: 201 });
 } catch (error) {
  return handleAdminError(error);
 }
}
