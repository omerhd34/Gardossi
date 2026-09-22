"use client";

import { useTranslations } from "@/contexts/locale-provider";
import { FaWhatsapp, Mail, Phone } from "@/lib/icons";
import {
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
} from "@/lib/site-contact";
import Link from "next/link";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import {
 legalContactClass,
 legalSectionClass,
} from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

const legalContactIconClass =
 "inline-flex scale-100 text-charcoal/70 touch-manipulation transition-[scale,color] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-110 hover:text-charcoal motion-reduce:duration-150 motion-reduce:active:scale-100";

export function LegalPageContent({ contentKey }) {
 const { dictionary, t } = useTranslations();
 const content = dictionary.legal[contentKey];
 const whatsAppHref = getWhatsAppHref();

 return (
  <article className="legal-page pb-20 md:pb-28">
   <div className={containerPremiumClass}>
    {content.intro ? (
     <p className={cn("w-full font-body text-[0.95rem] leading-relaxed text-charcoal/75 md:text-base")}>
      {content.intro}
     </p>
    ) : null}

    <div
     className={`legal-page__body w-full ${content.intro ? "mt-12 md:mt-14" : "mt-2 md:mt-4"}`}
    >
     {content.sections.map((section) => (
      <section
       key={section.title}
       className={legalSectionClass}
       aria-labelledby={`legal-${contentKey}-${section.id}`}
      >
       <h2
        id={`legal-${contentKey}-${section.id}`}
        className="font-display text-[0.875rem] font-semibold tracking-[0.26em] text-charcoal uppercase md:text-base"
       >
        {section.title}
       </h2>

       {section.paragraphs?.map((paragraph) => (
        <p
         key={paragraph}
         className="mt-4 font-body text-[0.95rem] leading-[1.85] text-charcoal/78 md:text-base"
        >
         {paragraph}
        </p>
       ))}

       {section.list?.length ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 font-body text-[0.95rem] leading-[1.85] text-charcoal/78 md:text-base">
         {section.list.map((item) => (
          <li key={item}>{item}</li>
         ))}
        </ul>
       ) : null}
      </section>
     ))}
    </div>

    <aside className={cn("mt-14 w-full rounded-2xl px-6 py-8 md:px-9 md:py-10", legalContactClass)}>
     <h2 className="font-display text-base font-semibold tracking-tight text-charcoal md:text-lg">
      {t("legal.shared.contactTitle")}
     </h2>
     <p className="mt-4 font-body text-[0.95rem] leading-relaxed text-charcoal/75 md:text-base">
      {t("legal.shared.contactDescription")}
     </p>
     <div className="mt-6 flex flex-wrap items-center gap-6">
      {sitePhoneHref ? (
       <Link
        href={sitePhoneHref}
        className={legalContactIconClass}
        aria-label={t("footer.phone", { phone: sitePhone })}
       >
        <Phone className="size-5 shrink-0" aria-hidden />
       </Link>
      ) : null}
      {whatsAppHref ? (
       <Link
        href={whatsAppHref}
        target="_blank"
        rel="noopener noreferrer"
        className={legalContactIconClass}
        aria-label={t("contact.whatsapp")}
       >
        <FaWhatsapp className="size-5" aria-hidden />
       </Link>
      ) : null}
      {siteEmail ? (
       <Link
        href={`mailto:${siteEmail}`}
        className={legalContactIconClass}
        aria-label={t("footer.email", { email: siteEmail })}
       >
        <Mail className="size-5 shrink-0" aria-hidden />
       </Link>
      ) : null}
     </div>
    </aside>
   </div>
  </article>
 );
}
