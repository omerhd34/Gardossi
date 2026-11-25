"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { buildNavigation } from "@/lib/i18n/build-navigation";
import { EMPTY_SITE_CONTACT } from "@/lib/site-contact-resolve";
import { localeLabels } from "@/lib/i18n/config";
import { t as translate } from "@/lib/i18n/translate";

const LocaleContext = createContext(null);

export function LocaleProvider({
 locale,
 dictionary,
 menuGroups = null,
 siteContact = null,
 children,
}) {
 const router = useRouter();

 const navigation = useMemo(
  () => buildNavigation(dictionary, menuGroups),
  [dictionary, menuGroups]
 );

 const setLocale = useCallback(
  async (nextLocale) => {
   if (nextLocale === locale) return;

   await fetch("/api/locale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale: nextLocale }),
   });

   router.refresh();
  },
  [locale, router]
 );

 const value = useMemo(
  () => ({
   locale,
   dictionary,
   navigation,
   siteContact,
   setLocale,
   t: (key, vars) => translate(dictionary, key, vars),
   localeLabel: localeLabels[locale],
  }),
  [locale, dictionary, navigation, siteContact, setLocale]
 );

 return (
  <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
 );
}

export function useLocale() {
 const context = useContext(LocaleContext);
 if (!context) {
  throw new Error("useLocale must be used within LocaleProvider");
 }
 return context;
}

export function useTranslations() {
 const { t, dictionary, locale, navigation, siteContact } = useLocale();
 return { t, dictionary, locale, navigation, siteContact };
}

export function useSiteContact() {
 const { siteContact } = useLocale();
 return siteContact ?? EMPTY_SITE_CONTACT;
}
