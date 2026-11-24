"use client";

import {
 productDetailActionButtonClass,
 productDetailActionIconClass,
} from "@/lib/layout/product-styles";
import { Ruler } from "@/lib/icons";
import { getDimensionItems } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductDimensionsScrollButton({
 product,
 t,
 onClick,
 className,
}) {
 const hasDimensions = getDimensionItems(product).length > 0;

 if (!hasDimensions) return null;

 return (
  <button
   type="button"
   onClick={() => onClick?.()}
   className={cn(productDetailActionButtonClass, className)}
  >
   <Ruler className={productDetailActionIconClass} aria-hidden />
   <span>{t("product.viewDimensionsTable")}</span>
  </button>
 );
}
