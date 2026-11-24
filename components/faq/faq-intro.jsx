"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { pageBodyParagraphClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function FaqIntro() {
 const { t } = useTranslations();

 return (
  <p
   className={cn(
    pageBodyParagraphClass,
    "mx-auto max-w-3xl text-center text-charcoal/80 ultra:max-w-4xl tv:max-w-5xl"
   )}
  >
   {t("faq.intro")}
  </p>
 );
}
