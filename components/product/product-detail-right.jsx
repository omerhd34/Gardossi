"use client";

import { ProductCategoryRelated } from "@/components/product/product-category-related";
import { cn } from "@/lib/utils";

export function ProductDetailRight({
 categoryLabel,
 categoryProducts,
 secondaryCategoryGroup = null,
 className,
}) {
 const hasPrimary = categoryLabel && categoryProducts.length > 0;
 const hasSecondary = (secondaryCategoryGroup?.products?.length ?? 0) > 0;

 if (!hasPrimary && !hasSecondary) {
  return null;
 }

 return (
  <aside className={cn("flex flex-col gap-4", className)}>
   {hasPrimary ? (
    <ProductCategoryRelated
     products={categoryProducts}
     categoryLabel={categoryLabel}
     panelId="primary-related"
    />
   ) : null}
   {hasSecondary ? (
    <ProductCategoryRelated
     products={secondaryCategoryGroup.products}
     categoryLabel={secondaryCategoryGroup.label}
     panelId="secondary-related"
    />
   ) : null}
  </aside>
 );
}
