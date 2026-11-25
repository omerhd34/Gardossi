"use client";

import Link from "next/link";
import { PageHeroPicture } from "@/components/ui/page-hero-picture";
import { OverlaySurface } from "@/components/ui/overlay-surface";
import { useLocale } from "@/contexts/locale-provider";
import {
 visualHeroTitleLineClass,
 visualHeroTitleShadowClass,
} from "@/lib/layout/page-styles";
import { Explore } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function BrandExperienceBanner() {
 const { dictionary } = useLocale();
 const {
  brandExperienceTitleLines,
  brandExperienceDescription,
  brandExperienceCta,
  brandExperienceAlt,
  brandExperienceImages,
 } = dictionary.home;
 const images = brandExperienceImages;
 const alt = brandExperienceAlt || brandExperienceTitleLines.join(" ");

 return (
  <section className="header-logo-light-zone relative min-h-90 overflow-hidden sm:min-h-100 lg:min-h-130" data-nosnippet>
   <PageHeroPicture images={images} alt={alt} priority={false} />
   <div className="absolute inset-0 bg-black/45" />
   <div className="absolute inset-0 flex flex-col items-center px-5 py-8 text-center sm:px-8 sm:py-10 lg:px-8 lg:pt-[4%] lg:pb-[8%]">
    <div className="flex w-full max-w-md shrink-0 flex-col items-center gap-3 sm:max-w-xl sm:gap-4 lg:max-w-2xl lg:gap-5">
     <h2
      className={cn(
       "flex w-full flex-col items-center gap-3 sm:gap-4 lg:gap-5",
       visualHeroTitleShadowClass
      )}
     >
      <span
       className={cn(
        visualHeroTitleLineClass.lead,
        "block whitespace-nowrap text-[clamp(0.72rem,2.8vw,1.38rem)] tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em] ultra:text-[clamp(0.95rem,1.4vw,1.65rem)] tv:text-[clamp(1.05rem,1.2vw,1.85rem)]"
       )}
      >
       {brandExperienceTitleLines[0]}{" "}
      </span>
      <span
       className={cn(
        visualHeroTitleLineClass.emphasis,
        "block whitespace-nowrap leading-[1.02]"
       )}
      >
       {brandExperienceTitleLines[1]}
      </span>
     </h2>
     <p className="hidden text-sm leading-relaxed text-white/85 drop-shadow-[0_2px_10px_rgb(0_0_0/35%)] sm:text-base xl:block ultra:text-lg tv:text-xl">
      {brandExperienceDescription}
     </p>
    </div>
    <div className="mt-auto flex w-full justify-center pt-6 sm:pt-8">
     <OverlaySurface
      as={Link}
      href="/hakkimizda"
      className="inline-flex h-11 shrink-0 scale-100 items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold tracking-[0.08em] uppercase touch-manipulation transition-[scale,background-color,border-color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-105 hover:border-white/50 ultra:h-14 ultra:gap-2.5 ultra:px-10 ultra:text-base ultra:tracking-widest tv:h-16 tv:gap-3 tv:px-12 tv:text-lg motion-reduce:transition-none motion-reduce:active:scale-100"
     >
      <Explore className="size-4 shrink-0 ultra:size-4.5 tv:size-5" aria-hidden />
      {brandExperienceCta}
     </OverlaySurface>
    </div>
   </div>
  </section>
 );
}
