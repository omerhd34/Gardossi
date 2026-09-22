"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/contexts/locale-provider";
import { brandFullName } from "@/lib/brand";
import { brandLogoImageFilterClass } from "@/lib/layout/header-styles";
import { navPressClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 536;
const LOGO_HEIGHT = 152;

const logoHeightClasses = {
 xs: "h-9",
 sm: "h-10",
 md: "h-11",
 lg: "h-14",
 xl: "h-16",
};

export const brandLogoMobileNavWrapperClass =
 "[&_.brand-logo-image]:h-12! sm:max-lg:[&_.brand-logo-image]:h-14! lg:[&_.brand-logo-image]:h-20! xl:[&_.brand-logo-image]:h-[5.25rem]!";

export const brandLogoMobileNavHomeWrapperClass =
 "[&_.brand-logo-image]:h-13! sm:max-lg:[&_.brand-logo-image]:h-15! lg:[&_.brand-logo-image]:h-20! xl:[&_.brand-logo-image]:h-[5.5rem]!";

export const brandLogoDesktopNavWrapperClass = "[&_.brand-logo-image]:h-20!";

export function BrandLogoLink({ href = "/", size = "md", className }) {
 const { t } = useTranslations();
 const logoHeightClass = logoHeightClasses[size] ?? logoHeightClasses.md;

 return (
  <Link
   href={href}
   className={cn(
    "group/logo inline-flex h-fit w-fit cursor-pointer items-center rounded-md px-3.5 py-2.5 -mx-3.5 -my-2.5 align-middle leading-none",
    navPressClass,
    className
   )}
   aria-label={`${brandFullName} - ${t("common.home")}`}
  >
   <Image
    src="/brand/logo-gardossi.png"
    alt={`${brandFullName} logo`}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    sizes="(min-width: 64rem) 292px, 260px"
    loading="eager"
    decoding="async"
    fetchPriority="high"
    draggable={false}
    className={cn(
     "brand-logo-image m-0 block w-auto max-w-none origin-left scale-100 p-0 antialiased transition-[scale,filter] duration-200 ease-out active:duration-75 font-features-['kern'_1] [text-rendering:geometricPrecision] group-hover/logo:scale-[1.08] group-focus-visible/logo:scale-[1.08] motion-reduce:duration-150",
     logoHeightClass,
     brandLogoImageFilterClass
    )}
   />
  </Link>
 );
}
