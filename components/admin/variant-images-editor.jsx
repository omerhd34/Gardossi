"use client";

import Image from "next/image";
import { useState } from "react";
import { MdCloudUpload, MdDeleteOutline } from "react-icons/md";
import {
 PRODUCT_IMAGE_DEVICE_IMAGES,
 getProductDeviceImageHint,
 getProductImageRequirements,
 getProductImageSummary,
} from "@/lib/admin/image-specs";
import { PRODUCT_IMAGE_DEVICES, normalizeProductImage } from "@/lib/content/product-images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function DeviceTabList({ device, onDeviceChange }) {
 return (
  <div
   role="tablist"
   aria-label="Ürün görseli cihaz seçimi"
   className="inline-flex shrink-0 rounded-lg border border-border/70 bg-muted/40 p-1"
  >
   {PRODUCT_IMAGE_DEVICES.map((deviceId) => {
    const { label } = PRODUCT_IMAGE_DEVICE_IMAGES[deviceId];
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

export function VariantImagesEditor({
 images = [],
 productName = "",
 device = "desktop",
 onDeviceChange,
 uploading = false,
 uploadStatus = "",
 onSelectFile,
 onDropFiles,
 onSetPrimary,
 onMove,
 onRemove,
}) {
 const [isDragging, setIsDragging] = useState(false);
 const isDisabled = uploading;
 const spec = PRODUCT_IMAGE_DEVICE_IMAGES[device] ?? PRODUCT_IMAGE_DEVICE_IMAGES.desktop;
 const visibleImages = images.flatMap((image, imageIndex) => {
  const normalized = normalizeProductImage(image);
  const previewUrl = normalized.urls?.[device] || "";
  if (!previewUrl) return [];
  return [{ imageIndex, normalized, previewUrl }];
 });

 function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = isDisabled ? "none" : "copy";
  if (!isDisabled) setIsDragging(true);
 }

 function handleDragLeave(event) {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  setIsDragging(false);
 }

 function handleDrop(event) {
  event.preventDefault();
  setIsDragging(false);
  if (isDisabled) return;
  const files = Array.from(event.dataTransfer.files ?? []);
  if (files.length) onDropFiles?.(files);
 }

 return (
  <div className="space-y-3">
   <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="min-w-0 flex-1 space-y-1">
     <p className="text-xs text-muted-foreground">{getProductImageSummary()}</p>
     <p className="text-xs text-muted-foreground">{getProductImageRequirements()}</p>
     <p className="text-xs text-muted-foreground">{getProductDeviceImageHint(device)}</p>
    </div>
    <DeviceTabList device={device} onDeviceChange={onDeviceChange} />
   </div>

   <div
    className={cn(
     "space-y-3 rounded-lg border border-dashed bg-muted/10 p-3 transition-[border-color,box-shadow,background-color] duration-150",
     isDragging
      ? "border-charcoal/40 bg-muted/30 shadow-[0_0_0_3px_oklch(0.22_0.01_260/12%)]"
      : "border-border/70"
    )}
    onDragEnter={handleDragOver}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
   >
    <div className="flex min-h-8 items-center gap-3 rounded-lg border border-dashed border-border/70 bg-background/80 px-3 py-2">
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer shrink-0 transition-[scale]! delay-0 duration-350! ease-out! hover:scale-105 hover:delay-100"
      disabled={isDisabled}
      onClick={onSelectFile}
     >
      <MdCloudUpload className="size-4" aria-hidden />
      {uploading ? "Yükleniyor…" : "Görsel yükle"}
     </Button>
     {isDragging || uploadStatus || visibleImages.length === 0 ? (
      <p className="min-w-0 truncate text-sm text-muted-foreground">
       {isDragging
        ? "Görselleri bırakın"
        : uploadStatus || "Görseli buraya sürükleyip bırakabilirsiniz."}
      </p>
     ) : null}
     {visibleImages.length > 0 ? (
      <p className="ml-auto shrink-0 text-sm text-muted-foreground">
       {visibleImages.length} görsel
      </p>
     ) : null}
    </div>

    {visibleImages.length === 0 ? (
     <p className="text-sm text-muted-foreground">Henüz görsel eklenmedi.</p>
    ) : (
     <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {visibleImages.map(({ imageIndex, normalized, previewUrl }, visibleIndex) => {
       return (
        <div
         key={`${normalized.url}-${imageIndex}`}
         className="space-y-2 rounded-lg border bg-background p-2.5"
        >
         <div className="relative aspect-4/3 overflow-hidden rounded-md bg-muted">
          {previewUrl ? (
           <Image
            src={previewUrl}
            alt={normalized.alt || productName}
            fill
            className="object-cover"
            sizes="200px"
           />
          ) : (
           <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            {spec.label} yok
           </div>
          )}
         </div>
         <div className="flex flex-wrap gap-2">
          <Button
           type="button"
           size="sm"
           className="cursor-pointer"
           variant={normalized.isPrimary ? "default" : "outline"}
           onClick={() => onSetPrimary(imageIndex)}
          >
           {normalized.isPrimary ? "Kapak" : "Kapak yap"}
          </Button>
          <Button
           type="button"
           size="sm"
           variant="outline"
           className="cursor-pointer"
           onClick={() => onMove(imageIndex, visibleImages[visibleIndex - 1].imageIndex - imageIndex)}
           disabled={visibleIndex === 0}
          >
           ↑
          </Button>
          <Button
           type="button"
           size="sm"
           variant="outline"
           className="cursor-pointer"
           onClick={() => onMove(imageIndex, visibleImages[visibleIndex + 1].imageIndex - imageIndex)}
           disabled={visibleIndex === visibleImages.length - 1}
          >
           ↓
          </Button>
          <Button
           type="button"
           size="sm"
           variant="outline"
           className="cursor-pointer border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive [&_svg]:transition-transform [&_svg]:delay-0 [&_svg]:duration-350 [&_svg]:ease-out hover:[&_svg]:scale-125 hover:[&_svg]:delay-100"
           onClick={() => onRemove(imageIndex)}
          >
           <MdDeleteOutline aria-hidden />
           Kaldır
          </Button>
         </div>
        </div>
       );
      })}
     </div>
    )}
   </div>
  </div>
 );
}
