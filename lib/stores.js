import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { brandFullNameUppercase } from "@/lib/brand";
import { getSiteWorkingHours } from "@/lib/site-contact";
import { EMPTY_SITE_CONTACT } from "@/lib/site-contact-resolve";

const MAP_COORDS = "40.07183049974077,29.527898513892158";
const MAP_ZOOM = "19";

function buildMapUrl(language, embed = false) {
 const params = new URLSearchParams({
  q: MAP_COORDS,
  hl: language,
  z: MAP_ZOOM,
 });

 if (embed) {
  params.set("output", "embed");
  params.set("iwloc", "0");
 }

 return `https://www.google.com/maps?${params.toString()}`;
}

export function getFlagshipStore(
 locale = defaultLocale,
 dictionary = null,
 siteContact = EMPTY_SITE_CONTACT
) {
 const dict = dictionary ?? getDictionary(locale);
 const mapLanguage = locale === "en" ? "en" : "tr";

 return {
  name: brandFullNameUppercase,
  address: dict.contact.address,
  phone: siteContact.phone,
  phoneHref: siteContact.phoneHref,
  email: siteContact.email,
  hours: getSiteWorkingHours(locale, dict),
  mapUrl: buildMapUrl(mapLanguage),
  mapEmbedUrl: buildMapUrl(mapLanguage, true),
 };
}

