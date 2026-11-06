const TARGET_MAX_BYTES = 900 * 1024;

function canvasToBlob(canvas, type, quality) {
 return new Promise((resolve) => {
  canvas.toBlob((blob) => resolve(blob), type, quality);
 });
}

export async function prepareImageForUpload(file, { maxWidth, maxHeight } = {}) {
 if (typeof document === "undefined" || typeof createImageBitmap !== "function") {
  return file;
 }

 let bitmap;
 try {
  bitmap = await createImageBitmap(file);
 } catch {
  return file;
 }

 const scale = Math.min(
  1,
  maxWidth ? maxWidth / bitmap.width : 1,
  maxHeight ? maxHeight / bitmap.height : 1
 );
 const width = Math.max(1, Math.round(bitmap.width * scale));
 const height = Math.max(1, Math.round(bitmap.height * scale));
 const needsResize = scale < 0.999;
 const needsCompress = file.size > TARGET_MAX_BYTES;

 if (!needsResize && !needsCompress) {
  bitmap.close?.();
  return file;
 }

 const canvas = document.createElement("canvas");
 canvas.width = width;
 canvas.height = height;
 const context = canvas.getContext("2d");
 if (!context) {
  bitmap.close?.();
  return file;
 }

 context.drawImage(bitmap, 0, 0, width, height);
 bitmap.close?.();

 const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
 let type = "image/webp";
 let quality = 0.86;
 let blob = null;

 for (let attempt = 0; attempt < 6; attempt += 1) {
  blob = await canvasToBlob(canvas, type, quality);
  if (!blob && type === "image/webp") {
   type = "image/jpeg";
   continue;
  }
  if (!blob) break;
  if (blob.size <= TARGET_MAX_BYTES || quality <= 0.5) break;
  quality = Math.max(0.5, Number((quality - 0.12).toFixed(2)));
 }

 if (!blob) return file;
 if (blob.size >= file.size && file.size <= TARGET_MAX_BYTES) return file;

 const extension = type === "image/webp" ? "webp" : "jpg";
 return new File([blob], `${baseName}.${extension}`, { type });
}
