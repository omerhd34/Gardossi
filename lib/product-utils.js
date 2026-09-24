import { defaultLocale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/i18n/localize-product";
import {
 getCategoryLabelForProduct,
 getCategorySlugForProduct,
} from "@/lib/product-category";
import {
 getPrimaryProductImage,
 getProductImageUrlForDevice,
 resolveProductImageUrls,
} from "@/lib/content/product-images";
import { getPrimaryCategoryCoverImage } from "@/lib/content/category-cover-images";

export function getPrimaryImageUrl(product) {
 const primary = getPrimaryProductImage(product);
 return getProductImageUrlForDevice(primary, "desktop");
}

export function getPrimaryImageUrls(product) {
 return resolveProductImageUrls(getPrimaryProductImage(product));
}

export function getCategoryGroupCoverImage(group) {
 return getPrimaryCategoryCoverImage(group);
}

export {
 getPrimaryProductImage,
 resolveProductImageUrls,
};
export { resolveCategoryCoverImages as getCategoryGroupCoverImages } from "@/lib/content/category-cover-images";

function attachProductImages(product) {
 if (!product) return product;

 return {
  ...product,
  images: [...(product.images ?? [])].sort(
   (left, right) => (left.sortOrder ?? 0) - (right.sortOrder ?? 0)
  ),
 };
}

function normalizeDimensionItem(item) {
 return {
  ...item,
  widthCm: item.widthCm != null ? Number(item.widthCm) : null,
  depthCm: item.depthCm != null ? Number(item.depthCm) : null,
  heightCm: item.heightCm != null ? Number(item.heightCm) : null,
  amount: item.amount != null ? Number(item.amount) : null,
  quantity: item.quantity != null ? Number(item.quantity) : null,
 };
}

export function getPriceItemQuantity(item) {
 const quantity = item?.quantity;

 if (quantity != null && quantity > 0) return quantity;

 return 1;
}

export function getPriceItemLineTotal(item) {
 if (item?.amount == null) return 0;

 return item.amount * getPriceItemQuantity(item);
}

const GROUPABLE_PRICE_ITEM_NAMES = new Set(["sandalye", "chair"]);

export function isGroupablePriceItem(item) {
 const name = item?.name?.trim().toLowerCase();
 const nameEn = item?.nameEn?.trim().toLowerCase();

 return (
  GROUPABLE_PRICE_ITEM_NAMES.has(name) || GROUPABLE_PRICE_ITEM_NAMES.has(nameEn)
 );
}

export function getPriceItemLabel(item) {
 const name = item?.name?.trim();

 if (!name) return null;

 const quantity = getPriceItemQuantity(item);

 if (isGroupablePriceItem(item) && quantity > 1) {
  return `${name} x ${quantity}`;
 }

 return name;
}

export function getPriceItemDisplayAmount(item) {
 if (isGroupablePriceItem(item) && getPriceItemQuantity(item) > 1) {
  return getPriceItemLineTotal(item);
 }

 return item?.amount ?? 0;
}

export function getDisplayPriceItems(items) {
 return items.flatMap((item, itemIndex) => {
  const quantity = getPriceItemQuantity(item);

  if (isGroupablePriceItem(item) && quantity > 1) {
   return [
    {
     ...item,
     _displayKey: `${item.name ?? "item"}-${itemIndex}-grouped`,
    },
   ];
  }

  return Array.from({ length: quantity }, (_, unitIndex) => ({
   ...item,
   quantity: 1,
   _displayKey: `${item.name ?? "item"}-${itemIndex}-${unitIndex}`,
  }));
 });
}

/** @deprecated Use getDisplayPriceItems instead */
export function expandItemsByQuantity(items) {
 return getDisplayPriceItems(items);
}

export function getDimensionItems(product) {
 if (Array.isArray(product?.dimensionItems) && product.dimensionItems.length > 0) {
  return product.dimensionItems.map(normalizeDimensionItem);
 }

 if (
  product?.widthCm != null ||
  product?.depthCm != null ||
  product?.heightCm != null
 ) {
  return [
   normalizeDimensionItem({
    widthCm: product.widthCm,
    depthCm: product.depthCm,
    heightCm: product.heightCm,
   }),
  ];
 }

 return [];
}

export function getCornerStandardSize(product) {
 const sideA = product?.cornerStandardSideACm;
 const sideB = product?.cornerStandardSideBCm;

 if (sideA == null || sideB == null) return null;

 return {
  sideA: Number(sideA),
  sideB: Number(sideB),
 };
}

export function formatCornerStandardSize(product) {
 const size = getCornerStandardSize(product);

 if (!size) return null;

 return `${size.sideA} x ${size.sideB} cm`;
}

export function serializeProduct(product, locale = defaultLocale) {
 if (!product) return product;

 return localizeProduct(
  attachProductImages({
   ...product,
   widthCm: product.widthCm != null ? Number(product.widthCm) : null,
   heightCm: product.heightCm != null ? Number(product.heightCm) : null,
   depthCm: product.depthCm != null ? Number(product.depthCm) : null,
   cornerStandardSideACm:
    product.cornerStandardSideACm != null
     ? Number(product.cornerStandardSideACm)
     : null,
   cornerStandardSideBCm:
    product.cornerStandardSideBCm != null
     ? Number(product.cornerStandardSideBCm)
     : null,
   dimensionItems: Array.isArray(product.dimensionItems)
    ? product.dimensionItems.map(normalizeDimensionItem)
    : product.dimensionItems,
  }),
  locale
 );
}

/** Ürün adını seri (ilk kelime) ve açıklayıcı başlık olarak ayırır. */
export function getProductNameParts(name, locale = defaultLocale) {
 const trimmed = name?.trim() ?? "";
 if (!trimmed) return { series: null, title: "" };

 const spaceIndex = trimmed.indexOf(" ");
 if (spaceIndex === -1) {
  return { series: null, title: trimmed };
 }

 const series = trimmed.slice(0, spaceIndex).trim();
 const title = trimmed.slice(spaceIndex + 1).trim();

 return {
  series: series || null,
  title: title || trimmed,
 };
}

export function getProductCardLabel(product) {
 return product.name;
}

export function getProductShortName(product) {
 return getProductNameParts(product.name).series ?? product.name;
}

export function getProductDetailTitle(product) {
 return getProductNameParts(product.name).title || product.name;
}

function capitalizeLabelWord(word, locale) {
 if (!word) return word;

 return word.charAt(0).toLocaleUpperCase(locale) + word.slice(1);
}

function capitalizeLabelSegment(segment, locale) {
 return segment
  .split(" ")
  .map((word) => capitalizeLabelWord(word, locale))
  .join(" ");
}

export function formatProductCardBottomLabel(name, locale = defaultLocale) {
 const trimmed = name.trim();
 if (!trimmed) return "";

 return capitalizeLabelSegment(trimmed, locale);
}

const CATEGORY_TYPE_SUFFIXES = {
 "oturma-gruplari": [
  "oturma grupları",
  "oturma grubu",
  "seating sets",
  "seating set",
 ],
 "kose-gruplari": ["köşe grupları", "köşe grubu", "corner sets", "corner set"],
 masalar: ["masa grupları", "masa grubu", "table sets", "table set"],
 salincak: ["salıncaklar", "salıncak", "swings", "swing"],
 sezlong: ["şezlonglar", "şezlong", "sun loungers", "sun lounger", "sunbed"],
 sandalyeler: [
  "sallanır sandalye",
  "rocking chairs",
  "rocking chair",
  "sandalyeler",
  "sandalye",
  "chairs",
  "chair",
 ],
};

function stripTrailingPhrase(name, phrase, locale) {
 if (!name || !phrase) return name;

 const lowerName = name.toLocaleLowerCase(locale);
 const lowerPhrase = phrase.trim().toLocaleLowerCase(locale);
 if (!lowerPhrase || !lowerName.endsWith(lowerPhrase)) return name;

 const stripped = name.slice(0, name.length - lowerPhrase.length).trim();
 return stripped || name;
}

export function stripCategoryTypeFromProductName(
 name,
 categorySlug,
 locale = defaultLocale
) {
 if (!name?.trim()) return name;

 let result = name.trim();
 const suffixes = CATEGORY_TYPE_SUFFIXES[categorySlug] ?? [];

 for (const suffix of suffixes) {
  const stripped = stripTrailingPhrase(result, suffix, locale);
  if (stripped !== result) {
   result = stripped;
   break;
  }
 }

 return result;
}

export function getProductCardBottomLabel(
 product,
 locale = defaultLocale,
 { omitCategory = false, categorySlug } = {}
) {
 const name = product.name?.trim();
 if (!name) return product.slug ?? "";

 const displayName = omitCategory
  ? stripCategoryTypeFromProductName(
   name,
   categorySlug ?? getCategorySlugForProduct(product),
   locale
  )
  : name;

 return formatProductCardBottomLabel(displayName, locale);
}

export function getPriceItems(product) {
 return getDimensionItems(product).filter((item) => item.amount != null);
}

export function getProductPriceTotal(product) {
 const items = getPriceItems(product);

 if (items.length === 0) return null;

 return items.reduce((sum, item) => sum + getPriceItemLineTotal(item), 0);
}

export function getProductDisplayPrice(product) {
 return getProductPriceTotal(product) ?? product.displayPrice ?? null;
}

export function formatProductPrice(amount, locale = defaultLocale) {
 if (amount == null) return null;

 const { amount: formattedAmount, currency } = getFormattedProductPriceParts(
  amount,
  locale
 );

 return `${formattedAmount} ${currency}`;
}

export function getFormattedProductPriceParts(amount, locale = defaultLocale) {
 const formattedAmount = new Intl.NumberFormat(
  locale === "tr" ? "tr-TR" : "en-US",
  {
   maximumFractionDigits: 0,
  }
 ).format(amount);

 return { amount: formattedAmount, currency: "TL" };
}

export function getProductFavoriteToastLabel(product, dictionary) {
 const { series, title } = getProductNameParts(product.name);
 const categoryLabel = product?.slug
  ? getCategoryLabelForProduct(product, dictionary)
  : null;

 if (series && categoryLabel) {
  return `${series} - ${title || categoryLabel}`;
 }

 return title || categoryLabel || product.name || null;
}

export function formatDimensions(product, t) {
 const items = getDimensionItems(product);

 if (items.length === 0) {
  return product.dimensions ?? null;
 }

 const widthLabel = t?.("product.dimensionWidthShort") ?? "G";
 const depthLabel = t?.("product.dimensionDepthShort") ?? "D";
 const heightLabel = t?.("product.dimensionHeightShort") ?? "Y";

 return items
  .map((item) => {
   const size = [item.widthCm, item.depthCm, item.heightCm]
    .filter((value) => value != null)
    .join(" x ");

   if (!size) return null;

   const sizeText = `${size} cm`;
   return item.name ? `${item.name}: ${sizeText}` : `${widthLabel} ${item.widthCm ?? "-"} · ${depthLabel} ${item.depthCm ?? "-"} · ${heightLabel} ${item.heightCm ?? "-"} cm`;
  })
  .filter(Boolean)
  .join(" · ");
}
