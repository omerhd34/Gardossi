import { Suspense } from "react";
import { Montserrat, Poppins } from "next/font/google";
import { SiteNavigationProgress } from "@/components/navigation/site-navigation-progress";
import "@/app/styles/base.css";
import { MainShell } from "@/components/layout/main-shell";
import { SiteChrome } from "@/components/layout/site-chrome";
import { AppToaster } from "@/components/ui/app-toaster";
import { FavoritesProvider } from "@/contexts/favorites-provider";
import { LocaleProvider } from "@/contexts/locale-provider";
import { getCategoryGroupsForMenu } from "@/lib/queries/category-groups";
import { getServerDictionary } from "@/lib/i18n/server";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo/json-ld";
import { buildPageSeoMetadata } from "@/lib/seo/pages";
import { brandName } from "@/lib/brand";
import { buildSiteOpenGraph, siteMetadata } from "@/lib/site-metadata";

const montserrat = Montserrat({
 variable: "--font-montserrat",
 subsets: ["latin", "latin-ext"],
 weight: ["400", "500", "600", "700"],
 display: "swap",
});

const poppins = Poppins({
 variable: "--font-poppins",
 subsets: ["latin", "latin-ext"],
 weight: ["800"],
 display: "swap",
});

export async function generateMetadata() {
 const { dictionary, locale } = await getServerDictionary();
 const seo = buildPageSeoMetadata("home", locale);
 const openGraphLocale = locale === "en" ? "en_US" : "tr_TR";

 return {
  ...siteMetadata,
  title: {
   default: seo.metaTitle,
   template: `%s - ${brandName}`,
  },
  description: seo.description,
  keywords: dictionary.metadata.keywords ?? siteMetadata.keywords,
  openGraph: buildSiteOpenGraph({
   ...siteMetadata.openGraph,
   title: seo.metaTitle,
   description: seo.description,
   locale: openGraphLocale,
  }),
  twitter: {
   ...siteMetadata.twitter,
   title: seo.metaTitle,
   description: seo.description,
  },
 };
}

export const revalidate = 0;

export default async function RootLayout({ children }) {
 const { locale, dictionary, siteContact } = await getServerDictionary();
 const menuGroups = await getCategoryGroupsForMenu(locale);
 const siteWebSiteJsonLd = buildWebSiteJsonLd();
 const siteOrganizationJsonLd = buildOrganizationJsonLd(locale, siteContact);

 return (
  <html
   lang={locale}
   data-scroll-behavior="smooth"
   data-toast-layout="fab"
   className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}
  >
   <head>
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(siteWebSiteJsonLd) }}
    />
    <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(siteOrganizationJsonLd) }}
    />
    <script
     dangerouslySetInnerHTML={{
      __html: `window.onerror=function(m,s,l,c){var d=document.createElement('div');d.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#fff;color:#c00;font:20px monospace;padding:10px;white-space:pre-wrap';d.textContent=m+' @'+String(s).split('/').pop()+':'+l;(document.body||document.documentElement).appendChild(d)};`,
     }}
    />
   </head>
   <body className="min-h-full flex flex-col font-sans">
    <Suspense fallback={null}>
     <SiteNavigationProgress />
    </Suspense>
    <LocaleProvider
     locale={locale}
     dictionary={dictionary}
     menuGroups={menuGroups}
     siteContact={siteContact}
    >
     <FavoritesProvider>
      <MainShell>{children}</MainShell>
      <SiteChrome />
      <AppToaster />
     </FavoritesProvider>
    </LocaleProvider>
   </body>
  </html>
 );
}
