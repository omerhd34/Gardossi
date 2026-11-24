export const MD_MIN = "768px";
export const MD_MQ = `(min-width: ${MD_MIN})`;

export const XL_MIN = "1440px";
export const XL_MQ = `(min-width: ${XL_MIN})`;

export const LG_MIN = "1024px";
export const LG_MQ = `(min-width: ${LG_MIN})`;

export const PRODUCT_DETAIL_GRID_MIN = "1152px";
export const PRODUCT_DETAIL_GRID_MQ = `(min-width: ${PRODUCT_DETAIL_GRID_MIN})`;

export const PRODUCT_DETAIL_RIGHT_MIN = "1200px";
export const PRODUCT_DETAIL_RIGHT_MQ = `(min-width: ${PRODUCT_DETAIL_RIGHT_MIN})`;

export const HERO_XL_MIN = "1536px";
export const HERO_XL_MQ = `(min-width: ${HERO_XL_MIN})`;

export const DEVICE_IMAGE_TABLET_MAX = "1439.98px";
export const DEVICE_IMAGE_TABLET_MQ = `(min-width: ${MD_MIN}) and (max-width: ${DEVICE_IMAGE_TABLET_MAX})`;
export const DEVICE_IMAGE_DESKTOP_MIN = XL_MIN;
export const DEVICE_IMAGE_DESKTOP_MQ = `(min-width: ${DEVICE_IMAGE_DESKTOP_MIN})`;

export const HERO_TABLET_MAX = DEVICE_IMAGE_TABLET_MAX;
export const HERO_MD_MQ = DEVICE_IMAGE_TABLET_MQ;
export const HERO_LG_MIN = DEVICE_IMAGE_DESKTOP_MIN;
export const HERO_LG_MQ = DEVICE_IMAGE_DESKTOP_MQ;

export const HERO_SM_MAX = "767.98px";
export const HERO_SM2X_MQ = `(max-width: ${HERO_SM_MAX}) and (min-resolution: 2dppx)`;
export const HERO_XL2X_MQ = `(min-width: ${HERO_XL_MIN}) and (min-resolution: 2dppx)`;

export const MOBILE_LAYOUT_MAX = "1440px";
export const MAX_MOBILE_LAYOUT_MQ = `(max-width: ${MOBILE_LAYOUT_MAX})`;

export const TABLET_HEADER_MIN = LG_MIN;
export const TABLET_HEADER_MAX = MOBILE_LAYOUT_MAX;
export const TABLET_HEADER_MQ = `(min-width: ${TABLET_HEADER_MIN}) and (max-width: ${TABLET_HEADER_MAX})`;

export const DESKTOP_LAYOUT_MIN = "1441px";
export const DESKTOP_LAYOUT_MQ = `(min-width: ${DESKTOP_LAYOUT_MIN})`;

export const ULTRA_LAYOUT_MIN = "1920px";
export const ULTRA_LAYOUT_MQ = `(min-width: ${ULTRA_LAYOUT_MIN})`;

export const TV_LAYOUT_MIN = "2560px";
export const TV_LAYOUT_MQ = `(min-width: ${TV_LAYOUT_MIN})`;

export const MOBILE_LAYOUT_VARIANT = "mobile-layout";
export const TABLET_HEADER_VARIANT = "tablet-header";
export const DESKTOP_VARIANT = "desktop";
export const ULTRA_LAYOUT_VARIANT = "ultra";
export const TV_LAYOUT_VARIANT = "tv";