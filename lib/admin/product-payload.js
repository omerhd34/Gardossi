import { clampAdminPartName } from "@/lib/admin/field-limits";
import { parseTurkishAmount } from "@/lib/admin/price-input";

export function parseDimensionItems(items) {
 if (!Array.isArray(items)) return null;
 return items.map((item, index) => ({
  name: clampAdminPartName(item.name).trim() || null,
  nameEn: clampAdminPartName(item.nameEn).trim() || null,
  widthCm: item.widthCm != null && item.widthCm !== "" ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null && item.depthCm !== "" ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null && item.heightCm !== "" ? Number(item.heightCm) : null,
  amount: parseTurkishAmount(item.amount),
  quantity:
   item.quantity != null && item.quantity !== "" && Number(item.quantity) > 0
    ? Number(item.quantity)
    : 1,
  sortOrder: index,
 }));
}

export function validateProductImages(images) {
 if (
  !Array.isArray(images) ||
  !images.some((image) => {
   const urls = image.urls ?? {};
   return (
    image.url?.trim() ||
    urls.mobile?.trim() ||
    urls.tablet?.trim() ||
    urls.desktop?.trim()
   );
  })
 ) {
  return "En az bir görsel gerekli.";
 }

 return null;
}

export function parseProductImages(images, productName, productNameEn) {
 if (!Array.isArray(images)) return [];
 return images
  .map((image, index) => {
   const urls = {
    mobile: image.urls?.mobile?.trim() || "",
    tablet: image.urls?.tablet?.trim() || "",
    desktop: image.urls?.desktop?.trim() || "",
   };
   const hasDeviceUrls = Boolean(urls.mobile || urls.tablet || urls.desktop);
   const url =
    image.url?.trim() ||
    urls.desktop ||
    urls.tablet ||
    urls.mobile ||
    "";

   if (!url) return null;

   const resolvedUrls = hasDeviceUrls
    ? {
     mobile: urls.mobile || url,
     tablet: urls.tablet || url,
     desktop: urls.desktop || url,
    }
    : { mobile: url, tablet: url, desktop: url };

   return {
    url,
    urls: resolvedUrls,
    alt:
     image.alt?.trim() ||
     (index === 0 ? productName : `${productName} - görsel ${index + 1}`),
    altEn:
     image.altEn?.trim() ||
     (index === 0
      ? productNameEn || productName
      : `${productNameEn || productName} - image ${index + 1}`),
    sortOrder: index,
    isPrimary: Boolean(image.isPrimary) || index === 0,
   };
  })
  .filter(Boolean);
}

export function parseCornerStandardFields(body, categorySlug) {
 if (categorySlug !== "kose-gruplari") {
  return {
   cornerStandardSideACm: null,
   cornerStandardSideBCm: null,
  };
 }

 return {
  cornerStandardSideACm:
   body.cornerStandardSideACm != null && body.cornerStandardSideACm !== ""
    ? Number(body.cornerStandardSideACm)
    : null,
  cornerStandardSideBCm:
   body.cornerStandardSideBCm != null && body.cornerStandardSideBCm !== ""
    ? Number(body.cornerStandardSideBCm)
    : null,
 };
}

export function parseProductMedia(body, productSlug, productName, productNameEn) {
 const images = parseProductImages(body.images, productName, productNameEn);

 return {
  sku: body.sku?.trim() || productSlug.toUpperCase().replace(/-/g, ""),
  images: images.length ? { create: images } : undefined,
 };
}
