"use client";

import Link from "next/link";
import { ProductFavoriteButton } from "@/components/favorites/product-favorite-button";
import { OverlaySurface } from "@/components/ui/overlay-surface";
import { ProductImagePicture } from "@/components/ui/product-image-picture";
import { useLocale } from "@/contexts/locale-provider";
import {
 formatProductPrice,
 getPrimaryImageUrl,
 getPrimaryProductImage,
 getProductCardBottomLabel,
 getProductDisplayPrice,
} from "@/lib/product-utils";
import { navPressClass, productCardKalifClass } from "@/lib/layout/shared-styles";
import { catalogProductCardClass } from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCard({
 product,
 className,
 priority = false,
 variant = "default",
 showFavoriteButton = false,
 omitCategoryInLabel = false,
}) {
 const { locale } = useLocale();
 const primaryImage = getPrimaryProductImage(product);
 const imageUrl = getPrimaryImageUrl(product);
 const isCatalog = variant === "catalog";
 const isFeatured = variant === "featured";
 const bottomLabel = getProductCardBottomLabel(product, locale, {
  omitCategory: omitCategoryInLabel,
 });
 const displayPrice = getProductDisplayPrice(product);
 const priceLabel = formatProductPrice(displayPrice, locale);
 const badgeClassName = cn(
  "inline-flex scale-100 rounded-full font-medium transition-[scale] duration-200 ease-out active:duration-75 hover:scale-[1.08] motion-reduce:duration-150",
  isCatalog
   ? "px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm ultra:px-6 ultra:py-3 ultra:text-lg tv:px-7 tv:py-3.5 tv:text-xl"
   : "px-2.5 py-1 text-[0.65rem] lg:px-3 lg:py-1.5 lg:text-xs ultra:px-4 ultra:py-2 ultra:text-sm tv:px-5 tv:py-2.5 tv:text-base"
 );

 return (
  <article className={cn("group/card", className)}>
   <div
    className={cn(
     productCardKalifClass,
     "group/card relative",
     isCatalog
      ? cn(
       "product-card-kalif--catalog aspect-5/4 rounded-3xl ultra:rounded-[1.75rem] tv:rounded-[2rem]",
       catalogProductCardClass
      )
      : isFeatured
       ? "aspect-5/4 sm:aspect-3/2 ultra:rounded-[1.5rem] tv:rounded-[1.75rem]"
       : "aspect-4/5"
    )}
   >
    <Link
     href={`/urunler/${product.slug}`}
     className={cn("absolute inset-0 block cursor-pointer", navPressClass)}
    >
     {imageUrl && primaryImage ? (
      <ProductImagePicture
       image={primaryImage}
       alt={primaryImage.alt ?? product.name}
       sizes={
        isCatalog
         ? "(max-width: 640px) 100vw, (max-width: 160rem) 46vw, 920px"
         : isFeatured
          ? "(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) 50vw, (max-width: 160rem) 42vw, 960px"
          : "(max-width: 768px) 50vw, 25vw"
       }
       quality={60}
       className="size-full object-cover transition-transform duration-500 group-hover/card:scale-[1.03]"
       priority={priority}
      />
     ) : (
      <div className="absolute inset-0 bg-cream/70" aria-hidden />
     )}

     <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/15" />

     {priceLabel ? (
      <OverlaySurface
       className={cn(
        badgeClassName,
        "absolute top-3 right-3 z-10 w-fit shrink-0 origin-top-right",
        "lg:top-4 lg:right-4 ultra:top-5 ultra:right-5 tv:top-6 tv:right-6"
       )}
      >
       {priceLabel}
      </OverlaySurface>
     ) : null}

     <OverlaySurface
      className={cn(
       badgeClassName,
       "absolute inset-x-3 bottom-3 z-10 w-fit max-w-full min-w-0 origin-bottom-left text-left leading-snug line-clamp-2",
       "lg:inset-x-4 lg:bottom-4 ultra:inset-x-5 ultra:bottom-5 tv:inset-x-6 tv:bottom-6"
      )}
     >
      {bottomLabel}
     </OverlaySurface>
    </Link>

    {showFavoriteButton ? (
     <ProductFavoriteButton
      product={product}
      className={cn(
       "absolute top-3 left-3 z-20 lg:top-4 lg:left-4 ultra:top-5 ultra:left-5 tv:top-6 tv:left-6",
       (isCatalog || isFeatured) &&
       "size-10 sm:size-9 [&_svg]:size-5.5 sm:[&_svg]:size-5 lg:size-11 lg:[&_svg]:size-6 ultra:size-12 ultra:[&_svg]:size-6.5 tv:size-14 tv:[&_svg]:size-7"
      )}
     />
    ) : null}
   </div>
  </article>
 );
}
