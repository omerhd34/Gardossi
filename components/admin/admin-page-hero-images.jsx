"use client";

import { useState } from "react";
import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import { saveContentBlock } from "@/components/admin/content-block-save";
import {
 getPageHeroDeviceImageHint,
 getPageHeroImageHint,
 PAGE_HERO_DEVICE_IMAGES,
} from "@/lib/admin/image-specs";
import { validateImageUploadFile } from "@/lib/admin/image-upload";
import {
 getPageHeroDeviceDefaultImage,
 getPageHeroDeviceImage,
 mergePageHeroDeviceImage,
 normalizePageHeroImages,
 PAGE_HERO_DEVICES,
} from "@/lib/content/page-hero-images";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const DEFAULT_DEVICE = "desktop";

function DeviceTabList({ device, onDeviceChange, ariaLabel }) {
 return (
  <div
   role="tablist"
   aria-label={ariaLabel}
   className="inline-flex shrink-0 rounded-lg border border-border/70 bg-muted/40 p-1"
  >
   {PAGE_HERO_DEVICES.map((deviceId) => {
    const { label } = PAGE_HERO_DEVICE_IMAGES[deviceId];
    const isActive = device === deviceId;

    return (
     <button
      key={deviceId}
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
       "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150",
       isActive
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => onDeviceChange(deviceId)}
     >
      {label}
     </button>
    );
   })}
  </div>
 );
}

export function AdminPageHeroImages({
 content,
 defaultPage,
 uploadFolder,
 contentKey,
 getContentTr,
 getContentEn,
 stripContent,
 onFormSync,
 uploading = false,
 onUploadingChange,
 sectionLabel = "Başlık arkaplan görseli",
}) {
 const [device, setDevice] = useState(DEFAULT_DEVICE);
 const spec = PAGE_HERO_DEVICE_IMAGES[device] ?? PAGE_HERO_DEVICE_IMAGES.desktop;
 const heroImage = getPageHeroDeviceImage(content, device);
 const defaultImage = getPageHeroDeviceDefaultImage(defaultPage, device);
 const heroHint = getPageHeroImageHint();

 function updateContentImage(current, url) {
  return mergePageHeroDeviceImage(current, device, url);
 }

 async function persistHeroImage(url) {
  const contentTr = updateContentImage(getContentTr(), url);
  const contentEn = updateContentImage(getContentEn(), url);

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
   contentTr: normalizePageHeroImages(saved.contentTr),
   contentEn: normalizePageHeroImages(saved.contentEn),
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
   const body = new FormData();
   body.append("file", file);
   body.append("folder", `${uploadFolder}/${device}`);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");
   if (!data.url) throw new Error("Yüklenen görsel adresi alınamadı");

   await persistHeroImage(data.url);
   toast.success(`${spec.label} görseli kaydedildi`);
  } catch (error) {
   toast.error(error.message || "Görsel kaydedilemedi");
  } finally {
   onUploadingChange(false);
  }
 }

 async function removeHeroImage() {
  onUploadingChange(true);
  try {
   await persistHeroImage("");
   toast.success(`${spec.label} görseli kaldırıldı`);
  } catch (error) {
   toast.error(error.message || "Görsel kaldırılamadı");
  } finally {
   onUploadingChange(false);
  }
 }

 return (
  <div className="space-y-3">
   <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="min-w-0 flex-1 space-y-1">
     <Label className="text-sm font-medium">{sectionLabel}</Label>
     <p className="text-xs text-muted-foreground">{heroHint.lead}</p>
    </div>
    <DeviceTabList
     device={device}
     onDeviceChange={setDevice}
     ariaLabel={`${sectionLabel} cihaz seçimi`}
    />
   </div>

   <AdminImageUpload
    label={`${spec.label} görseli`}
    value={heroImage}
    defaultPreview={defaultImage}
    onChange={(url) => {
     if (url === "") void removeHeroImage();
    }}
    onUpload={uploadHeroImage}
    uploading={uploading}
    hint={getPageHeroDeviceImageHint(device)}
    previewAspectClass={spec.previewAspectClass}
    fullWidth
   />
  </div>
 );
}
