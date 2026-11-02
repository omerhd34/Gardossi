"use client";

import { showFavoriteToast } from "@/components/favorites/favorite-toast";
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
  <button
   type="button"
   onClick={handleClick}
   onPointerDown={stopPointerPropagation}
   aria-label={
    favorited ? t("product.removeFromFavorites") : t("product.addToFavorites")
   }
   aria-pressed={favorited}
   className={cn(
    "relative z-30 inline-flex size-9 scale-100 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/72 text-white shadow-[0_4px_16px_rgb(0_0_0/18%)] transition-[scale,background-color] duration-200 ease-out active:duration-75 hover:scale-[1.08] hover:bg-black/80 motion-reduce:duration-150",
    favorited && "text-red-400",
    className
   )}
  >
   {favorited ? (
    <HeartFilled className="size-5" aria-hidden />
   ) : (
    <Heart className="size-5" aria-hidden />
   )}
  </button>
 );
}
