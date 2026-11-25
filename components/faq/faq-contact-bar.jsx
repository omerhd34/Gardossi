"use client";

import Link from "next/link";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import { useSiteContact, useTranslations } from "@/contexts/locale-provider";

const faqContactIconLinkClass =
 "inline-flex scale-100 items-center justify-center text-charcoal/70 touch-manipulation transition-[scale,color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:text-charcoal motion-reduce:duration-150 motion-reduce:active:scale-100";

export function FaqContactBar() {
 const { t } = useTranslations();
 const { phone, phoneHref, email, whatsappHref } = useSiteContact();

 return (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:gap-x-10">
   {phoneHref ? (
    <Link
     href={phoneHref}
     className={faqContactIconLinkClass}
     aria-label={t("footer.phone", { phone })}
    >
     <Phone className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}

   {whatsappHref ? (
    <Link
     href={whatsappHref}
     target="_blank"
     rel="noopener noreferrer"
     className={faqContactIconLinkClass}
     aria-label={t("contact.whatsapp")}
    >
     <FaWhatsapp className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}

   {email ? (
    <Link
     href={`mailto:${email}`}
     className={faqContactIconLinkClass}
     aria-label={t("footer.email", { email })}
    >
     <Mail className="size-6 shrink-0" aria-hidden />
    </Link>
   ) : null}
  </div>
 );
}
