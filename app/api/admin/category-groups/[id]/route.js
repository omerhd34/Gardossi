import {
 validateAdminCategoryName,
 validateAdminCategoryNameEn,
} from "@/lib/admin/field-limits";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/admin/slug";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";
import { normalizeCategoryCoverImages } from "@/lib/content/category-cover-images";

export async function GET(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  const group = await prisma.productCategoryGroup.findUnique({
   where: { id },
   include: {
    products: {
     orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
     select: { id: true, name: true, slug: true, isPublished: true },
    },
   },
  });

  if (!group) {
   return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 404 });
  }

  return Response.json(group);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;
  const body = await request.json();

  const existing = await prisma.productCategoryGroup.findUnique({ where: { id } });
  if (!existing) {
   return Response.json({ error: "Kategori grubu bulunamadı." }, { status: 404 });
  }

  const name = body.name?.trim() ?? existing.name;
  const nameEn =
   body.nameEn !== undefined ? body.nameEn?.trim() || null : existing.nameEn;
  const slug = slugify(name) || existing.slug;

  const nameError = validateAdminCategoryName(name, "Ad (TR)");
  if (nameError) {
   return Response.json({ error: nameError }, { status: 400 });
  }

  const nameEnError = validateAdminCategoryNameEn(nameEn);
  if (nameEnError) {
   return Response.json({ error: nameEnError }, { status: 400 });
  }
  if (slug !== existing.slug) {
   const conflict = await prisma.productCategoryGroup.findUnique({ where: { slug } });
   if (conflict) {
    return Response.json({ error: "Bu slug zaten kullanılıyor." }, { status: 409 });
   }
  }

  const coverSource =
   body.coverImages !== undefined || body.coverImage !== undefined
    ? normalizeCategoryCoverImages(
     body.coverImages !== undefined ? body.coverImages : existing.coverImages,
     body.coverImage !== undefined ? body.coverImage : existing.coverImage
    )
    : normalizeCategoryCoverImages(existing.coverImages, existing.coverImage);

  const group = await prisma.productCategoryGroup.update({
   where: { id },
   data: {
    slug,
    name,
    nameEn,
    coverImage: coverSource.coverImage || null,
    coverImages: coverSource.coverImage ? coverSource.coverImages : null,
    sortOrder: Number(body.sortOrder) ?? existing.sortOrder,
    isPublished: body.isPublished ?? existing.isPublished,
   },
  });

  return Response.json(group);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function DELETE(_request, { params }) {
 try {
  await requireAdmin();
  const { id } = await params;

  await prisma.productCategoryGroup.delete({ where: { id } });
  return Response.json({ ok: true });
 } catch (error) {
  return handleAdminError(error);
 }
}
