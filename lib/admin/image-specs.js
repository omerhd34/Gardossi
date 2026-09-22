import { IMAGE_UPLOAD_MAX_SIZE_LABEL } from "@/lib/admin/image-upload";

export const CATEGORY_COVER_IMAGE = {
 width: 1600,
 height: 1000,
 aspectRatio: "16:10",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export const CATEGORY_HERO_IMAGE = {
 width: 1920,
 height: 640,
 aspectRatio: "3:1",
 previewAspectClass: "aspect-3/1",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export function getCategoryCoverImageSummary() {
 const { width, height, aspectRatio } = CATEGORY_COVER_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı yatay görsel yükleyin. Ürünler menüsü ve kategoriler sayfasındaki kartlarda gösterilir.`;
}

export function getCategoryCoverImageRequirements() {
 const { acceptedFormats, maxFileSize } = CATEGORY_COVER_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} - En fazla ${maxFileSize}`;
}

export function getCategoryHeroImageSummary() {
 const { width, height, aspectRatio } = CATEGORY_HERO_IMAGE;

 return `${width} × ${height} px boyutunda, ${aspectRatio} en-boy oranlı geniş yatay hero görseli yükleyin. Sol üst köşede beyaz logo görünür; bu bölge açık renk veya beyaza yakın olmamalıdır.`;
}

export function getCategoryHeroImageBrightnessWarning() {
 return "Sol üst köşedeki beyaz logo, açık tonlu bir arka planda kaybolur. Kontrast için bu bölümü koyu tutun veya daha koyu bir hero görseli seçin.";
}

export function getCategoryHeroImageRequirements() {
 const { acceptedFormats, maxFileSize } = CATEGORY_HERO_IMAGE;

 return `Desteklenen formatlar: ${acceptedFormats.join(", ")} - En fazla ${maxFileSize}`;
}

/** Tek hero görseli - object-cover ile tüm breakpoint’lerde kırpılır. */
export const PAGE_HERO_IMAGE = {
 width: 2400,
 height: 1350,
 aspectRatio: "16:9",
 previewAspectClass: "aspect-video",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export const PAGE_HERO_DEVICE_IMAGES = {
 mobile: {
  id: "mobile",
  label: "Mobil",
  width: 1080,
  height: 1620,
  aspectRatio: "2:3",
  previewAspectClass: "aspect-2/3",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
 tablet: {
  id: "tablet",
  label: "Tablet",
  width: 1024,
  height: 768,
  aspectRatio: "4:3",
  previewAspectClass: "aspect-4/3",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
 desktop: {
  id: "desktop",
  label: "Masaüstü",
  width: 2400,
  height: 1350,
  aspectRatio: "16:9",
  previewAspectClass: "aspect-video",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
};

export function getPageHeroImageHint() {
 return {
  lead:
   "Mobil, tablet ve masaüstü görsellerini ayrı ayrı yükleyin. Cihaza göre doğru dosya gösterilir.",
 };
}

export function getPageHeroDeviceImageHint(device) {
 const spec = PAGE_HERO_DEVICE_IMAGES[device] ?? PAGE_HERO_DEVICE_IMAGES.desktop;
 return `Önerilen: ${spec.width} × ${spec.height} px (${spec.aspectRatio})`;
}

export const FAQ_HERO_IMAGE = CATEGORY_HERO_IMAGE;

export function getFaqHeroImageSummary() {
 return getCategoryHeroImageSummary();
}

export function getFaqHeroImageRequirements() {
 return getCategoryHeroImageRequirements();
}

export const MISSION_HERO_IMAGE = CATEGORY_HERO_IMAGE;

export function getMissionHeroImageSummary() {
 return getCategoryHeroImageSummary();
}

export function getMissionHeroImageRequirements() {
 return getCategoryHeroImageRequirements();
}

/** Anasayfa hero slayt — masaüstü (geriye dönük uyumluluk). */
export const HOME_HERO_SLIDE_IMAGE = {
 width: 2560,
 height: 1707,
 aspectRatio: "3:2",
 previewAspectClass: "aspect-3/2",
 maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
 acceptedFormats: ["JPG", "PNG", "WebP"],
};

export const HOME_HERO_DEVICE_IMAGES = {
 mobile: {
  id: "mobile",
  label: "Mobil",
  width: 1080,
  height: 1920,
  aspectRatio: "9:16",
  previewAspectClass: "aspect-9/16",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
 tablet: {
  id: "tablet",
  label: "Tablet",
  width: 1440,
  height: 2560,
  aspectRatio: "9:16",
  previewAspectClass: "aspect-9/16",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
 desktop: {
  id: "desktop",
  label: "Masaüstü",
  width: 2560,
  height: 1707,
  aspectRatio: "3:2",
  previewAspectClass: "aspect-3/2",
  maxFileSize: IMAGE_UPLOAD_MAX_SIZE_LABEL,
  acceptedFormats: ["JPG", "PNG", "WebP"],
 },
};

export function getHomeHeroSlideImageHint() {
 return {
  lead:
   "Her slayt için mobil, tablet ve masaüstü görsellerini ayrı ayrı yükleyin. Cihaza göre doğru dosya gösterilir.",
 };
}

export function getHomeHeroDeviceImageHint(device) {
 const spec = HOME_HERO_DEVICE_IMAGES[device] ?? HOME_HERO_DEVICE_IMAGES.desktop;
 return `Önerilen: ${spec.width} × ${spec.height} px (${spec.aspectRatio})`;
}
