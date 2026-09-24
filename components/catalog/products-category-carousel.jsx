"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo } from "react";
import { CategoryCoverPicture } from "@/components/ui/category-cover-picture";
import { useTranslations } from "@/contexts/locale-provider";
import { HeroChevronLeft, HeroChevronRight } from "@/lib/icons";
import { contactFloatBtnClass } from "@/lib/layout/header-styles";
import { productCategoryTileClass } from "@/lib/layout/product-styles";
import { navPressClass } from "@/lib/layout/shared-styles";
import { getCategoryGroupCoverImage } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

const categoryCarouselNavBtnClass = cn(
 contactFloatBtnClass,
 "size-10 text-charcoal/75 hover:text-charcoal"
);

export function ProductsCategoryCarousel({ activeSlug, className }) {
 const { navigation, t } = useTranslations();
 const carouselCategories = useMemo(
  () =>
   navigation.productsMegaMenu.groups.map((group) => ({
    slug: group.slug,
    label: group.label,
    href: group.href,
    group,
    hasImage: Boolean(getCategoryGroupCoverImage(group)),
   })),
  [navigation]
 );
 const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "start",
  dragFree: true,
  containScroll: "trimSnaps",
 });

 return (
  <div
   className={cn(
    "hidden items-center gap-2 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-3",
    className
   )}
  >
   <button
    type="button"
    onClick={() => emblaApi?.scrollPrev()}
    className={categoryCarouselNavBtnClass}
    aria-label={t("product.previousCategories")}
   >
    <HeroChevronLeft className="size-5" aria-hidden />
   </button>

   <div className="min-w-0 overflow-hidden" ref={emblaRef}>
    <div className="flex gap-3 p-1.5 md:gap-4">
     {carouselCategories.map((category) => {
      const active = activeSlug === category.slug;

      return (
       <Link
        key={category.slug}
        href={category.href}
        className={cn(
         "group relative min-w-0 shrink-0 cursor-pointer basis-[calc((100%-4rem)/5)]",
         navPressClass,
         active &&
         "rounded-2xl ring-2 ring-charcoal/55 ring-offset-2 ring-offset-cream"
        )}
       >
        <div className={cn("relative aspect-4/3 overflow-hidden rounded-2xl", productCategoryTileClass)}>
         {category.hasImage ? (
          <CategoryCoverPicture
           group={category.group}
           alt={category.label}
           sizes="20vw"
           className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
         ) : null}
         <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
         <span className="absolute right-3 bottom-3 left-3 text-sm font-semibold text-white drop-shadow-sm">
          {category.label}
         </span>
        </div>
       </Link>
      );
     })}
    </div>
   </div>

   <button
    type="button"
    onClick={() => emblaApi?.scrollNext()}
    className={categoryCarouselNavBtnClass}
    aria-label={t("product.nextCategories")}
   >
    <HeroChevronRight className="size-5" aria-hidden />
   </button>
  </div>
 );
}
