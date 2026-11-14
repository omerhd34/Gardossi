const CLOUDINARY_HOST = "res.cloudinary.com";
const UPLOAD_SEGMENT = "/image/upload/";

function isCloudinaryUrl(src) {
 try {
  const url = new URL(src, "https://placeholder.local");
  return url.hostname === CLOUDINARY_HOST;
 } catch {
  return false;
 }
}

export default function cloudinaryImageLoader({ src, width, quality }) {
 if (!src) return src;

 if (!isCloudinaryUrl(src)) {
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}`;
 }

 const q = quality ?? 75;
 const transforms = ["f_auto", "c_limit", `w_${width}`, `q_${q}`].join(",");
 const uploadIndex = src.indexOf(UPLOAD_SEGMENT);

 if (uploadIndex === -1) {
  return src;
 }

 const prefix = src.slice(0, uploadIndex + UPLOAD_SEGMENT.length);
 const rest = src.slice(uploadIndex + UPLOAD_SEGMENT.length);

 if (rest.startsWith(`${transforms}/`)) {
  return src;
 }

 return `${prefix}${transforms}/${rest}`;
}
