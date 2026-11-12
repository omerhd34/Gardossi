"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "@/lib/icons";
import { Button } from "@/components/ui/button";

export function AdminImageLightbox({ src, alt, onClose }) {
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
