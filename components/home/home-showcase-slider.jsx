"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChevronRight, HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { contactFloatBtnClass } from "@/lib/layout/header-styles";
import {
 containerPremiumClass,
 headingDisplayClass,
 interactiveMotionClass,
 sectionPaddingClass,
} from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
 useCarousel,
} from "@/components/ui/carousel";

const ShowcaseSlidesContext = createContext(3);

function getSlideClassName(slidesPerView) {
 return cn(
  "pl-0 sm:pl-5",
  slidesPerView === 2 ? "basis-full sm:basis-1/2" : "basis-full sm:basis-1/3"
 );
}

const SHOWCASE_AUTOPLAY_MS = 6000;

const navOverlayButtonClassName = cn(
 contactFloatBtnClass,
 "size-10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 sm:size-9",
 interactiveMotionClass,
 "[&_svg]:size-5.5 sm:[&_svg]:size-5 [&_svg]:[stroke-width:2.5]"
);

const navFlankButtonClassName = cn(
 contactFloatBtnClass,
 "size-10 text-white/96 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-25 sm:size-11 lg:size-12",
 "[&_svg]:size-5 md:[&_svg]:size-[1.375rem] [&_svg]:[stroke-width:3.5]"
);

const navOverlayPrevClassName =
 "absolute top-1/2 z-20 -translate-y-1/2 left-3 md:hidden";

const navOverlayNextClassName =
 "absolute top-1/2 z-20 -translate-y-1/2 right-3 md:hidden";

const navFlankClassName = "hidden shrink-0 md:inline-flex";

