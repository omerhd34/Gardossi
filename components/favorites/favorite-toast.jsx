"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { CloseIcon, Heart, HeartFilled } from "@/lib/icons";
import { isToastOverImage } from "@/lib/favorites/toast-surface";
import { cn } from "@/lib/utils";

const FAVORITE_TOAST_ID = "favorite-toast";

function useToastOverImage(containerRef) {
 const [overImage, setOverImage] = useState(false);

 const update = useCallback(() => {
  const el = containerRef.current;
  if (!el) return;
  setOverImage(isToastOverImage(el));
 }, [containerRef]);

 useLayoutEffect(() => {
  let frame = 0;

  const scheduleUpdate = () => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(update);
  };

  scheduleUpdate();

  const container = containerRef.current;
  const resizeObserver =
   typeof ResizeObserver !== "undefined" && container
    ? new ResizeObserver(scheduleUpdate)
    : null;
  resizeObserver?.observe(container);

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);

  return () => {
   cancelAnimationFrame(frame);
   resizeObserver?.disconnect();
   window.removeEventListener("scroll", scheduleUpdate);
   window.removeEventListener("resize", scheduleUpdate);
  };
 }, [update, containerRef]);

 return overImage;
}

function FavoriteToastContent({
 id,
 added,
 title,
 titleShort,
 description,
 closeLabel,
}) {
 const containerRef = useRef(null);
 const overImage = useToastOverImage(containerRef);

 return (
  <div
   ref={containerRef}
   role="status"
   aria-live="polite"
   className={cn(
    "pointer-events-auto flex w-full max-w-88 items-center gap-2 rounded-2xl border p-2.5 shadow-(--glass-float-shadow) transition-[background-color,border-color,backdrop-filter] duration-300 sm:mx-auto sm:w-auto sm:max-w-md sm:items-start sm:gap-3 sm:p-3.5 ultra:max-w-lg ultra:gap-4 ultra:rounded-3xl ultra:p-4 tv:max-w-xl tv:gap-5 tv:p-5",
    overImage
     ? "border-white/18 bg-charcoal/95 text-white backdrop-blur-none"
     : "border-(--glass-hero-border) bg-(--glass-hero-icon-surface) [backdrop-filter:var(--glass-hero-blur)] [-webkit-backdrop-filter:var(--glass-hero-blur)]"
   )}
  >
   <div
    className={cn(
     "flex size-8 shrink-0 items-center justify-center rounded-full border sm:size-10 ultra:size-12 tv:size-14",
     overImage
      ? "border-white/20 bg-white/12"
      : "border-white/20 bg-white/15",
     added ? "text-red-400" : overImage ? "text-white/90" : "text-charcoal/80"
    )}
   >
    {added ? (
     <HeartFilled className="size-4.5 sm:size-5 ultra:size-6 tv:size-7" aria-hidden />
    ) : (
     <Heart className="size-4.5 sm:size-5 ultra:size-6 tv:size-7" aria-hidden />
    )}
   </div>

   <div className="min-w-0 flex-1">
    <p
     className={cn(
      "text-sm font-semibold leading-snug sm:whitespace-nowrap ultra:text-base tv:text-lg",
      overImage ? "text-white" : "text-charcoal"
     )}
    >
     <span className="sm:hidden">{titleShort ?? title}</span>
     <span className="hidden sm:inline">{title}</span>
    </p>
    {description ? (
     <p
      className={cn(
       "mt-0.5 truncate text-xs leading-relaxed max-sm:mt-0 max-sm:text-[0.6875rem] ultra:mt-1 ultra:text-sm tv:mt-1.5 tv:text-base",
       overImage ? "text-white/72" : "text-muted-foreground"
      )}
     >
      {description}
     </p>
    ) : null}
   </div>

   <button
    type="button"
    onClick={() => toast.dismiss(id)}
    className={cn(
     "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition sm:size-8 ultra:size-10 tv:size-11",
     overImage
      ? "text-white/55 hover:bg-white/12 hover:text-white"
      : "text-charcoal/55 hover:bg-charcoal/6 hover:text-charcoal"
    )}
    aria-label={closeLabel}
   >
    <CloseIcon className="size-4 ultra:size-5 tv:size-6" aria-hidden />
   </button>
  </div>
 );
}

export function showFavoriteToast({
 added,
 title,
 titleShort,
 description,
 closeLabel,
}) {
 toast.custom(
  (id) => (
   <FavoriteToastContent
    id={id}
    added={added}
    title={title}
    titleShort={titleShort}
    description={description}
    closeLabel={closeLabel}
   />
  ),
  {
   id: FAVORITE_TOAST_ID,
   duration: 3200,
   unstyled: true,
   closeButton: false,
   classNames: {
    toast:
     "max-sm:!absolute max-sm:!bottom-0 max-sm:!left-0 max-sm:!right-0 !min-h-0 !gap-0 !border-0 !bg-transparent !p-0 !shadow-none !backdrop-blur-none",
   },
  }
 );
}
