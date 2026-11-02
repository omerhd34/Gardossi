import { brandFullName, brandName } from "@/lib/brand";
import {
 trLocalSeoTitle,
 trLocalSeoDescription,
 trLocalSeoKeywords,
} from "@/lib/seo/local";

/** A — Google sitename */
export const seoSiteName = brandName;

const siteDescription = trLocalSeoDescription;
/** B — varsayılan <title> */
const siteTitle = `${brandName} - ${trLocalSeoTitle}`;

export const siteOgImagePath = "/og-image.png";
const ogImageWidth = 1200;
const ogImageHeight = 630;

export const siteOgImages = [
 {
  url: siteOgImagePath,
  width: ogImageWidth,
  height: ogImageHeight,
  type: "image/jpeg",
  alt: `${brandFullName} - İnegöl bahçe mobilyası ve bahçe takımı`,
 },
];

export const siteTwitterImages = [siteOgImagePath];

const PRODUCTION_SITE_URL = "https://www.gardossi.com";

function isLocalHostUrl(url) {
 return /localhost|127\.0\.0\.1/i.test(url);
}

export function resolveSiteUrl() {
 const fromEnv = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");

 if (fromEnv && !isLocalHostUrl(fromEnv)) {
  return fromEnv;
 }

 if (process.env.NODE_ENV === "production") {
  return PRODUCTION_SITE_URL;
 }

 return fromEnv || "http://localhost:3000";
}

export function resolveSiteHomeUrl() {
 return `${resolveSiteUrl()}/`;
}

export function formatSeoTitle(pageTitle) {
 const trimmed = pageTitle.trim();
 const suffix = ` - ${brandName}`;

 if (trimmed.endsWith(suffix)) return trimmed;

 return `${trimmed}${suffix}`;
}

/** @param {string} pageTitle */
export function buildSeoPageTitle(pageTitle) {
 return { absolute: formatSeoTitle(pageTitle) };
}

/** @type {import("next").Metadata["openGraph"]} */
export function buildSiteOpenGraph(overrides = {}) {
 const { siteName: _ignoredSiteName, ...rest } = overrides;

 return {
  type: "website",
  siteName: seoSiteName,
  ...rest,
 };
}

/** @type {import("next").Metadata} */
export const siteNameMetadata = {
 applicationName: seoSiteName,
 openGraph: buildSiteOpenGraph(),
};

/**
 * Next.js Metadata çıktısı.
 * A = seoSiteName, B = metaTitle, C = description.
 */
export function buildSeoMetadataOutput({
 metaTitle,
 description,
 path,
 keywords,
 index = true,
 openGraph = {},
 twitter = {},
}) {
 const siteUrl = resolveSiteUrl();
 const canonical = path
  ? path.startsWith("http")
   ? path
   : `${siteUrl}${path}`
  : null;

 const { images: openGraphImages, ...openGraphRest } = openGraph;
 const { images: twitterImages, ...twitterRest } = twitter;

 return {
  ...siteNameMetadata,
  metadataBase: new URL(siteUrl),
  title: { absolute: metaTitle },
  description,
  ...(canonical ? { alternates: { canonical } } : {}),
  openGraph: buildSiteOpenGraph({
   title: metaTitle,
   description,
   siteName: seoSiteName,
   images: openGraphImages ?? siteOgImages,
   ...(path && !path.startsWith("http")
    ? { url: path === "/" ? resolveSiteHomeUrl() : path }
    : {}),
   ...openGraphRest,
  }),
  twitter: {
   card: "summary_large_image",
   title: metaTitle,
   description,
   images: twitterImages ?? siteTwitterImages,
   ...twitterRest,
  },
  ...(keywords ? { keywords } : {}),
  robots: { index, follow: true },
 };
}

/** @type {import("next").Metadata} */
export const siteMetadata = {
 metadataBase: new URL(resolveSiteUrl()),
 applicationName: seoSiteName,
 appleWebApp: {
  title: seoSiteName,
  statusBarStyle: "default",
  capable: true,
 },
 title: {
  default: siteTitle,
  template: `%s - ${brandName}`,
 },
 description: siteDescription,
 authors: [{ name: "Ömer Halis Demir" }],
 creator: "Ömer Halis Demir",
 keywords: trLocalSeoKeywords,
 manifest: "/manifest.webmanifest",
 icons: {
  icon: [
   { url: "/brand/favicon.svg", type: "image/svg+xml" },
   { url: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
   { url: "/brand/favicon-96.png", sizes: "96x96", type: "image/png" },
   { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
   { url: "/brand/favicon-512.png", sizes: "512x512", type: "image/png" },
   { url: "/brand/favicon.ico", sizes: "48x48" },
  ],
  apple: [
   { url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
  shortcut: "/brand/favicon.ico",
 },
 openGraph: buildSiteOpenGraph({
  title: siteTitle,
  description: siteDescription,
  images: siteOgImages,
 }),
 twitter: {
  card: "summary_large_image",
  title: siteTitle,
  description: siteDescription,
  images: siteTwitterImages,
 },
};
