export const PAGE_HERO_IMAGE_KEYS = ["sm", "sm2x", "md", "lg", "xl", "xl2x"];

export const PAGE_HERO_DEVICE_KEYS = {
 mobile: ["sm", "sm2x"],
 tablet: ["md"],
 desktop: ["lg", "xl", "xl2x"],
};

export const PAGE_HERO_DEVICES = ["mobile", "tablet", "desktop"];

const MISSION_HERO_DEFAULTS = {
 sm: "/mission-hero/mobile.jpeg",
 sm2x: "/mission-hero/mobile.jpeg",
 md: "/mission-hero/tablet.jpeg",
 lg: "/mission-hero/laptop.jpeg",
 xl: "/mission-hero/genis-ekran.jpeg",
 xl2x: "/mission-hero/genis-ekran.jpeg",
};

export const PAGE_HERO_DEFAULTS = {
 about: {
  sm: "/about-visual/mobile.png",
  sm2x: "/about-visual/mobile-2x.png",
  md: "/about-visual/tablet.png",
  lg: "/about-visual/laptop.png",
  xl: "/about-visual/genis-ekran.png",
  xl2x: "/about-visual/genis-ekran-2x.png",
 },
 missionVision: MISSION_HERO_DEFAULTS,
 values: MISSION_HERO_DEFAULTS,
 commitments: MISSION_HERO_DEFAULTS,
 faq: {
  sm: "/faq-hero/mobile.png",
  sm2x: "/faq-hero/mobile-2x.png",
  md: "/faq-hero/tablet.png",
  lg: "/faq-hero/laptop.png",
  xl: "/faq-hero/genis-ekran.png",
  xl2x: "/faq-hero/genis-ekran-2x.png",
 },
 homeBrandExperience: {
  sm: "/brand-experience/mobile.png",
  sm2x: "/brand-experience/mobile-2x.png",
  md: "/brand-experience/tablet.png",
  lg: "/brand-experience/laptop.png",
  xl: "/brand-experience/genis-ekran.png",
  xl2x: "/brand-experience/genis-ekran-2x.png",
 },
};

export const PAGE_HERO_DEFAULT_IMAGE = {
 about: PAGE_HERO_DEFAULTS.about.xl,
 missionVision: PAGE_HERO_DEFAULTS.missionVision.xl,
 values: PAGE_HERO_DEFAULTS.values.xl,
 commitments: PAGE_HERO_DEFAULTS.commitments.xl,
 faq: PAGE_HERO_DEFAULTS.faq.xl,
 homeBrandExperience: PAGE_HERO_DEFAULTS.homeBrandExperience.xl,
};

export const EMPTY_PAGE_HERO_IMAGES = Object.fromEntries(
 PAGE_HERO_IMAGE_KEYS.map((key) => [key, ""])
);

const HERO_IMAGE_FALLBACK_KEYS = ["xl", "lg", "md", "sm", "sm2x", "xl2x"];

export function hasAnyPageHeroImage(heroImages) {
 if (!heroImages) return false;
 return PAGE_HERO_IMAGE_KEYS.some((key) => heroImages[key]?.trim());
}

function pickPrimaryHeroImage(heroImages) {
 for (const key of HERO_IMAGE_FALLBACK_KEYS) {
  const url = heroImages[key]?.trim();
  if (url) return url;
 }
 return "";
}

export function normalizePageHeroImages(content = {}) {
 const incoming = {
  ...EMPTY_PAGE_HERO_IMAGES,
  ...(content.heroImages ?? {}),
 };

 const heroImages = Object.fromEntries(
  PAGE_HERO_IMAGE_KEYS.map((key) => [key, incoming[key]?.trim() || ""])
 );

 const hasAnyHeroImage = PAGE_HERO_IMAGE_KEYS.some((key) => heroImages[key]);
 let heroImage = content.heroImage?.trim() || "";

 // Eski kayıt: yalnızca tek heroImage vardı → tüm breakpoint’lere yay
 if (!hasAnyHeroImage && heroImage) {
  return {
   ...content,
   heroImage,
   heroImages: Object.fromEntries(
    PAGE_HERO_IMAGE_KEYS.map((key) => [key, heroImage])
   ),
  };
 }

 if (!heroImage) {
  heroImage = pickPrimaryHeroImage(heroImages);
 }

 return {
  ...content,
  heroImage,
  heroImages,
 };
}

/** @deprecated Tek görsel — yerine mergePageHeroDeviceImage kullanın */
export function mergePageHeroImage(content = {}, url) {
 return mergePageHeroDeviceImage(content, "desktop", url);
}

export function mergePageHeroDeviceImage(content = {}, device, url) {
 const keys = PAGE_HERO_DEVICE_KEYS[device];
 if (!keys) return normalizePageHeroImages(content);

 const trimmed = url?.trim() ?? "";
 const current = normalizePageHeroImages(content);
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

export function getPageHeroDeviceImage(content, device) {
 const keys = PAGE_HERO_DEVICE_KEYS[device];
 if (!keys?.length) return "";

 const normalized = normalizePageHeroImages(content);
 return normalized.heroImages[keys[0]] ?? "";
}

export function getPageHeroDeviceDefaultImage(page, device) {
 const keys = PAGE_HERO_DEVICE_KEYS[device];
 const defaults = PAGE_HERO_DEFAULTS[page] ?? PAGE_HERO_DEFAULTS.about;
 if (!keys?.length) return defaults.xl;
 return defaults[keys[0]] ?? defaults.xl;
}

export function resolvePageHeroImage(page, content = {}) {
 const images = resolvePageHeroImages(page, content);
 return images.xl || images.lg || images.sm || PAGE_HERO_DEFAULT_IMAGE[page];
}

export function resolvePageHeroImages(page, content = {}) {
 const normalized = normalizePageHeroImages(content);
 const defaults = PAGE_HERO_DEFAULTS[page] ?? PAGE_HERO_DEFAULTS.about;

 const hasAnyCustom = PAGE_HERO_IMAGE_KEYS.some(
  (key) => normalized.heroImages[key]
 );

 if (!hasAnyCustom) {
  return { ...defaults };
 }

 return Object.fromEntries(
  PAGE_HERO_IMAGE_KEYS.map((key) => [
   key,
   normalized.heroImages[key] || defaults[key],
  ])
 );
}

export function keepPageHeroImages(content = {}) {
 const normalized = normalizePageHeroImages(content);
 return {
  ...content,
  heroImage: normalized.heroImage ?? "",
  heroImages: { ...EMPTY_PAGE_HERO_IMAGES, ...normalized.heroImages },
 };
}
