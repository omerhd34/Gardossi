"use client";

import { useEffect, useState } from "react";
import { PageHeroPicture } from "@/components/ui/page-hero-picture";
import { SeoH1 } from "@/components/seo/seo-h1";
import { useTranslations } from "@/contexts/locale-provider";
import { resolvePageHeroImages } from "@/lib/content/page-hero-images";
import { visualHeroTitleShadowClass } from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

function getSiteHeaderHeight() {
 const header = document.querySelector(".site-header");
 if (!header) return 0;
 return Math.ceil(header.getBoundingClientRect().height);
}

export function AboutHero() {
 const { dictionary, t } = useTranslations();
 const { about } = dictionary;
 const heroAlt = about.visualTitleLines.join(" ");
 const [headerOffset, setHeaderOffset] = useState(0);
 const heroImages = resolvePageHeroImages("about", about);

 useEffect(() => {
  const update = () => setHeaderOffset(getSiteHeaderHeight());

  update();

  const header = document.querySelector(".site-header");
  const observer = header ? new ResizeObserver(update) : null;
  observer?.observe(header);

  window.addEventListener("resize", update);
  window.addEventListener("scroll", update, { passive: true });

  return () => {
   observer?.disconnect();
   window.removeEventListener("resize", update);
   window.removeEventListener("scroll", update);
  };
 }, []);

 return (
  <section
   className="about-hero header-logo-light-zone relative mt-0 w-full"
   style={{ "--about-hero-header-offset": `${headerOffset}px` }}
  >
   <div className="relative min-h-[min(42vh,400px)] w-full sm:min-h-[min(48vh,480px)] md:min-h-[min(52vh,560px)] lg:min-h-[min(48vh,520px)]">
    <PageHeroPicture images={heroImages} alt={heroAlt} />
    <div className="absolute inset-0 bg-black/30" aria-hidden />

    <div
     className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-6 text-center text-white sm:pb-10"
     style={{ paddingTop: "var(--about-hero-header-offset, 0px)" }}
    >
     <SeoH1
      pageKey="about"
      title={t("about.pageTitle")}
      className={cn(
       "font-display text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold tracking-tight",
       visualHeroTitleShadowClass
      )}
     >
      {t("about.pageTitle")}
     </SeoH1>
    </div>
   </div>
  </section>
 );
}
