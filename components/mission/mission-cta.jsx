"use client";

import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { SupportAgent, ViewModule } from "@/lib/icons";
import { brandFullNameUppercase } from "@/lib/brand";
import { missionCtaClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

export function MissionCta({ className }) {
 const { dictionary } = useTranslations();
 const { missionVision } = dictionary;

 return (
  <div
   className={cn(
    "mission-cta rounded-2xl px-6 py-10 text-center text-white md:px-10 md:py-12",
    missionCtaClass,
    className
   )}
   data-nosnippet
  >
   <p className="text-[0.68rem] font-semibold tracking-[0.32em] text-white/55">
    {brandFullNameUppercase}
   </p>
   <h2 className="mt-3 font-display text-[clamp(1.15rem,2.5vw,1.45rem)] font-semibold tracking-[0.12em] uppercase">
    {missionVision.ctaTitle}
   </h2>
   <p className="mx-auto mt-4 max-w-xl font-body text-sm leading-relaxed text-white/82 md:text-[0.95rem]">
    {missionVision.ctaDescription}
   </p>
   <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
    <Link
     href="/urunler"
     className="inline-flex h-11 scale-100 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-charcoal touch-manipulation transition-[scale,background-color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:bg-white/92 motion-reduce:duration-150 motion-reduce:active:scale-100"
    >
     <ViewModule className="size-4.5 shrink-0" aria-hidden />
     {missionVision.ctaProducts}
    </Link>
    <Link
     href="/iletisim"
     className="inline-flex h-11 scale-100 items-center justify-center gap-2 rounded-full border border-white/35 px-8 text-sm font-semibold text-white touch-manipulation transition-[scale,background-color,border-color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:border-white/50 hover:bg-white/10 motion-reduce:duration-150 motion-reduce:active:scale-100"
    >
     <SupportAgent className="size-4.5 shrink-0" aria-hidden />
     {missionVision.ctaContact}
    </Link>
   </div>
  </div>
 );
}
