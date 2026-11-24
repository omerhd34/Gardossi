"use client";

import {
 productDetailActionButtonClass,
 productDetailActionIconClass,
} from "@/lib/layout/product-styles";
import { FiInfo } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function ProductInfoScrollButton({ product, t, onClick, className }) {
 if (!product.description) return null;

 return (
  <button
   type="button"
   onClick={() => onClick?.()}
   className={cn(productDetailActionButtonClass, className)}
  >
   <FiInfo className={productDetailActionIconClass} aria-hidden />
   <span>{t("product.viewProductInfo")}</span>
  </button>
 );
}
