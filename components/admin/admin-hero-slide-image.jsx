"use client";

import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import { saveContentBlock } from "@/components/admin/content-block-save";
import { getHomeHeroSlideImageHint, HOME_HERO_DEVICE_IMAGES } from "@/lib/admin/image-specs";
import { validateImageUploadFile } from "@/lib/admin/image-upload";
import { uploadAdminImage } from "@/lib/admin/upload-admin-image";
import {
 getHeroSlideDeviceDefaultImage,
 getHeroSlideDeviceImage,
 mergeHeroSlideDeviceImage,
 normalizeHomeHeroContent,
} from "@/lib/content/home-hero-slides";
import { toast } from "sonner";

export function AdminHeroSlideImage({
 slideSlug,
 device = "desktop",
 slide,
 uploadFolder,
 contentKey,
 getContentTr,
 getContentEn,
 stripContent,
 onFormSync,
 uploading = false,
 onUploadingChange,
}) {
 const spec = HOME_HERO_DEVICE_IMAGES[device] ?? HOME_HERO_DEVICE_IMAGES.desktop;
 const heroImage = getHeroSlideDeviceImage(slide, device);
 const defaultImage = getHeroSlideDeviceDefaultImage(slideSlug, device);
 const label = `${spec.label} görseli`;

 function updateSlideImage(content, url) {
  return {
   ...content,
   slides: normalizeHomeHeroContent(content).slides.map((item) =>
    item.slug === slideSlug ? mergeHeroSlideDeviceImage(item, device, url) : item
   ),
  };
 }

 async function persistHeroImage(url) {
  const contentTr = updateSlideImage(getContentTr(), url);
  const contentEn = updateSlideImage(getContentEn(), url);

  if (!contentKey) {
   onFormSync({ contentTr, contentEn });
   return;
  }

  const saved = await saveContentBlock(
   contentKey,
   stripContent(contentTr),
   stripContent(contentEn)
  );

  onFormSync({
   contentTr: normalizeHomeHeroContent(saved.contentTr),
   contentEn: normalizeHomeHeroContent(saved.contentEn),
  });
 }

 async function uploadHeroImage(file) {
  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  onUploadingChange(true);
  try {
   const url = await uploadAdminImage(file, {
    folder: `${uploadFolder}/${device}`,
    maxWidth: spec.width,
    maxHeight: spec.height,
   });

   await persistHeroImage(url);
   toast.success(`${spec.label} görseli kaydedildi.`);
  } catch (error) {
   toast.error(error.message || "Görsel kaydedilemedi.");
  } finally {
   onUploadingChange(false);
  }
 }

 async function removeHeroImage() {
  onUploadingChange(true);
  try {
   await persistHeroImage("");
   toast.success(`${spec.label} görseli kaldırıldı.`);
  } catch (error) {
   toast.error(error.message || "Görsel kaldırılamadı.");
  } finally {
   onUploadingChange(false);
  }
 }

 return (
  <AdminImageUpload
   label={label}
   hideLabel
   value={heroImage}
   defaultPreview={defaultImage}
   onChange={(url) => {
    if (url === "") void removeHeroImage();
   }}
   onUpload={uploadHeroImage}
   uploading={uploading}
   hint=""
   previewHeightClass="h-56 w-full"
   fullWidth
  />
 );
}

export { getHomeHeroSlideImageHint };
