/* eslint-disable @next/next/no-img-element */
"use client";

import { getImageProps } from "next/image";
import { LG_MQ, MD_MQ } from "@/lib/layout/breakpoints";
import { getCategoryGroupCoverImages } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function allSourcesEqual(images) {
 if (!images) return true;
 const values = [images.mobile, images.tablet, images.desktop].filter(Boolean);
 if (values.length === 0) return true;
 return values.every((value) => value === values[0]);
}

export function CategoryCoverPicture({
 group,
 images,
 alt = "",
 className,
 sizes = "(max-width: 768px) 50vw, 33vw",
 fill = true,
 priority = false,
 quality = 60,
}) {
 const resolved = images ?? getCategoryGroupCoverImages(group);
 if (!resolved?.mobile) return null;

 const shared = {
  alt,
  sizes,
  quality,
  priority,
  ...(fill
   ? { fill: true }
   : { width: 1600, height: 1000 }),
 };

 if (allSourcesEqual(resolved)) {
  const { props } = getImageProps({
   ...shared,
   src: resolved.desktop || resolved.mobile,
  });

  return (
   <img
    {...props}
    alt={alt}
    className={cn(fill && "absolute inset-0 size-full", className)}
   />
  );
 }

 const desktop = getImageProps({
  ...shared,
  src: resolved.desktop || resolved.tablet || resolved.mobile,
 });
 const tablet = getImageProps({
  ...shared,
  src: resolved.tablet || resolved.desktop || resolved.mobile,
 });
 const mobile = getImageProps({
  ...shared,
  src: resolved.mobile || resolved.tablet || resolved.desktop,
 });

 return (
  <picture className={cn(fill && "absolute inset-0 block size-full")}>
   <source media={LG_MQ} srcSet={desktop.props.srcSet} sizes={desktop.props.sizes} />
   <source media={MD_MQ} srcSet={tablet.props.srcSet} sizes={tablet.props.sizes} />
   <img
    {...mobile.props}
    alt={alt}
    className={cn(fill && "size-full", className)}
   />
  </picture>
 );
}
