"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useTranslations } from "@/contexts/locale-provider";
import { navPressClass } from "@/lib/layout/shared-styles";
import { getCategoryGroupCoverImage } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function MobileProductsCategoryGrid({ onClose, variant = "default" }) {
 const { navigation } = useTranslations();
 const isDrawer = variant === "drawer";
 const menuCategories = useMemo(
  () =>
   navigation.productsMegaMenu.groups.map((group) => ({
    slug: group.slug,
    label: group.label,
    href: group.href,
    image: getCategoryGroupCoverImage(group),
   })),
  [navigation]
 );

 return (
  <div
   className={cn(
    "grid grid-cols-2 gap-2.5 pb-2 sm:gap-3",
    isDrawer && "lg:gap-3 lg:pb-1"
   )}
  >
   {menuCategories.map((category) => (
    <Link
     key={category.slug}
     href={category.href}
     onClick={onClose}
     className={cn(
      "group relative block overflow-hidden rounded-2xl bg-charcoal/20",
      navPressClass,
      !isDrawer && "aspect-3/2 bg-cream/60 min-[49rem]:aspect-auto min-[49rem]:h-52",
      isDrawer &&
      "aspect-3/2 lg:flex lg:aspect-auto lg:flex-col lg:rounded-xl lg:border lg:border-(--glass-hero-border) lg:bg-transparent lg:shadow-[0_8px_24px_rgb(0_0_0/18%)] lg:transition-[border-color,box-shadow,transform] lg:duration-300 lg:hover:border-(--glass-hero-border) lg:hover:shadow-[0_10px_28px_rgb(0_0_0/24%)]"
     )}
    >
     {category.image ? (
      isDrawer ? (
       <>
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-t-2xl bg-charcoal/30 lg:aspect-4/3 lg:shrink-0 lg:rounded-t-xl lg:bg-charcoal/35">
         <Image
          src={category.image}
          alt={category.label}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1440px) 45vw, 240px"
          className="object-cover transition-transform duration-700 ease-out scale-[1.03] group-hover:scale-[1.05] lg:scale-[1.04] lg:group-hover:scale-[1.06]"
         />
         <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/5 lg:from-black/40 lg:via-transparent lg:to-transparent" />
         <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12 lg:group-hover:bg-black/8" />
         <span className="absolute bottom-2.5 left-2.5 inline-flex rounded-full border border-white/35 bg-black/28 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-[border-color,background-color] duration-300 sm:bottom-3.5 sm:left-3.5 sm:px-3.5 sm:text-sm lg:hidden">
          {category.label}
         </span>
        </div>
        <span className="hidden w-full shrink-0 rounded-b-xl px-3 py-2.5 text-[0.8125rem] font-semibold leading-snug text-white/92 lg:block lg:border-t lg:border-(--glass-hero-border) lg:bg-charcoal/35 lg:backdrop-blur-sm">
         {category.label}
         </span>
       </>
      ) : (
       <>
        <Image
         src={category.image}
         alt={category.label}
         fill
         sizes="(max-width: 640px) 50vw, (max-width: 1440px) 45vw, 240px"
         className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-black/5" />
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/12" />
        <span className="absolute bottom-2.5 left-2.5 inline-flex rounded-full border border-white/35 bg-black/28 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-[border-color,background-color] duration-300 sm:bottom-3.5 sm:left-3.5 sm:px-3.5 sm:text-sm">
         {category.label}
        </span>
       </>
      )
     ) : null}
    </Link>
   ))}
  </div>
 );
}
