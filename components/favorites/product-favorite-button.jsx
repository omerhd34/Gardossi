"use client";

import { showFavoriteToast } from "@/components/favorites/favorite-toast";
import { OverlaySurface } from "@/components/ui/overlay-surface";
import { useFavorites } from "@/contexts/favorites-provider";
import { useLocale } from "@/contexts/locale-provider";
import { Heart, HeartFilled } from "@/lib/icons";
import { getProductFavoriteToastLabel } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductFavoriteButton({ product, className }) {
 const { t, dictionary } = useLocale();
 const { isFavorite, toggleFavorite, hydrated } = useFavorites();
 const favorited = hydrated && isFavorite(product.slug);

 const handleClick = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const wasFavorited = isFavorite(product.slug);
  toggleFavorite(product);

  showFavoriteToast({
   added: !wasFavorited,
   title: wasFavorited ? t("favorites.removedToast") : t("favorites.addedToast"),
   titleShort: wasFavorited
    ? t("favorites.removedToastShort")
    : t("favorites.addedToastShort"),
   description: getProductFavoriteToastLabel(product, dictionary),
   closeLabel: t("common.close"),
  });
 };

 const stopPointerPropagation = (event) => {
  event.stopPropagation();
 };

 return (
  <OverlaySurface
   as="button"
   type="button"
   onClick={handleClick}
   onPointerDown={stopPointerPropagation}
   aria-label={
    favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")
   }
   aria-pressed={favorited}
   className={cn(
    "relative z-30 inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-[scale,background-color] duration-200 ease-out hover:scale-110 active:duration-75 motion-reduce:duration-150",
    favorited && "text-red-400",
    className
   )}
  >
   {favorited ? (
    <HeartFilled className="size-5" aria-hidden />
   ) : (
    <Heart className="size-5" aria-hidden />
   )}
  </OverlaySurface>
 );
}
