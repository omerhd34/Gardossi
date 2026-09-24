export const CATEGORY_COVER_DEVICES = ["mobile", "tablet", "desktop"];

export const EMPTY_CATEGORY_COVER_IMAGES = {
 mobile: "",
 tablet: "",
 desktop: "",
};

const PRIMARY_FALLBACK_ORDER = ["desktop", "tablet", "mobile"];

function trimUrl(value) {
 return typeof value === "string" ? value.trim() : "";
}

export function normalizeCategoryCoverImages(input = {}, legacyCoverImage = "") {
 const source =
  input && typeof input === "object" && !Array.isArray(input) ? input : {};

 const coverImages = {
  mobile: trimUrl(source.mobile),
  tablet: trimUrl(source.tablet),
  desktop: trimUrl(source.desktop),
 };

 const hasAny = CATEGORY_COVER_DEVICES.some((device) => coverImages[device]);
 const legacy = trimUrl(legacyCoverImage);

 if (!hasAny && legacy) {
  return {
   coverImage: legacy,
   coverImages: {
    mobile: legacy,
    tablet: legacy,
    desktop: legacy,
   },
  };
 }

 let coverImage = legacy;
 if (!coverImage) {
  for (const device of PRIMARY_FALLBACK_ORDER) {
   if (coverImages[device]) {
    coverImage = coverImages[device];
    break;
   }
  }
 }

 return { coverImage, coverImages };
}

export function mergeCategoryCoverDeviceImage(coverImages, device, url) {
 if (!CATEGORY_COVER_DEVICES.includes(device)) {
  return normalizeCategoryCoverImages(coverImages);
 }

 const next = {
  ...EMPTY_CATEGORY_COVER_IMAGES,
  ...normalizeCategoryCoverImages(coverImages).coverImages,
  [device]: trimUrl(url),
 };

 return normalizeCategoryCoverImages(next);
}

export function resolveCategoryCoverImages(group) {
 const { coverImage, coverImages } = normalizeCategoryCoverImages(
  group?.coverImages,
  group?.coverImage
 );

 const fallback = group?.items?.[0]?.image ?? null;
 const hasAny = CATEGORY_COVER_DEVICES.some((device) => coverImages[device]);

 if (!hasAny) {
  const single = coverImage || fallback;
  if (!single) return null;

  return {
   mobile: single,
   tablet: single,
   desktop: single,
  };
 }

 return {
  mobile: coverImages.mobile || coverImages.tablet || coverImages.desktop || fallback,
  tablet: coverImages.tablet || coverImages.desktop || coverImages.mobile || fallback,
  desktop: coverImages.desktop || coverImages.tablet || coverImages.mobile || fallback,
 };
}

export function getPrimaryCategoryCoverImage(group) {
 const images = resolveCategoryCoverImages(group);
 return images?.desktop || images?.tablet || images?.mobile || null;
}
