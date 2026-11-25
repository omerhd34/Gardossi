import { cookies } from "next/headers";
import { getMergedDictionary } from "@/lib/content/queries";
import { getSiteContactSettings } from "@/lib/site-contact-settings";
import { defaultLocale, isValidLocale, localeCookieName } from "@/lib/i18n/config";

function readLocaleFromCookies(cookieStore) {
 const value = cookieStore.get(localeCookieName)?.value;
 return isValidLocale(value) ? value : defaultLocale;
}

export async function getLocale() {
 try {
  const cookieStore = await cookies();
  return readLocaleFromCookies(cookieStore);
 } catch (error) {
  if (error?.digest !== "DYNAMIC_SERVER_USAGE") {
   throw error;
  }
  return defaultLocale;
 }
}

export async function getServerDictionary() {
 const locale = await getLocale();
 const [dictionary, siteContact] = await Promise.all([
  getMergedDictionary(locale),
  getSiteContactSettings(),
 ]);
 return { locale, dictionary, siteContact };
}
