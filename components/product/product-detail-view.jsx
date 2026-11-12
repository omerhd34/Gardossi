"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ProductDetailCenter } from "@/components/product/product-detail-center";
import { ProductDetailLeft } from "@/components/product/product-detail-left";
import { ProductDetailRight } from "@/components/product/product-detail-right";
import { ProductImageLightbox } from "@/components/product/product-image-lightbox";
import { PRODUCT_DETAIL_GRID_MQ } from "@/lib/layout/breakpoints";
import { productDetailScrollClass } from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductDetailView({
 product,
 categoryLabel,
 categoryHref,
 categoryProducts = [],
 secondaryCategoryGroup = null,
}) {
 const [lightbox, setLightbox] = useState({ images: [], index: null });
 const [openDimensions, setOpenDimensions] = useState(false);
 const [openProductInfo, setOpenProductInfo] = useState(false);
 const centerScrollRef = useRef(null);
 const visibleImages = product.images ?? [];

 const openLightbox = (images, index) => {
  if (!images.length) return;
  setLightbox({ images, index });
 };

 const closeLightbox = () => setLightbox({ images: [], index: null });

 const handleViewDimensions = useCallback(() => {
  const isContainedScroll = window.matchMedia(PRODUCT_DETAIL_GRID_MQ).matches;

  setOpenDimensions(true);

  window.setTimeout(() => {
   const container = centerScrollRef.current;
   const target = container?.querySelector("[data-product-dimensions]");

   if (!target) return;

   if (isContainedScroll && container) {
    const offset =
     target.getBoundingClientRect().top -
     container.getBoundingClientRect().top +
     container.scrollTop;

    container.scrollTo({
     top: Math.max(0, offset - 24),
     behavior: "smooth",
    });
   } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, 350);
 }, []);

 const handleViewProductInfo = useCallback(() => {
  const isContainedScroll = window.matchMedia(PRODUCT_DETAIL_GRID_MQ).matches;

  setOpenProductInfo(true);

  window.setTimeout(() => {
   const container = centerScrollRef.current;
   const target = container?.querySelector("[data-product-info]");

   if (!target) return;

   if (isContainedScroll && container) {
    const offset =
     target.getBoundingClientRect().top -
     container.getBoundingClientRect().top +
     container.scrollTop;

    container.scrollTo({
     top: Math.max(0, offset - 24),
     behavior: "smooth",
    });
   } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
   }
  }, 350);
 }, []);

 const hasRightPanel =
  (categoryLabel && categoryProducts.length > 0) ||
  (secondaryCategoryGroup?.products?.length ?? 0) > 0;

 return (
  <>
   <div
    className={cn(
     "flex flex-col gap-4 detail-grid:grid detail-grid:items-start detail-grid:gap-8",
     hasRightPanel
      ? "detail-grid:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] detail-right:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,19rem)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)_minmax(0,21rem)] xl:gap-10"
      : "detail-grid:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
    )}
   >
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     onViewProductInfo={handleViewProductInfo}
     section="header"
     className="detail-grid:hidden"
    />
    <ProductDetailLeft
     product={product}
     categoryLabel={categoryLabel}
     categoryHref={categoryHref}
     onViewDimensions={handleViewDimensions}
     onViewProductInfo={handleViewProductInfo}
     className="hidden min-w-0 detail-grid:flex detail-grid:shrink-0"
    />

    <section
     ref={centerScrollRef}
     className={cn(
      "min-h-0 detail-grid:max-h-[calc(100dvh-var(--header-height-desktop)-2rem)] detail-grid:overflow-y-auto detail-grid:pr-2 detail-grid:pb-6",
      productDetailScrollClass
     )}
    >
     <ProductDetailCenter
      product={product}
      images={visibleImages}
      onImageClick={(index) => openLightbox(visibleImages, index)}
      openDimensions={openDimensions}
      openProductInfo={openProductInfo}
      className="pb-0 detail-grid:pb-6"
      belowGallery={
       <ProductDetailLeft
        product={product}
        categoryLabel={categoryLabel}
        categoryHref={categoryHref}
        onViewDimensions={handleViewDimensions}
        onViewProductInfo={handleViewProductInfo}
        section="controls"
        className="detail-grid:hidden"
       />
      }
     />
    </section>

    {hasRightPanel ? (
     <ProductDetailRight
      categoryLabel={categoryLabel}
      categoryProducts={categoryProducts}
      secondaryCategoryGroup={secondaryCategoryGroup}
      className="detail-grid:hidden detail-right:flex detail-right:self-start"
     />
    ) : null}
   </div>

   <ProductImageLightbox
    images={lightbox.images}
    index={lightbox.index}
    onIndexChange={(index) =>
     setLightbox((current) => ({ ...current, index }))
    }
    onClose={closeLightbox}
   />
  </>
 );
}
