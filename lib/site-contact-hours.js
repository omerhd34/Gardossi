import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";

export function getSiteWorkingHours(locale = defaultLocale, dictionary = null) {
 const dict = dictionary ?? getDictionary(locale);

 return [
  {
   label: dict.contact.weekdays,
   hours: dict.contact.weekdayHours,
  },
  {
   label: dict.contact.weekend,
   hours: dict.contact.weekendHours,
  },
 ];
}