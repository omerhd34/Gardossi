"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MdCloudUpload, MdDeleteOutline, MdImage, MdZoomIn } from "react-icons/md";
import { toast } from "sonner";
import { IMAGE_UPLOAD_MAX_SIZE_LABEL, validateImageUploadFile } from "@/lib/admin/image-upload";
import { X } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp";

function AdminUploadSpinner({ className }) {
 return (
  <div
   role="status"
   aria-label="Yükleniyor"
   className={cn(
    "rounded-full border-[3px] border-charcoal/10 border-t-charcoal/70 animate-spin",
    className
   )}
  />
 );
}

function AdminImageLightbox({ src, alt, onClose }) {
 useEffect(() => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  function onKeyDown(event) {
   if (event.key === "Escape") onClose();
  }

  window.addEventListener("keydown", onKeyDown);
  return () => {
   document.body.style.overflow = previousOverflow;
   window.removeEventListener("keydown", onKeyDown);
  };
 }, [onClose]);

 return createPortal(
  <div
   className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-[2px] sm:p-8"
   role="dialog"
   aria-modal="true"
   aria-label={`${alt} — gerçek boyut`}
   onClick={onClose}
  >
   <Button
    type="button"
    variant="secondary"
    size="icon"
    className="absolute top-4 right-4 z-10 size-10 cursor-pointer border-white/20 bg-background/95 text-foreground shadow-md"
    aria-label="Kapat"
    onClick={onClose}
   >
    <X className="size-5" />
   </Button>

   {/* eslint-disable-next-line @next/next/no-img-element */}
   <img
    src={src}
    alt={alt}
    className="max-h-[min(92vh,1600px)] max-w-[min(96vw,1600px)] object-contain shadow-2xl"
    onClick={(event) => event.stopPropagation()}
   />
  </div>,
  document.body
 );
}

