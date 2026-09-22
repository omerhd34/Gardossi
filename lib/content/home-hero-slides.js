const HERO_SLIDE_FILES = {
 sm: "1080x1920.webp",
 md: "1440x2560.webp",
 lg: "1600x1067.webp",
 xl: "1920x1280.webp",
 "2xl": "2560x1707.webp",
};

export const HOME_HERO_SLIDE_IMAGE_KEYS = ["sm", "md", "lg", "xl", "2xl"];

export const HOME_HERO_SLIDE_SLUGS = ["slide-1", "slide-2", "slide-3", "slide-4"];

export const HOME_HERO_DEVICE_KEYS = {
 mobile: ["sm"],
 tablet: ["md"],
 desktop: ["lg", "xl", "2xl"],
};

export const HOME_HERO_DEVICES = ["mobile", "tablet", "desktop"];

export function getHomeHeroSlideNumber(slug) {
 return Number(slug.replace("slide-", ""));
}

export const EMPTY_HERO_SLIDE_IMAGES = Object.fromEntries(
 HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, ""])
);

function slideFolder(slug) {
 return slug.replace("slide-", "");
}

function buildDefaultSlideImages(slug) {
 const folder = slideFolder(slug);

 return Object.fromEntries(
  Object.entries(HERO_SLIDE_FILES).map(([breakpoint, file]) => [
   breakpoint,
   `/slayts/${folder}/${file}`,
  ])
 );
}

export const HOME_HERO_SLIDE_DEFAULTS = Object.fromEntries(
 HOME_HERO_SLIDE_SLUGS.map((slug) => [slug, buildDefaultSlideImages(slug)])
);

export const HOME_HERO_SLIDE_DEFAULT_IMAGE = Object.fromEntries(
 HOME_HERO_SLIDE_SLUGS.map((slug) => [slug, HOME_HERO_SLIDE_DEFAULTS[slug].lg])
);

const HERO_IMAGE_FALLBACK_KEYS = ["lg", "xl", "2xl", "md", "sm"];

function pickPrimaryHeroImage(heroImages) {
 for (const key of HERO_IMAGE_FALLBACK_KEYS) {
  const url = heroImages[key]?.trim();
  if (url) return url;
 }
 return "";
}

export function getDefaultHomeHeroSlides(dictionary) {
 return HOME_HERO_SLIDE_SLUGS.map((slug) => ({
  slug,
  heroImage: "",
  heroImages: { ...EMPTY_HERO_SLIDE_IMAGES },
  alt: dictionary.hero.slides[slug]?.alt ?? "",
 }));
}

export function normalizeHeroSlide(slide = {}) {
 const incoming = {
  ...EMPTY_HERO_SLIDE_IMAGES,
  ...(slide.heroImages ?? {}),
 };

 const heroImages = Object.fromEntries(
  HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, incoming[key]?.trim() || ""])
 );

 const hasAnyHeroImage = HOME_HERO_SLIDE_IMAGE_KEYS.some((key) => heroImages[key]);
 let heroImage = slide.heroImage?.trim() || "";

 // Eski kayıt: yalnızca tek heroImage vardı → tüm breakpoint’lere yay
 if (!hasAnyHeroImage && heroImage) {
  return {
   ...slide,
   heroImage,
   heroImages: Object.fromEntries(
    HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [key, heroImage])
   ),
  };
 }

 if (!heroImage) {
  heroImage = pickPrimaryHeroImage(heroImages);
 }

 return {
  ...slide,
  heroImage,
  heroImages,
 };
}

export function normalizeHomeHeroContent(content = {}) {
 const slides = content.slides?.length
  ? content.slides
  : HOME_HERO_SLIDE_SLUGS.map((slug) => ({ slug, heroImage: "", alt: "" }));

 return {
  ...content,
  slides: HOME_HERO_SLIDE_SLUGS.map((slug) => {
   const slide = slides.find((item) => item.slug === slug) ?? { slug };
   return normalizeHeroSlide(slide);
  }),
 };
}

/** @deprecated Tek görsel yükleme — yerine mergeHeroSlideDeviceImage kullanın */
export function mergeHeroSlideImage(slide, url) {
 return mergeHeroSlideDeviceImage(slide, "desktop", url);
}

export function mergeHeroSlideDeviceImage(slide, device, url) {
 const keys = HOME_HERO_DEVICE_KEYS[device];
 if (!keys) return normalizeHeroSlide(slide);

 const trimmed = url?.trim() ?? "";
 const current = normalizeHeroSlide(slide);
 const heroImages = { ...current.heroImages };

 for (const key of keys) {
  heroImages[key] = trimmed;
 }

 return {
  ...current,
  heroImage: pickPrimaryHeroImage(heroImages),
  heroImages,
 };
}

export function getHeroSlideDeviceImage(slide, device) {
 const keys = HOME_HERO_DEVICE_KEYS[device];
 if (!keys?.length) return "";

 const normalized = normalizeHeroSlide(slide);
 return normalized.heroImages[keys[0]] ?? "";
}

export function getHeroSlideDeviceDefaultImage(slug, device) {
 const keys = HOME_HERO_DEVICE_KEYS[device];
 const defaults =
  HOME_HERO_SLIDE_DEFAULTS[slug] ?? HOME_HERO_SLIDE_DEFAULTS["slide-1"];
 if (!keys?.length) return defaults.lg;
 return defaults[keys[0]] ?? defaults.lg;
}

export function resolveHeroSlideImages(slug, slide = {}) {
 const normalized = normalizeHeroSlide(slide);
 const defaults =
  HOME_HERO_SLIDE_DEFAULTS[slug] ?? HOME_HERO_SLIDE_DEFAULTS["slide-1"];

 const hasAnyCustom = HOME_HERO_SLIDE_IMAGE_KEYS.some(
  (key) => normalized.heroImages[key]
 );

 if (!hasAnyCustom) {
  return { ...defaults };
 }

 return Object.fromEntries(
  HOME_HERO_SLIDE_IMAGE_KEYS.map((key) => [
   key,
   normalized.heroImages[key] || defaults[key],
  ])
 );
}

export function buildHeroSlidesFromContent(content, baseDictionary) {
 const normalized = normalizeHomeHeroContent(content ?? {});

 return HOME_HERO_SLIDE_SLUGS.map((slug) => {
  const slide = normalized.slides.find((item) => item.slug === slug) ?? { slug };
  const normalizedSlide = normalizeHeroSlide(slide);

  return {
   key: slug,
   images: resolveHeroSlideImages(slug, normalizedSlide),
   alt: normalizedSlide.alt || baseDictionary.hero.slides[slug]?.alt || "",
  };
 });
}
