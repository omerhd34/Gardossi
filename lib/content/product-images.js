export const PRODUCT_IMAGE_DEVICES = ["mobile", "tablet", "desktop"];

export const EMPTY_PRODUCT_IMAGE_URLS = {
 mobile: "",
 tablet: "",
 desktop: "",
};

const PRIMARY_FALLBACK_ORDER = ["desktop", "tablet", "mobile"];

function trimUrl(value) {
 return typeof value === "string" ? value.trim() : "";
}

export function normalizeProductImageUrls(input = {}, legacyUrl = "") {
 const source =
  input && typeof input === "object" && !Array.isArray(input) ? input : {};

 const urls = {
  mobile: trimUrl(source.mobile),
  tablet: trimUrl(source.tablet),
  desktop: trimUrl(source.desktop),
 };

 const hasAny = PRODUCT_IMAGE_DEVICES.some((device) => urls[device]);
 const legacy = trimUrl(legacyUrl);

 if (!hasAny && legacy) {
  return {
   url: legacy,
   urls: {
    mobile: legacy,
    tablet: legacy,
    desktop: legacy,
   },
  };
 }

 let url = legacy;
 if (!url) {
  for (const device of PRIMARY_FALLBACK_ORDER) {
   if (urls[device]) {
    url = urls[device];
    break;
   }
  }
 }

 return { url, urls };
}

export function mergeProductImageDeviceUrl(image = {}, device, nextUrl) {
 if (!PRODUCT_IMAGE_DEVICES.includes(device)) {
  return normalizeProductImage(image);
 }

 const current = normalizeProductImage(image);
 const urls = {
  ...current.urls,
  [device]: trimUrl(nextUrl),
 };

 return normalizeProductImage({ ...current, urls, url: "" });
}

export function normalizeProductImage(image = {}) {
 const { url, urls } = normalizeProductImageUrls(image.urls, image.url);

 return {
  ...image,
  url,
  urls,
 };
}

export function resolveProductImageUrls(image) {
 const normalized = normalizeProductImage(image);
 const { urls, url } = normalized;

 if (!url && !PRODUCT_IMAGE_DEVICES.some((device) => urls[device])) {
  return null;
 }

 return {
  mobile: urls.mobile || urls.tablet || urls.desktop || url,
  tablet: urls.tablet || urls.desktop || urls.mobile || url,
  desktop: urls.desktop || urls.tablet || urls.mobile || url,
 };
}

export function getProductImageUrlForDevice(image, device = "desktop") {
 const resolved = resolveProductImageUrls(image);
 if (!resolved) return null;
 return resolved[device] || resolved.desktop || null;
}

export function getPrimaryProductImage(product) {
 const images = product?.images ?? [];
 return images.find((image) => image.isPrimary) ?? images[0] ?? null;
}