export function AdminImageUpload({
 label = "Kapak görseli",
 hideLabel = false,
 value = "",
 defaultPreview = "",
 onChange,
 onUpload,
 uploading = false,
 disabled = false,
 hint = `JPG, PNG veya WebP - Maks. ${IMAGE_UPLOAD_MAX_SIZE_LABEL}`,
 dropzoneHint,
 previewAspectClass = "aspect-16/10",
 previewHeightClass = "",
 hintMinHeightClass = "",
 stretch = false,
 fullWidth = false,
 className,
}) {
 const inputRef = useRef(null);
 const [isDragging, setIsDragging] = useState(false);
 const [lightboxOpen, setLightboxOpen] = useState(false);
 const isDisabled = disabled || uploading;
 const hasCustomImage = Boolean(value);
 const previewSrc = value || defaultPreview;
 const showPreview = Boolean(previewSrc);
 const showHeading = !hideLabel || Boolean(hint);

 async function processFile(file) {
  if (!file || isDisabled) return;

  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  await onUpload(file);
 }

 function openFilePicker() {
  if (isDisabled) return;
  inputRef.current?.click();
 }

 function handlePreviewClick() {
  if (uploading || isDragging) return;
  if (showPreview) {
   setLightboxOpen(true);
   return;
  }
  openFilePicker();
 }

 function handleFileChange(event) {
  void processFile(event.target.files?.[0]);
  event.target.value = "";
 }

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
  void processFile(event.dataTransfer.files?.[0]);
 }

 const isPortraitPreview =
  !previewHeightClass &&
  /aspect-(2\/3|3\/4|9\/16)/.test(previewAspectClass || "");

 const previewClassName = cn(
  "relative overflow-hidden bg-muted",
  previewHeightClass || previewAspectClass,
  isPortraitPreview ? "mx-auto w-full max-w-xs" : "w-full"
 );

 return (
  <div className={cn(stretch ? "flex h-full flex-col space-y-3" : "space-y-3", className)}>
   {showHeading ? (
    <div className={cn("space-y-1", hintMinHeightClass)}>
     {hideLabel ? null : <Label>{label}</Label>}
     {hint ? (
      <p
       className={cn(
        "text-[11px] leading-snug text-muted-foreground",
        fullWidth && "line-clamp-2"
       )}
      >
       {hint}
      </p>
     ) : null}
    </div>
   ) : null}

   <input
    ref={inputRef}
    type="file"
    accept={ACCEPT}
    className="sr-only"
    onChange={handleFileChange}
    disabled={isDisabled}
    tabIndex={-1}
    aria-hidden
   />

   <div
    className={cn(
     "overflow-hidden rounded-xl border bg-card shadow-sm transition-[border-color,box-shadow] duration-150",
     isDragging
      ? "border-charcoal/40 shadow-[0_0_0_3px_oklch(0.22_0.01_260/12%)]"
      : "border-border/70",
     fullWidth ? "w-full" : "mx-auto w-full max-w-2xl",
     stretch && "flex flex-1 flex-col",
     (!isDisabled || showPreview) && "cursor-pointer"
    )}
    onDragEnter={handleDragOver}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
   >
    <div
     className={cn(previewClassName, "select-none", showPreview && "cursor-zoom-in")}
     onClick={handlePreviewClick}
     role={showPreview ? "button" : undefined}
     tabIndex={showPreview ? 0 : undefined}
     aria-label={showPreview ? `${label} — gerçek boyutta aç` : undefined}
     onKeyDown={(event) => {
      if (!showPreview) return;
      if (event.key === "Enter" || event.key === " ") {
       event.preventDefault();
       setLightboxOpen(true);
      }
     }}
    >
     {showPreview ? (
      <Image
       src={previewSrc}
       alt={label}
       fill
       unoptimized={Boolean(value)}
       className="pointer-events-none object-cover object-center"
       sizes="(max-width: 768px) 100vw, 640px"
      />
     ) : (
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
       <MdImage className="size-10 opacity-60" aria-hidden />
       <p className="text-sm">Henüz görsel yüklenmedi</p>
      </div>
     )}

     {!hasCustomImage && showPreview && !uploading ? (
      <span className="pointer-events-none absolute top-3 left-3 z-10 rounded-full border border-white/35 bg-black/45 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
       Varsayılan görsel
      </span>
     ) : null}

     {showPreview && !uploading ? (
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex items-center gap-1 rounded-full border border-white/35 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
       <MdZoomIn className="size-3.5" aria-hidden />
       Gerçek boyut
      </span>
     ) : null}

     {hasCustomImage && !uploading ? (
      <Button
       type="button"
       variant="secondary"
       size="icon"
       className="absolute top-3 right-3 z-10 size-10 cursor-pointer border-border/70 bg-background/95 text-destructive shadow-md backdrop-blur-sm transition-[scale]! delay-0 duration-350! ease-out! hover:scale-110 hover:delay-100 hover:bg-background hover:text-destructive"
       disabled={isDisabled}
       aria-label="Görseli kaldır"
       onClick={(event) => {
        event.stopPropagation();
        onChange("");
       }}
      >
       <MdDeleteOutline className="size-5" />
      </Button>
     ) : null}

     {uploading ? (
      <div className="absolute inset-0 flex items-center justify-center bg-background/75 backdrop-blur-[2px]">
       <AdminUploadSpinner className="size-9" />
      </div>
     ) : null}

     {isDragging ? (
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-background/70 backdrop-blur-[2px]">
       <p className="rounded-full border border-charcoal/15 bg-background px-4 py-2 text-sm font-medium text-charcoal">
        Görseli bırakın
       </p>
      </div>
     ) : null}
    </div>

    <div
     className={cn(
      "flex flex-col items-center gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:justify-center",
      stretch && "mt-auto"
     )}
    >
     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer transition-[scale]! delay-0 duration-350! ease-out! hover:scale-105 hover:delay-100"
      disabled={isDisabled}
      onClick={openFilePicker}
     >
      <MdCloudUpload className="size-4" />
      Görsel yükle
     </Button>
     <p className="text-center text-xs text-muted-foreground sm:text-left">
      {dropzoneHint || "Görseli buraya sürükleyip bırakabilirsiniz."}
     </p>
    </div>
   </div>

   {lightboxOpen && previewSrc ? (
    <AdminImageLightbox
     src={previewSrc}
     alt={label}
     onClose={() => setLightboxOpen(false)}
    />
   ) : null}
  </div>
 );
}
