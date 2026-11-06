import { prepareImageForUpload } from "@/lib/admin/prepare-image-upload";
import { getUploadErrorMessage, readJsonBody } from "@/lib/admin/upload-response";

export async function uploadAdminImage(file, { folder, maxWidth, maxHeight } = {}) {
 const prepared = await prepareImageForUpload(file, { maxWidth, maxHeight });
 const body = new FormData();
 body.append("file", prepared);
 body.append("folder", folder);

 const response = await fetch("/api/admin/upload", {
  method: "POST",
  body,
 });
 const { text, data } = await readJsonBody(response);

 if (!response.ok || !data?.url) {
  throw new Error(getUploadErrorMessage(response.status, text, data));
 }

 return data.url;
}
