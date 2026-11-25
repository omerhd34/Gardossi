import { revalidatePath } from "next/cache";
import { CONTENT_BLOCK_KEYS } from "@/lib/content/keys";
import { getAdminContentBlock } from "@/lib/content/queries";
import { prisma } from "@/lib/prisma";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";

export async function GET(_request, { params }) {
 try {
  await requireAdmin();
  const { key } = await params;

  if (!CONTENT_BLOCK_KEYS.includes(key)) {
   return Response.json({ error: "Geçersiz içerik anahtarı" }, { status: 400 });
  }

  const block = await getAdminContentBlock(key);
  if (!block) {
   return Response.json({ error: "İçerik bulunamadı" }, { status: 404 });
  }

  return Response.json(block);
 } catch (error) {
  return handleAdminError(error);
 }
}

export async function PUT(request, { params }) {
 try {
  await requireAdmin();
  const { key } = await params;

  if (!CONTENT_BLOCK_KEYS.includes(key)) {
   return Response.json({ error: "Geçersiz içerik anahtarı" }, { status: 400 });
  }

  const body = await request.json();
  if (!body.contentTr || !body.contentEn) {
   return Response.json({ error: "TR ve EN içerik gereklidir." }, { status: 400 });
  }

  const existing = await prisma.contentBlock.findUnique({ where: { key } });
  const contentTr = existing?.contentTr
   ? { ...existing.contentTr, ...body.contentTr }
   : body.contentTr;
  const contentEn = existing?.contentEn
   ? { ...existing.contentEn, ...body.contentEn }
   : body.contentEn;

  const block = await prisma.contentBlock.upsert({
   where: { key },
   create: {
    key,
    contentTr,
    contentEn,
   },
   update: {
    contentTr,
    contentEn,
   },
  });

  revalidatePath("/", "layout");

  return Response.json(block);
 } catch (error) {
  return handleAdminError(error);
 }
}
