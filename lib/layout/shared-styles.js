export const interactiveMotionClass =
 "touch-manipulation transition-[transform,opacity,background-color,border-color,color] duration-200 ease-out active:scale-[0.97] active:opacity-90 active:duration-75 motion-reduce:transition-none motion-reduce:active:scale-100 motion-reduce:active:opacity-100";

export const interactiveScaleMotionClass =
 "touch-manipulation transition-[transform,opacity] duration-200 ease-out active:scale-95 active:opacity-80 active:duration-75 motion-reduce:transition-none";

export const navPressClass =
 "touch-manipulation transition-transform duration-75 active:scale-[0.98] motion-reduce:active:scale-100";

export const decorativeZoomMotionClass =
 "transition-transform duration-500 ease-out motion-reduce:duration-150";

export const containerPremiumClass =
 "mx-auto w-full max-w-site desktop:max-w-site-wide px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10";

export const containerShellClass =
 "mx-auto w-full max-w-site-shell desktop:max-w-site-wide px-4 sm:px-5 md:px-6 lg:px-10 xl:px-12";

export const sectionPaddingClass = "py-16 md:py-20 lg:py-24";

export const sectionPaddingSmClass = "py-12 md:py-16";

export const headingDisplayClass =
 "font-heading text-2xl font-semibold tracking-tight md:text-3xl lg:text-4xl";

export const headingEyebrowClass =
 "font-body text-sm font-medium text-muted-foreground md:text-base";

export const pageContentOffsetClass =
 "relative z-0 -mt-[calc(var(--header-height-mobile)+var(--search-bar-height))] pt-[calc(2*(var(--header-height-mobile)+var(--search-bar-height))+1.5rem)] sm:mobile-layout:-mt-[calc(var(--header-height-mobile-sm)+var(--search-bar-height))] sm:mobile-layout:pt-[calc(2*(var(--header-height-mobile-sm)+var(--search-bar-height))+1.5rem)] desktop:-mt-[calc(var(--header-height-desktop)+var(--search-bar-height))] desktop:pt-[calc(2*(var(--header-height-desktop)+var(--search-bar-height))+2rem)]";

export const pageHeaderBleedClass =
 "page-header-bleed -mt-[calc(var(--header-height-mobile)+var(--search-bar-height)+1.5rem)] sm:mobile-layout:-mt-[calc(var(--header-height-mobile-sm)+var(--search-bar-height)+1.5rem)] desktop:-mt-[calc(var(--header-height-desktop)+var(--search-bar-height)+2rem)]";

export const productCardKalifClass =
 "overflow-hidden rounded-[1.25rem] bg-[var(--product-card-bg)]";

export const lightboxStageClass =
 "relative h-full w-full max-w-7xl overflow-hidden [perspective:1400px] [transform-style:preserve-3d]";

export const lightboxImageFrameClass =
 "relative h-full w-full overflow-hidden rounded-3xl border-[5px] border-black/72 bg-white shadow-[0_8px_32px_rgb(0_0_0/24%)]";

export const lightboxSlideLayerClass =
 "absolute inset-0 origin-center [backface-visibility:hidden] [transform:translateZ(0)] will-change-[transform,opacity,filter]";

export const lightboxSlideOpenClass =
 "animate-[lightbox-open_420ms_cubic-bezier(0.22,1,0.36,1)_both]";

export const lightboxFlipEnterNextClass =
 "animate-[lightbox-flip-enter-next_750ms_cubic-bezier(0.22,1,0.36,1)_both]";

export const lightboxFlipEnterPrevClass =
 "animate-[lightbox-flip-enter-prev_750ms_cubic-bezier(0.22,1,0.36,1)_both]";

export const lightboxFlipExitNextClass =
 "animate-[lightbox-flip-exit-next_750ms_cubic-bezier(0.45,0,0.2,1)_both]";

export const lightboxFlipExitPrevClass =
 "animate-[lightbox-flip-exit-prev_750ms_cubic-bezier(0.45,0,0.2,1)_both]";
