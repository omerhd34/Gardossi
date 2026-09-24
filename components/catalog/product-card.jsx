"use client";

import Link from "next/link";
import { ProductFavoriteButton } from "@/components/favorites/product-favorite-button";
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
  "inline-flex scale-100 rounded-full border border-white/20 bg-white/15 font-medium text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] backdrop-blur-md transition-[scale] duration-200 ease-out active:duration-75 hover:scale-[1.08] motion-reduce:duration-150",
  isCatalog
   ? "px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm"
   : "px-2.5 py-1 text-[0.65rem] lg:px-3 lg:py-1.5 lg:text-xs"
 );

 return (
  <article className={cn("group/card", className)}>
   <div
    className={cn(
     productCardKalifClass,
     "group/card relative",
     isCatalog
      ? cn("product-card-kalif--catalog aspect-5/4 rounded-3xl", catalogProductCardClass)
      : isFeatured
       ? "aspect-5/4 sm:aspect-3/2"
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
         ? "(max-width: 640px) 100vw, 50vw"
         : isFeatured
          ? "(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) 50vw, 600px"
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

     <div
      className={cn(
       "absolute inset-3 z-10 flex flex-col",
       "lg:inset-x-4 lg:top-auto lg:bottom-4 lg:flex-row lg:items-end lg:gap-3"
      )}
     >
      {priceLabel ? (
       <span
        className={cn(
         badgeClassName,
         "w-fit shrink-0 self-start origin-left lg:order-2 lg:ml-auto lg:self-auto lg:origin-right"
        )}
       >
        {priceLabel}
       </span>
      ) : null}

      <span
       className={cn(
        badgeClassName,
        "mt-auto w-fit max-w-full min-w-0 origin-left text-left leading-snug line-clamp-2",
        "lg:order-1 lg:mt-0 lg:max-w-[calc(100%-9.5rem)]"
       )}
      >
       {bottomLabel}
      </span>
     </div>
    </Link>

    {showFavoriteButton ? (
     <ProductFavoriteButton
      product={product}
      className={cn(
       "absolute top-3 right-3 z-20 lg:top-4 lg:right-4",
       (isCatalog || isFeatured) &&
       "size-10 sm:size-9 [&_svg]:size-5.5 sm:[&_svg]:size-5 lg:size-11 lg:[&_svg]:size-6"
      )}
     />
    ) : null}
   </div>
  </article>
 );
}
