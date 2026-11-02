import { brandFullName, brandName } from "@/lib/brand";
import { getFlagshipStore } from "@/lib/stores";
import {
 enLocalSeoDescription,
 trLocalSeoDescription,
} from "@/lib/seo/local";
import {
 formatSeoTitle,
 resolveSiteHomeUrl,
 resolveSiteUrl,
 seoSiteName,
} from "@/lib/site-metadata";
import {
 buildUrunlerCatalogHref,
 getGoogleSitelinks,
 getCatalogSeoConfig,
 getPageSeoConfig,
} from "@/lib/seo/pages";
import {
 buildProductSeoDescription,
 resolveProductSeoName,
} from "@/lib/seo/product-description";
import { siteEmail, sitePhoneHref, socialLinks } from "@/lib/site-contact";
import { getProductDisplayPrice } from "@/lib/product-utils";

const GEO = {
 latitude: 40.07183049974077,
 longitude: 29.527898513892158,
};

const brandAlternateNames = [brandFullName, "gardossi.com"];

export function buildOrganizationJsonLd(locale = "tr") {
 const store = getFlagshipStore(locale);
 const siteUrl = resolveSiteUrl();
 const description =
  locale === "en" ? enLocalSeoDescription : trLocalSeoDescription;
 const telephone = sitePhoneHref?.replace(/^tel:/, "") ?? undefined;
 const sameAs = socialLinks.map((link) => link.href).filter(Boolean);

 return {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": `${siteUrl}/#organization`,
  name: seoSiteName,
  legalName: brandFullName,
  alternateName: brandAlternateNames,
  description,
  url: resolveSiteHomeUrl(),
  ...(telephone ? { telephone } : {}),
  ...(siteEmail ? { email: siteEmail } : {}),
  ...(sameAs.length ? { sameAs } : {}),
  address: {
   "@type": "PostalAddress",
   streetAddress: "Mahmudiye Mahallesi, 11. Mobilya Sokak No: 21/I",
   addressLocality: "İnegöl",
   addressRegion: "Bursa",
   postalCode: "16400",
   addressCountry: "TR",
  },
  geo: {
   "@type": "GeoCoordinates",
   latitude: GEO.latitude,
   longitude: GEO.longitude,
  },
  areaServed: [
   { "@type": "City", name: "İnegöl" },
   { "@type": "AdministrativeArea", name: "Bursa" },
   { "@type": "Country", name: "Türkiye" },
  ],
  hasMap: store.mapUrl,
  image: `${siteUrl}/og-image.png`,
  logo: {
   "@type": "ImageObject",
   url: `${siteUrl}/brand/favicon-512.png`,
   width: 512,
   height: 512,
  },
  hasMerchantReturnPolicy: buildOfferReturnPolicy(siteUrl),
 };
}

export function buildSiteStructuredDataGraph(locale = "tr") {
 return {
  "@context": "https://schema.org",
  "@graph": [buildOrganizationJsonLd(locale), buildWebSiteJsonLd()],
 };
}

export function buildWebSiteJsonLd() {
 const siteUrl = resolveSiteUrl();

 return {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: seoSiteName,
  alternateName: brandAlternateNames,
  url: resolveSiteHomeUrl(),
  publisher: { "@id": `${siteUrl}/#organization` },
 };
}

export function buildSiteNavigationJsonLd(locale = "tr") {
 const siteUrl = resolveSiteUrl();
 const sitelinks = getGoogleSitelinks(locale);

 return {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#sitenavigation`,
  name: locale === "en" ? "Main navigation" : "Ana menü",
  itemListElement: sitelinks.map((link, index) => ({
   "@type": "SiteNavigationElement",
   position: index + 1,
   name: link.name,
   url: `${siteUrl}${link.href}`,
   ...(link.description ? { description: link.description } : {}),
  })),
 };
}

export function buildCatalogWebPageJsonLd({ categorySlug, locale = "tr" } = {}) {
 const siteUrl = resolveSiteUrl();
 const catalogHref = buildUrunlerCatalogHref(categorySlug);
 const seo = getCatalogSeoConfig(categorySlug, locale);
 const pageUrl = `${siteUrl}${catalogHref}`;

 return {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  name: seo.metaTitle,
  description: seo.description,
  url: pageUrl,
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "tr-TR",
 };
}

export function buildPageWebPageJsonLd({ pageKey, path, locale = "tr" }) {
 const siteUrl = resolveSiteUrl();
 const seo = getPageSeoConfig(pageKey, locale);
 if (!seo || !path) return null;

 const pageUrl = `${siteUrl}${path}`;
 const metaTitle = seo.metaTitle;

 return {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  name: metaTitle,
  description: seo.description,
  url: pageUrl,
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "tr-TR",
 };
}

