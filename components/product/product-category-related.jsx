"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/contexts/locale-provider";
import { getProductCardBottomLabel, getPrimaryImageUrl } from "@/lib/product-utils";
import {
 productDetailAccordionItemClass,
 productDetailAccordionTriggerClass,
 productRelatedItemClass,
 productRelatedItemThumbClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCategoryRelated({
 products,
 categoryLabel,
 panelId = "related-panel",
}) {
 const { locale } = useLocale();
 const [open, setOpen] = useState([panelId]);

 if (products.length === 0) return null;

 return (
  <Accordion
   type="multiple"
   value={open}
   onValueChange={setOpen}
   className="w-full"
  >
   <AccordionItem value={panelId} className={productDetailAccordionItemClass}>
    <AccordionTrigger className={productDetailAccordionTriggerClass}>
     {categoryLabel}
    </AccordionTrigger>
    <AccordionContent className="pb-5 ultra:pb-6 tv:pb-7 [&_a]:no-underline">
     <div className="space-y-3 ultra:space-y-4 tv:space-y-5">
      {products.map((product) => {
       const imageUrl = getPrimaryImageUrl(product);
       const productLabel = getProductCardBottomLabel(product, locale);

       return (
        <Link
         key={product.id}
         href={`/urunler/${product.slug}`}
         className={cn(
          "group flex cursor-pointer items-center gap-3 rounded-2xl p-2.5 no-underline touch-manipulation transition-[border-color,background-color,box-shadow,transform] duration-200 active:scale-[0.98] active:duration-75 ultra:gap-4 ultra:rounded-3xl ultra:p-3.5 tv:gap-5 tv:p-4 motion-reduce:active:scale-100",
          productRelatedItemClass
         )}
        >
         <div
          className={cn(
           "relative size-16 shrink-0 overflow-hidden rounded-xl ultra:size-20 tv:size-24",
           productRelatedItemThumbClass
          )}
         >
          {imageUrl ? (
           <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt ?? product.name}
            fill
            sizes="(max-width: 160rem) 96px, 64px"
            className="object-cover"
           />
          ) : null}
         </div>
         <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold text-charcoal ultra:text-base tv:text-lg">
           {productLabel}
          </p>
         </div>
        </Link>
       );
      })}
     </div>
    </AccordionContent>
   </AccordionItem>
  </Accordion>
 );
}