function useShowcaseAutoplay(api, enabled) {
 const autoplayTimerRef = useRef(null);
 const autoplayRemainingRef = useRef(SHOWCASE_AUTOPLAY_MS);
 const autoplayStartedAtRef = useRef(0);

 const clearAutoplayTimer = useCallback(() => {
  if (autoplayTimerRef.current !== null) {
   window.clearTimeout(autoplayTimerRef.current);
   autoplayTimerRef.current = null;
  }
 }, []);

 const scheduleAutoplay = useCallback(
  (delay = SHOWCASE_AUTOPLAY_MS) => {
   if (!api || !enabled) return;

   clearAutoplayTimer();
   autoplayRemainingRef.current = delay;
   autoplayStartedAtRef.current = Date.now();

   if (document.hidden) return;

   autoplayTimerRef.current = window.setTimeout(() => {
    api.scrollNext();
   }, delay);
  },
  [api, clearAutoplayTimer, enabled]
 );

 const pauseAutoplay = useCallback(() => {
  if (autoplayTimerRef.current === null) return;

  const elapsed = Date.now() - autoplayStartedAtRef.current;
  autoplayRemainingRef.current = Math.max(
   0,
   autoplayRemainingRef.current - elapsed
  );
  clearAutoplayTimer();
 }, [clearAutoplayTimer]);

 const resumeAutoplay = useCallback(() => {
  if (!api || !enabled || autoplayTimerRef.current !== null) return;
  scheduleAutoplay(autoplayRemainingRef.current);
 }, [api, enabled, scheduleAutoplay]);

 useEffect(() => {
  if (!api || !enabled) return;

  const onSelect = () => scheduleAutoplay();
  const onPointerDown = () => clearAutoplayTimer();

  onSelect();
  api.on("select", onSelect);
  api.on("reInit", onSelect);
  api.on("pointerDown", onPointerDown);

  return () => {
   api.off("select", onSelect);
   api.off("reInit", onSelect);
   api.off("pointerDown", onPointerDown);
   clearAutoplayTimer();
  };
 }, [api, clearAutoplayTimer, enabled, scheduleAutoplay]);

 useEffect(() => {
  const onVisibilityChange = () => {
   if (document.hidden) {
    pauseAutoplay();
   } else {
    resumeAutoplay();
   }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  return () =>
   document.removeEventListener("visibilitychange", onVisibilityChange);
 }, [pauseAutoplay, resumeAutoplay]);
}

function HomeShowcaseNav({ direction, variant = "overlay", className }) {
 const { scrollPrev, scrollNext, canScrollNext } = useCarousel();
 const isPrev = direction === "prev";
 const disabled = isPrev ? false : !canScrollNext;
 const Icon = isPrev ? HeroChevronLeft : HeroChevronRight;

 const variantClassName =
  variant === "flank"
   ? cn(navFlankButtonClassName, navFlankClassName)
   : isPrev
    ? cn(navOverlayButtonClassName, navOverlayPrevClassName)
    : cn(navOverlayButtonClassName, navOverlayNextClassName);

 return (
  <button
   type="button"
   onClick={isPrev ? scrollPrev : scrollNext}
   disabled={disabled}
   className={cn(variantClassName, className)}
   aria-label={isPrev ? "Önceki slayt" : "Sonraki slayt"}
  >
   <Icon strokeWidth={variant === "flank" ? 3.5 : 2.5} aria-hidden />
  </button>
 );
}

function HomeShowcaseTrack({ children }) {
 return (
  <div
   className={cn(
    containerPremiumClass,
    "md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-center md:gap-3 xl:gap-4"
   )}
  >
   <HomeShowcaseNav direction="prev" variant="flank" />
   <div className="relative min-w-0">
    <CarouselContent className="ml-0 sm:-ml-5">{children}</CarouselContent>
    <HomeShowcaseNav direction="prev" variant="overlay" />
    <HomeShowcaseNav direction="next" variant="overlay" />
   </div>
   <HomeShowcaseNav direction="next" variant="flank" />
  </div>
 );
}

export function HomeShowcaseSlider({
 id,
 title,
 description,
 action,
 itemCount = 0,
 slidesPerView = 3,
 className,
 children,
}) {
 const [carouselApi, setCarouselApi] = useState(null);
 const [autoplayEnabled, setAutoplayEnabled] = useState(true);

 useEffect(() => {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const updateAutoplay = () => setAutoplayEnabled(!motionQuery.matches);

  updateAutoplay();
  motionQuery.addEventListener("change", updateAutoplay);

  return () => motionQuery.removeEventListener("change", updateAutoplay);
 }, []);

 useShowcaseAutoplay(carouselApi, autoplayEnabled && itemCount > 1);

 if (!itemCount) {
  return null;
 }

 return (
  <section id={id} className={cn(sectionPaddingClass, "bg-white", className)}>
   <div className={containerPremiumClass}>
    <div className="mb-10 text-center md:mb-14">
     <h2 className={cn(headingDisplayClass, "text-charcoal")}>{title}</h2>
     {description ? (
      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
       {description}
      </p>
     ) : null}
     {action ? (
      <Link
       href={action.href}
       className={cn(
        "group/action mt-6 inline-flex origin-center items-center gap-1.5 rounded-full border border-charcoal/12 bg-white px-5 py-2.5 text-sm font-semibold text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] hover:scale-105 hover:border-charcoal/25 hover:bg-cream/60",
        interactiveMotionClass
       )}
      >
       {action.label}
       <ChevronRight
        className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/action:translate-x-0.5 motion-reduce:transition-none"
        aria-hidden
       />
      </Link>
     ) : null}
    </div>
   </div>

   <ShowcaseSlidesContext.Provider value={slidesPerView}>
    <Carousel
     setApi={setCarouselApi}
     opts={{
      align: "start",
      loop: true,
      duration: 28,
      containScroll: "trimSnaps",
      dragFree: false,
      slidesToScroll: 1,
     }}
     className="w-full"
     aria-label={title}
    >
     <HomeShowcaseTrack>{children}</HomeShowcaseTrack>
     <div className={containerPremiumClass}>
      <CarouselDots className="mt-8" />
     </div>
    </Carousel>
   </ShowcaseSlidesContext.Provider>
  </section>
 );
}

export function HomeShowcaseSlide({ children, className }) {
 const slidesPerView = useContext(ShowcaseSlidesContext);

 return (
  <CarouselItem className={cn(getSlideClassName(slidesPerView), className)}>
   {children}
  </CarouselItem>
 );
}
