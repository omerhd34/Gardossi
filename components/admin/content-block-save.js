"use client";

import { getUploadErrorMessage, readJsonBody } from "@/lib/admin/upload-response";
import { toast } from "sonner";

export async function saveContentBlock(key, contentTr, contentEn) {
 const response = await fetch(`/api/admin/content/${key}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ contentTr, contentEn }),
 });

 const { text, data } = await readJsonBody(response);
 if (!response.ok || !data) {
  throw new Error(
   getUploadErrorMessage(response.status, text, data, {
    fallback: "Kaydedilemedi.",
    tooLarge: "Kayıt sunucunun kabul ettiği boyuttan büyük.",
   })
  );
 }
 return data;
}

export async function handleContentSave(key, contentTr, contentEn, setLoading, label) {
 setLoading(true);
 try {
  await saveContentBlock(key, contentTr, contentEn);
  toast.success(`${label} kaydedildi.`);
 } catch (error) {
  toast.error(error.message);
 } finally {
  setLoading(false);
 }
}