function resolveAbsoluteImageUrl(url, siteUrl) {
 if (!url) return undefined;
 if (url.startsWith("http://") || url.startsWith("https://")) return url;
 return `${siteUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

function formatSchemaPrice(amount) {
 return Number(amount).toFixed(2);
}

const MERCHANT_COUNTRY = "TR";

function buildOfferShippingDetails(siteUrl) {
 return {
  "@type": "OfferShippingDetails",
  shippingRate: {
   "@type": "MonetaryAmount",
   currency: "TRY",
   maxValue: 15000,
  },
  shippingDestination: {
   "@type": "DefinedRegion",
   addressCountry: MERCHANT_COUNTRY,
  },
  deliveryTime: {
   "@type": "ShippingDeliveryTime",
   handlingTime: {
    "@type": "QuantitativeValue",
    minValue: 3,
    maxValue: 21,
    unitCode: "DAY",
   },
   transitTime: {
    "@type": "QuantitativeValue",
    minValue: 1,
    maxValue: 14,
    unitCode: "DAY",
   },
  },
  shippingSettingsLink: `${siteUrl}/sss#teslimat`,
 };
}

function buildOfferReturnPolicy(siteUrl) {
 return {
  "@type": "MerchantReturnPolicy",
  applicableCountry: MERCHANT_COUNTRY,
  returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  merchantReturnLink: `${siteUrl}/sss#teslimat`,
 };
}

function buildProductOffers(product, productUrl, siteUrl) {
 const price = getProductDisplayPrice(product);
 if (price == null) return null;

 return {
  "@type": "Offer",
  url: productUrl,
  priceCurrency: "TRY",
  price: formatSchemaPrice(price),
  availability: "https://schema.org/InStock",
  itemCondition: "https://schema.org/NewCondition",
  shippingDetails: buildOfferShippingDetails(siteUrl),
  hasMerchantReturnPolicy: buildOfferReturnPolicy(siteUrl),
  seller: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: seoSiteName,
   url: resolveSiteHomeUrl(),
  },
 };
}

function buildProductListItem(product, index, siteUrl) {
 const productUrl = `${siteUrl}/urunler/${product.slug}`;

 return {
  "@type": "ListItem",
  position: index + 1,
  name: product.name,
  url: productUrl,
 };
}

export function buildProductsItemListJsonLd({
 products,
 locale = "tr",
 listId = "site-products",
 listName,
} = {}) {
 if (!products?.length) return null;

 const siteUrl = resolveSiteUrl();
 const resolvedListName =
  listName ?? (locale === "en" ? "Products" : "Ürünler");

 return {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#${listId}`,
  name: resolvedListName,
  isPartOf: { "@id": `${siteUrl}/#website` },
  itemListElement: products.map((product, index) =>
   buildProductListItem(product, index, siteUrl)
  ),
 };
}

export function buildProductWebPageJsonLd(product, locale = "tr") {
 if (!product) return null;

 const siteUrl = resolveSiteUrl();
 const productUrl = `${siteUrl}/urunler/${product.slug}`;
 const productName = resolveProductSeoName({
  name: product.name,
  nameEn: product.nameEn,
  locale,
 });
 if (!productName) return null;

 const metaTitle = formatSeoTitle(productName);
 const description = buildProductSeoDescription({
  name: product.name,
  nameEn: product.nameEn,
  locale,
 });

 return {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${productUrl}#webpage`,
  name: metaTitle,
  headline: metaTitle,
  ...(description ? { description } : {}),
  url: productUrl,
  isPartOf: { "@id": `${siteUrl}/#website` },
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: locale === "en" ? "en-US" : "tr-TR",
 };
}

export function buildProductJsonLd(product, locale = "tr") {
 if (!product) return null;

 const siteUrl = resolveSiteUrl();
 const productUrl = `${siteUrl}/urunler/${product.slug}`;
 const images = (product.images ?? [])
  .map((image) => resolveAbsoluteImageUrl(image.url, siteUrl))
  .filter(Boolean);
 const offers = buildProductOffers(product, productUrl, siteUrl);
 const seoDescription = buildProductSeoDescription({
  name: product.name,
  nameEn: product.nameEn,
  locale,
 });

 if (!offers) return null;

 return {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${productUrl}#product`,
  name: product.name,
  ...(product.sku ? { sku: product.sku, mpn: product.sku } : {}),
  ...(seoDescription ? { description: seoDescription } : {}),
  url: productUrl,
  ...(images.length
   ? { image: images.length === 1 ? images[0] : images }
   : {}),
  brand: {
   "@type": "Brand",
   name: seoSiteName,
  },
  manufacturer: {
   "@type": "Organization",
   "@id": `${siteUrl}/#organization`,
   name: seoSiteName,
  },
  offers,
  isPartOf: { "@id": `${siteUrl}/#website` },
 };
}
