/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProductImagePicture } from "@/components/ui/product-image-picture";
import { useLocale } from "@/contexts/locale-provider";
import { ChevronLeft, ChevronRight, FullscreenExitIcon, FullscreenIcon, Loader2Icon, X } from "@/lib/icons";
import {
 lightboxFlipEnterNextClass,
 lightboxFlipEnterPrevClass,
 lightboxFlipExitNextClass,
 lightboxFlipExitPrevClass,
 lightboxImageFrameClass,
 lightboxSlideLayerClass,
 lightboxSlideOpenClass,
 lightboxStageClass,
} from "@/lib/layout/shared-styles";
import {
 preventImageSaveInteraction,
 productProtectedImageClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;
const SLIDE_DURATION_MS = 750;

function LightboxImage({
 image,
 alt,
 isFullscreen = false,
 onToggleFullscreen,
 toggleLabel,
 interactive = true,
}) {
 const frameClassName = cn(
  lightboxImageFrameClass,
  interactive &&
  "block h-full w-full cursor-zoom-in text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
  isFullscreen && "rounded-none border-0 bg-black shadow-none",
  isFullscreen && interactive && "cursor-zoom-out"
 );

 const saveGuardProps = {
  onContextMenu: preventImageSaveInteraction,
  onDragStart: preventImageSaveInteraction,
 };

 const imageElement = (
  <ProductImagePicture
   image={image}
   alt={alt}
   sizes={isFullscreen ? "100vw" : "(max-width: 1024px) 100vw, 90vw"}
   draggable={false}
   className={cn(
    "object-cover object-center transition-[object-fit] duration-300",
    productProtectedImageClass
   )}
   priority
  />
 );

 if (!interactive) {
  return (
   <div className={frameClassName} {...saveGuardProps}>
    {imageElement}
   </div>
  );
 }

 return (
  <button
   type="button"
   onClick={onToggleFullscreen}
   className={frameClassName}
   aria-label={toggleLabel}
   {...saveGuardProps}
  >
   {imageElement}
  </button>
 );
}

function LightboxControlButton({
 className,
 variant = "glass",
 isInactive = false,
 children,
 onClick,
 ...props
}) {
 return (
  <button
   type="button"
   onClick={(event) => {
    if (isInactive) return;
    onClick?.(event);
   }}
   className={cn(
    "flex scale-100 items-center justify-center rounded-full backdrop-blur-md transition-[scale,background-color,border-color,opacity] duration-200 ease-out active:duration-75 focus-visible:outline-none focus-visible:ring-2 motion-reduce:duration-150",
    isInactive
     ? "cursor-default scale-95 opacity-80"
     : "cursor-pointer opacity-100 hover:scale-110 active:scale-105",
    variant === "glass" &&
    "border border-white/15 bg-white/10 text-white shadow-[0_8px_32px_rgb(0_0_0/24%)] hover:border-white/25 hover:bg-white/18 focus-visible:ring-white/40",
    variant === "dark" &&
    "border border-black/25 bg-black/72 text-white shadow-[0_8px_32px_rgb(0_0_0/45%)] hover:border-black/35 hover:bg-black/88 focus-visible:ring-white/40",
    className
   )}
   {...props}
  >
   {children}
  </button>
 );
}

function getEnterClass(direction) {
 return direction === 1 ? lightboxFlipEnterNextClass : lightboxFlipEnterPrevClass;
}

function getExitClass(direction) {
 return direction === 1 ? lightboxFlipExitNextClass : lightboxFlipExitPrevClass;
}

export function ProductImageLightbox({
 images,
 index,
 onIndexChange,
 onClose,
}) {
 const { t } = useLocale();
 const open = index !== null && images.length > 0;
 const current = open ? images[index] : null;
 const hasPrev = open && index > 0;
 const hasNext = open && index < images.length - 1;
 const [visibleIndex, setVisibleIndex] = useState(index ?? 0);
 const [transition, setTransition] = useState(null);
 const [showOpenAnimation, setShowOpenAnimation] = useState(false);
 const [isFullscreen, setIsFullscreen] = useState(false);
 const overlayRef = useRef(null);
 const touchStartX = useRef(null);
 const isTransitioningRef = useRef(false);
 const skipTransitionRef = useRef(true);
 const transitionTimerRef = useRef(null);

 const clearTransitionTimer = useCallback(() => {
  if (transitionTimerRef.current !== null) {
   window.clearTimeout(transitionTimerRef.current);
   transitionTimerRef.current = null;
  }
 }, []);

 const finishTransition = useCallback(() => {
  clearTransitionTimer();
  isTransitioningRef.current = false;
  setTransition(null);
 }, [clearTransitionTimer]);

 useEffect(() => {
  if (!open) {
   setShowOpenAnimation(false);
   setIsFullscreen(false);
   return;
  }

  setShowOpenAnimation(true);
  const timer = window.setTimeout(() => setShowOpenAnimation(false), 420);
  return () => window.clearTimeout(timer);
 }, [open]);

 useEffect(() => {
  if (!open || index === null) {
   skipTransitionRef.current = true;
   finishTransition();
   setVisibleIndex(index ?? 0);
   return;
  }

  if (skipTransitionRef.current) {
   skipTransitionRef.current = false;
   setVisibleIndex(index);
   return;
  }

  if (index === visibleIndex) return;
  if (isTransitioningRef.current) return;

  const direction = index > visibleIndex ? 1 : -1;
  isTransitioningRef.current = true;
  setTransition({ from: visibleIndex, direction });
  setVisibleIndex(index);

  clearTransitionTimer();
  transitionTimerRef.current = window.setTimeout(
   finishTransition,
   SLIDE_DURATION_MS
  );
 }, [
  clearTransitionTimer,
  finishTransition,
  index,
  open,
  visibleIndex,
 ]);

 useEffect(() => () => clearTransitionTimer(), [clearTransitionTimer]);

 const startSlide = useCallback(
  (nextIndex) => {
   if (nextIndex < 0 || nextIndex >= images.length) return;
   if (nextIndex === index) return;
   if (isTransitioningRef.current) return;

   onIndexChange(nextIndex);
  },
  [images.length, index, onIndexChange]
 );

 const goPrev = useCallback(() => {
  if (hasPrev) startSlide(index - 1);
 }, [hasPrev, index, startSlide]);

 const goNext = useCallback(() => {
  if (hasNext) startSlide(index + 1);
 }, [hasNext, index, startSlide]);

 const toggleFullscreen = useCallback(async () => {
  if (isTransitioningRef.current) return;

  const overlay = overlayRef.current;

  try {
   if (document.fullscreenElement === overlay) {
    await document.exitFullscreen();
    return;
   }

   if (overlay?.requestFullscreen) {
    await overlay.requestFullscreen();
    return;
   }
  } catch {
   // Tarayıcı tam ekranı desteklemiyorsa CSS moduna düş.
  }

  setIsFullscreen((current) => !current);
 }, []);

 useEffect(() => {
  const onFullscreenChange = () => {
   setIsFullscreen(document.fullscreenElement === overlayRef.current);
  };

  document.addEventListener("fullscreenchange", onFullscreenChange);
  return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
 }, []);

 useEffect(() => {
  if (open) return;

  if (document.fullscreenElement === overlayRef.current) {
   document.exitFullscreen?.().catch(() => { });
  }
 }, [open]);

 const handleBackdropClick = useCallback(async () => {
  if (document.fullscreenElement === overlayRef.current) {
   try {
    await document.exitFullscreen();
   } catch {
    setIsFullscreen(false);
   }
   return;
  }

  if (isFullscreen) {
   setIsFullscreen(false);
   return;
  }

  onClose();
 }, [isFullscreen, onClose]);

 useEffect(() => {
  if (!open) return undefined;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  const onKeyDown = (event) => {
   if (event.key === "Escape") {
    if (document.fullscreenElement === overlayRef.current) return;

    if (isFullscreen) {
     setIsFullscreen(false);
     return;
    }

    onClose();
   }
   if (event.key === "ArrowLeft") goPrev();
   if (event.key === "ArrowRight") goNext();
  };

  window.addEventListener("keydown", onKeyDown);

  return () => {
   document.body.style.overflow = previousOverflow;
   window.removeEventListener("keydown", onKeyDown);
  };
 }, [open, goPrev, goNext, onClose, isFullscreen]);

 const handleTouchStart = (event) => {
  touchStartX.current = event.touches[0]?.clientX ?? null;
 };

 const handleTouchEnd = (event) => {
  if (touchStartX.current === null) return;

  const endX = event.changedTouches[0]?.clientX;
  if (endX == null) return;

  const delta = endX - touchStartX.current;
  touchStartX.current = null;

  if (Math.abs(delta) < SWIPE_THRESHOLD) return;
  if (delta > 0) goPrev();
  else goNext();
 };

 const isTransitioning = transition !== null;
 const activeImage = images[visibleIndex] ?? current;
 const fullscreenToggleLabel = isFullscreen
  ? t("product.exitFullscreen")
  : t("product.enterFullscreen");

 if (!open || !current || !activeImage || typeof document === "undefined") {
  return null;
 }

 return createPortal(
  <div
   ref={overlayRef}
   className={cn(
    "fixed inset-0 z-100 h-dvh min-h-dvh w-full animate-in duration-300 fade-in-0",
    isFullscreen
     ? "bg-black"
     : "bg-black/78 supports-backdrop-filter:backdrop-blur-md"
   )}
   onClick={handleBackdropClick}
   role="dialog"
   aria-modal="true"
   aria-label={current.alt ?? t("product.productImage")}
  >
   <div
    className={cn(
     isFullscreen
      ? "fixed inset-0 z-10 h-dvh w-full"
      : "absolute inset-0 flex h-full w-full items-center justify-center px-14 pt-14 pb-4 md:px-20 md:pt-16 lg:px-24 lg:pt-20 lg:pb-8"
    )}
   >
    <div
     className={cn(
      lightboxStageClass,
      isFullscreen && "h-dvh w-full max-w-none"
     )}
     onClick={(event) => event.stopPropagation()}
     onTouchStart={handleTouchStart}
     onTouchEnd={handleTouchEnd}
    >
     {transition && images[transition.from] ? (
      <div
       key={`exit-${transition.from}-${visibleIndex}`}
       className={cn(
        lightboxSlideLayerClass,
        "pointer-events-none z-1",
        getExitClass(transition.direction)
       )}
      >
       <LightboxImage
        image={images[transition.from]}
        alt={
         images[transition.from].alt ?? t("product.productImage")
        }
        isFullscreen={isFullscreen}
        interactive={false}
       />
      </div>
     ) : null}

     <div
      key={`active-${visibleIndex}`}
      className={cn(
       lightboxSlideLayerClass,
       "z-2",
       transition
        ? cn(getEnterClass(transition.direction), "z-2")
        : showOpenAnimation
         ? lightboxSlideOpenClass
         : null
      )}
     >
      <LightboxImage
       image={activeImage}
       alt={activeImage.alt ?? t("product.productImage")}
       isFullscreen={isFullscreen}
       onToggleFullscreen={toggleFullscreen}
       toggleLabel={fullscreenToggleLabel}
      />
     </div>
    </div>
   </div>

   <header
    className={cn(
     "absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-4 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-2 md:px-8 md:pt-6",
     isFullscreen && "pointer-events-none [&_button]:pointer-events-auto [&_p]:pointer-events-auto"
    )}
    onClick={(event) => event.stopPropagation()}
   >
    {images.length > 1 ? (
     <p className="rounded-full border border-black/25 bg-black/72 px-3.5 py-1.5 text-sm font-medium tracking-wide text-white shadow-[0_8px_32px_rgb(0_0_0/45%)] backdrop-blur-md tabular-nums">
      <span>{index + 1}</span>
      <span className="mx-1.5 text-white/50">/</span>
      <span className="text-white/80">{images.length}</span>
     </p>
    ) : (
     <span aria-hidden="true" />
    )}

    <div className="ml-auto flex items-center gap-2">
     <LightboxControlButton
      variant="dark"
      onClick={toggleFullscreen}
      className="size-11"
      aria-label={fullscreenToggleLabel}
     >
      {isFullscreen ? (
       <FullscreenExitIcon className="size-5" />
      ) : (
       <FullscreenIcon className="size-5" />
      )}
     </LightboxControlButton>

     <LightboxControlButton
      variant="dark"
      onClick={onClose}
      className="size-11"
      aria-label={t("common.close")}
     >
      <X className="size-5" />
     </LightboxControlButton>
    </div>
   </header>

   {hasPrev ? (
    <LightboxControlButton
     variant="dark"
     isInactive={isTransitioning}
     onClick={(event) => {
      event.stopPropagation();
      goPrev();
     }}
     className="absolute top-1/2 left-3 z-20 size-11 -translate-y-1/2 md:left-6 md:size-12"
     aria-label={t("product.previousImage")}
    >
     {isTransitioning ? (
      <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
     ) : (
      <ChevronLeft className="size-6" aria-hidden="true" />
     )}
    </LightboxControlButton>
   ) : null}

   {hasNext ? (
    <LightboxControlButton
     variant="dark"
     isInactive={isTransitioning}
     onClick={(event) => {
      event.stopPropagation();
      goNext();
     }}
     className="absolute top-1/2 right-3 z-20 size-11 -translate-y-1/2 md:right-6 md:size-12"
     aria-label={t("product.nextImage")}
    >
     {isTransitioning ? (
      <Loader2Icon className="size-5 animate-spin" aria-hidden="true" />
     ) : (
      <ChevronRight className="size-6" aria-hidden="true" />
     )}
    </LightboxControlButton>
   ) : null}
  </div>,
  document.body
 );
}
