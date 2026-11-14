import path from "node:path";
import {
 getCloudinaryUploadErrorMessage,
 validateImageUploadFile,
} from "@/lib/admin/image-upload";
import { requireAdmin, handleAdminError } from "@/lib/admin/require-admin";
import { CloudinaryConfigError, uploadImageBuffer } from "@/lib/cloudinary";

function sanitizeFolder(folder) {
 return String(folder ?? "")
  .split("/")
  .map((part) => part.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80))
  .filter(Boolean)
  .join("/");
}

function sanitizePublicId(name) {
 const ext = path.extname(name).toLowerCase();
 const base = path
  .basename(name, ext)
  .replace(/[^a-zA-Z0-9._-]/g, "-")
  .toLowerCase()
  .slice(0, 80);

 return base || "image";
}

export async function POST(request) {
 try {
  await requireAdmin();

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = sanitizeFolder(formData.get("folder"));

  if (!folder) {
   return Response.json({ error: "Klasör adı gereklidir." }, { status: 400 });
  }

  if (!file || typeof file === "string") {
   return Response.json({ error: "Dosya gereklidir." }, { status: 400 });
  }

  const validationError = validateImageUploadFile(file);
  if (validationError) {
   return Response.json({ error: validationError }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await uploadImageBuffer(buffer, {
   folder,
   publicId: `${sanitizePublicId(file.name)}-${Date.now()}`,
  });

  return Response.json({ url: result.secure_url });
 } catch (error) {
  if (error instanceof CloudinaryConfigError) {
   return Response.json({ error: error.message }, { status: error.status });
  }

  const uploadError = getCloudinaryUploadErrorMessage(error);
  if (uploadError) {
   return Response.json({ error: uploadError }, { status: 400 });
  }

  console.error("[admin/upload]", error);
  return handleAdminError(error);
 }
}
