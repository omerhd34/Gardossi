/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import {
 Carousel,
 CarouselContent,
 CarouselDots,
 CarouselItem,
} from "@/components/ui/carousel";
import { ProductCornerStandardTable } from "@/components/product/product-corner-standard-table";
import { ProductDimensionsTable } from "@/components/product/product-dimensions-table";
import { ProductImagePicture } from "@/components/ui/product-image-picture";
import { useLocale } from "@/contexts/locale-provider";
import { FiInfo, Ruler } from "@/lib/icons";
import { isCornerGroupProduct } from "@/lib/product-category";
import { getCornerStandardSize, getDimensionItems } from "@/lib/product-utils";
import { LG_MQ } from "@/lib/layout/breakpoints";
import {
 preventImageSaveInteraction,
 productDetailAccordionItemClass,
 productDetailAccordionTriggerClass,
 productGalleryFrameClass,
 productGalleryMobileCarouselClass,
 productProtectedImageClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

function ProductGalleryImage({
 image,
 index,
 onImageClick,
 variant = "stack",
 className,
 t,
}) {
 const isSlide = variant === "slide";
 const wrapperClassName = cn(
  "group/gallery-image relative block w-full overflow-hidden",
  isSlide
   ? "aspect-4/3 bg-white min-[48rem]:aspect-16/10"
   : cn(
    "aspect-4/3 min-[1152px]:aspect-16/10 cursor-pointer rounded-3xl bg-white",
    productGalleryFrameClass
   ),
  className
 );

 const imageElement = (
  <ProductImagePicture
   image={image}
   alt={image.alt ?? t("product.productImage")}
   sizes="(max-width: 1151px) 100vw, 60vw"
   draggable={false}
   className={cn(
    "object-cover scale-100 transition-[scale] duration-1500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/gallery-image:scale-[1.03] motion-reduce:duration-150",
    productProtectedImageClass
   )}
   priority={index === 0}
  />
 );

 const saveGuardProps = {
  onContextMenu: preventImageSaveInteraction,
  onDragStart: preventImageSaveInteraction,
 };

 if (isSlide) {
  return (
   <div className={wrapperClassName} {...saveGuardProps}>
    {imageElement}
   </div>
  );
 }

 return (
  <button
   type="button"
   onClick={() => onImageClick?.(index)}
   className={wrapperClassName}
   aria-label={t("product.enlargeImage", {
    alt: image.alt ?? t("product.productImage"),
   })}
   {...saveGuardProps}
  >
   {imageElement}
  </button>
 );
}

function ProductGallery({ images, onImageClick, t }) {
 if (images.length === 0) {
  return (
   <div className="flex aspect-4/3 items-center justify-center rounded-3xl bg-cream/60 text-sm text-charcoal/50">
    {t("product.noImage")}
   </div>
  );
 }

 return (
  <>
   <div className={cn("min-[1152px]:hidden", productGalleryMobileCarouselClass)}>
    <Carousel
     opts={{
      align: "start",
      loop: false,
      containScroll: "trimSnaps",
     }}
     className="w-full"
     aria-label={t("product.productImages")}
    >
     <CarouselContent className="ml-0">
      {images.map((image, index) => (
       <CarouselItem key={image.id} className="min-w-0 basis-full pl-0">
        <ProductGalleryImage
         image={image}
         index={index}
         onImageClick={onImageClick}
         variant="slide"
         t={t}
        />
       </CarouselItem>
      ))}
     </CarouselContent>
     <CarouselDots className="mt-3" />
    </Carousel>
   </div>

   <div className="hidden min-[1152px]:block min-[1152px]:space-y-4">
    {images.map((image, index) => (
     <ProductGalleryImage
      key={image.id}
      image={image}
      index={index}
      onImageClick={onImageClick}
      t={t}
     />
    ))}
   </div>
  </>
 );
}

export function ProductDetailCenter({
 product,
 images,
 onImageClick,
 className,
 openDimensions = false,
 openProductInfo = false,
 belowGallery,
}) {
 const { t } = useLocale();
 const dimensionItems = getDimensionItems(product);
 const showCornerStandard =
  isCornerGroupProduct(product) && getCornerStandardSize(product) != null;
 const [accordionValue, setAccordionValue] = useState([]);

 useEffect(() => {
  if (window.matchMedia(LG_MQ).matches) {
   setAccordionValue(["product-info"]);
  }
 }, []);

 useEffect(() => {
  if (!openDimensions) return;

  setAccordionValue((current) =>
   current.includes("dimensions") ? current : [...current, "dimensions"]
  );
 }, [openDimensions]);

 useEffect(() => {
  if (!openProductInfo) return;

  setAccordionValue((current) =>
   current.includes("product-info") ? current : [...current, "product-info"]
  );
 }, [openProductInfo]);

 return (
  <div className={cn("flex flex-col gap-4 md:gap-10", className)}>
   <ProductGallery images={images} onImageClick={onImageClick} t={t} />

   {belowGallery}

   <Accordion
    type="multiple"
    value={accordionValue}
    onValueChange={setAccordionValue}
    className="flex flex-col gap-4"
   >
    <AccordionItem
     value="product-info"
     data-product-info=""
     className={cn(productDetailAccordionItemClass)}
    >
     <AccordionTrigger className={productDetailAccordionTriggerClass}>
      <FiInfo className="size-5 shrink-0 text-black" aria-hidden />
      <span className="min-w-0 flex-1">{t("product.productInfo")}</span>
     </AccordionTrigger>
     <AccordionContent className="pb-6 text-sm leading-relaxed text-charcoal/75">
      {product.description ? (
       <p className="whitespace-pre-line">{product.description}</p>
      ) : null}
     </AccordionContent>
    </AccordionItem>

    {dimensionItems.length > 0 ? (
     <AccordionItem
      value="dimensions"
      data-product-dimensions=""
      className={cn(productDetailAccordionItemClass)}
     >
      <AccordionTrigger className={productDetailAccordionTriggerClass}>
       <Ruler className="size-5 shrink-0 text-black" aria-hidden />
       <span className="min-w-0 flex-1">
        {t("product.dimensionsTableTitle")} ({t("product.dimensionUnit")})
       </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-4 pb-5">
       {showCornerStandard ? (
        <ProductCornerStandardTable product={product} t={t} />
       ) : null}
       <ProductDimensionsTable product={product} t={t} />
      </AccordionContent>
     </AccordionItem>
    ) : null}
   </Accordion>
  </div>
 );
}
