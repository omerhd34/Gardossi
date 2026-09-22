"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import {
 aboutContentBodyClass,
 aboutContentClosingClass,
} from "@/lib/layout/page-styles";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function AboutPageContent() {
 const { dictionary } = useTranslations();
 const { about, missionVision } = dictionary;

 const visualCtaClass =
  "inline-flex h-11 scale-100 items-center justify-center rounded-full px-8 text-sm font-semibold tracking-[0.06em] uppercase touch-manipulation transition-[scale,background-color,border-color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-105 motion-reduce:duration-150 motion-reduce:active:scale-100";

 return (
  <section className="about-content pb-12 pt-10 md:pb-16 md:pt-14">
   <div className={containerPremiumClass}>
    <div className={cn("about-content__body w-full", aboutContentBodyClass)}>
     <div data-nosnippet>
      <p className="about-content__greeting font-display text-[clamp(1.15rem,2.8vw,1.45rem)] font-semibold leading-snug tracking-tight text-charcoal">
       {about.greeting}
      </p>

      <div className="mt-8 space-y-6">
       {about.paragraphs.map((paragraph) => (
        <p
         key={paragraph}
         className="font-body text-sm leading-[1.9] text-charcoal/78 md:text-[0.95rem]"
        >
         {paragraph}
        </p>
       ))}
      </div>

      <p
       className={cn(
        "about-content__closing mt-10 font-display text-[clamp(1rem,2.2vw,1.2rem)] font-medium tracking-tight text-charcoal",
        aboutContentClosingClass
       )}
      >
       {about.closing}
      </p>
     </div>

     <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Link
       href="/misyon-vizyon"
       className={cn(
        visualCtaClass,
        "border border-charcoal/12 bg-charcoal text-white hover:border-charcoal/20 hover:bg-charcoal/90"
       )}
      >
       {missionVision.pageTitle}
      </Link>
      <Link
       href="/urunler"
       className={cn(
        visualCtaClass,
        "border border-charcoal/15 bg-white text-charcoal hover:border-charcoal/25 hover:bg-cream/60"
       )}
      >
       {about.visualCta}
      </Link>
     </div>
    </div>
   </div>
  </section>
 );
}
