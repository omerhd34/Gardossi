/* eslint-disable @next/next/no-img-element */
import { getImageProps } from "next/image";
import { PAGE_HERO_IMAGE_KEYS } from "@/lib/content/page-hero-images";
import {
 HERO_LG_MQ,
 HERO_MD_MQ,
 HERO_SM2X_MQ,
 HERO_XL2X_MQ,
 HERO_XL_MQ,
} from "@/lib/layout/breakpoints";

const IMAGE_SIZES = "100vw";

const PAGE_HERO_BREAKPOINTS = [
 { media: HERO_XL2X_MQ, key: "xl2x", width: 2560, height: 1440 },
 { media: HERO_XL_MQ, key: "xl", width: 1920, height: 1080 },
 { media: HERO_LG_MQ, key: "lg", width: 1440, height: 810 },
 { media: HERO_MD_MQ, key: "md", width: 1024, height: 768 },
 { media: HERO_SM2X_MQ, key: "sm2x", width: 1080, height: 1620 },
];

const coverImageClass = "absolute inset-0 h-full w-full object-cover object-center";
const pictureImgClass = "h-full w-full object-cover object-center";

function allHeroSourcesEqual(images) {
 const values = PAGE_HERO_IMAGE_KEYS.map((key) => images[key]).filter(Boolean);
 if (values.length === 0) return true;

 return values.every((value) => value === values[0]);
}

function buildOptimizedSource({ media, src, width, height, alt, priority }) {
 if (!src) return null;

 const { props } = getImageProps({
  src,
  alt,
  width,
  height,
  sizes: IMAGE_SIZES,
  priority,
 });

 return <source key={media} media={media} srcSet={props.srcSet} />;
}

function buildOptimizedImg({ src, width, height, alt, priority, className }) {
 const { props } = getImageProps({
  src,
  alt,
  width,
  height,
  sizes: IMAGE_SIZES,
  priority,
 });

 return (
  <img
   {...props}
   alt={alt}
   className={className}
   decoding={priority ? "sync" : "async"}
  />
 );
}

export function PageHeroPicture({ src, images, alt = "", priority = true }) {
 const resolved = images ?? (src ? { sm: src } : null);
 if (!resolved?.sm) return null;

 if (!images || allHeroSourcesEqual(resolved)) {
  const singleSrc = src ?? resolved.sm;

  return buildOptimizedImg({
   src: singleSrc,
   width: 1920,
   height: 1080,
   alt,
   priority,
   className: coverImageClass,
  });
 }

 const sources = PAGE_HERO_BREAKPOINTS.map(({ media, key, width, height }) =>
  buildOptimizedSource({
   media,
   src: resolved[key],
   width,
   height,
   alt,
   priority,
  })
 );

 return (
  <picture className="absolute inset-0 block h-full w-full">
   {sources}
   {buildOptimizedImg({
    src: resolved.sm,
    width: 750,
    height: 1125,
    alt,
    priority,
    className: pictureImgClass,
   })}
  </picture>
 );
}
