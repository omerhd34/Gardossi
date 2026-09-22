"use client";

import Link from "next/link";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import {
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
} from "@/lib/site-contact";

const faqContactIconLinkClass =
 "inline-flex scale-100 items-center justify-center text-charcoal/70 touch-manipulation transition-[scale,color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:text-charcoal motion-reduce:duration-150 motion-reduce:active:scale-100";

export function FaqContactBar() {
 const { t } = useTranslations();
 const whatsAppHref = getWhatsAppHref();

 return (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
   {sitePhoneHref ? (
    <Link
     href={sitePhoneHref}
     className={faqContactIconLinkClass}
     aria-label={t("footer.phone", { phone: sitePhone })}
    >
     <Phone className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}

   {whatsAppHref ? (
    <Link
     href={whatsAppHref}
     target="_blank"
     rel="noopener noreferrer"
     className={faqContactIconLinkClass}
     aria-label={t("contact.whatsapp")}
    >
     <FaWhatsapp className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}

   {siteEmail ? (
    <Link
     href={`mailto:${siteEmail}`}
     className={faqContactIconLinkClass}
     aria-label={t("footer.email", { email: siteEmail })}
    >
     <Mail className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}
  </div>
 );
}
