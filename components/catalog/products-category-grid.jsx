"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { navPressClass, productCardKalifClass } from "@/lib/layout/shared-styles";
import { getCategoryGroupCoverImage } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductsCategoryGrid() {
 const { navigation } = useTranslations();
 const categories = useMemo(
  () =>
   navigation.productsMegaMenu.groups
    .map((group) => ({
     slug: group.slug,
     label: group.label,
     href: group.href,
     image: getCategoryGroupCoverImage(group),
    }))
    .filter((category) => category.image),
  [navigation]
 );

 if (!categories.length) {
  return null;
 }

 return (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:gap-6">
   {categories.map((category) => (
    <Link
     key={category.slug}
     href={category.href}
     className={cn("group/card block", navPressClass)}
    >
     <div
      className={cn(
       productCardKalifClass,
       "relative h-48 overflow-hidden rounded-3xl sm:h-52 sm:rounded-[1.25rem] md:h-56 lg:h-60"
      )}
     >
      <Image
       src={category.image}
       alt={category.label}
       fill
       sizes="(max-width: 768px) 50vw, 33vw"
       className="size-full object-cover transition-transform duration-200 ease-out active:duration-75 group-hover/card:scale-[1.03] motion-reduce:duration-150"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/45 via-black/5 to-transparent" />
      <div className="absolute right-3 bottom-3 left-3">
       <span
        className="inline-flex rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md scale-100 origin-left transition-[scale] duration-200 ease-out active:duration-75 group-hover/card:scale-105 motion-reduce:duration-150"
       >
        {category.label}
       </span>
      </div>
     </div>
    </Link>
   ))}
  </div>
 );
}
