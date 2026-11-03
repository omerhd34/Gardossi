"use client";

import Link from "next/link";
import { useMemo } from "react";
import { CategoryCoverPicture } from "@/components/ui/category-cover-picture";
import { OverlaySurface } from "@/components/ui/overlay-surface";
import { useTranslations } from "@/contexts/locale-provider";
import {
 containerPremiumClass,
 headingDisplayClass,
 navPressClass,
 productCardKalifClass,
 sectionPaddingClass,
} from "@/lib/layout/shared-styles";
import { getCategoryGroupCoverImage } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function CategoryCard({ category }) {
 return (
  <Link
   href={category.href}
   className={cn("group/card block", navPressClass)}
  >
   <div
    className={cn(
     productCardKalifClass,
     "relative h-48 rounded-3xl sm:h-52 sm:rounded-[1.25rem] md:h-56 lg:h-60"
    )}
   >
    <CategoryCoverPicture
     group={category.group}
     alt=""
     sizes="(max-width: 64rem) 50vw, 480px"
     className="object-cover transition-transform duration-200 ease-out active:duration-75 group-hover/card:scale-[1.03] motion-reduce:duration-150"
    />
    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
    <div className="absolute right-3 bottom-3 left-3">
     <OverlaySurface
      className="inline-flex scale-100 origin-left rounded-full px-3 py-1.5 text-xs font-semibold transition-[scale] duration-200 ease-out active:duration-75 group-hover/card:scale-105 motion-reduce:duration-150"
     >
      {category.label}
     </OverlaySurface>
    </div>
   </div>
  </Link>
 );
}

export function CategoriesShowcase() {
 const { navigation, t } = useTranslations();
 const categories = useMemo(
  () =>
   navigation.productsMegaMenu.groups
    .map((group) => ({
     slug: group.slug,
     label: group.label,
     href: group.href,
     group,
    }))
    .filter((category) => getCategoryGroupCoverImage(category.group)),
  [navigation]
 );

 if (!categories.length) {
  return null;
 }

 return (
  <section
   className={cn(sectionPaddingClass, "bg-white")}
   aria-label={t("categories.categoriesAria")}
   data-nosnippet
  >
   <div className={containerPremiumClass}>
    <div className="mb-8 text-center sm:mb-10 md:mb-14">
     <h2 className={cn(headingDisplayClass, "text-charcoal")}>
      {t("home.categoriesTitle")}
     </h2>
     <p className="text-muted-foreground mx-auto mt-3 max-w-4xl text-sm md:text-base">
      {t("home.categoriesDescription")}
     </p>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-3">
     {categories.map((category) => (
      <CategoryCard key={category.slug} category={category} />
     ))}
    </div>
   </div>
  </section>
 );
}
