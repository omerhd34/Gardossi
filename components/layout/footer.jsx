"use client";

import Link from "next/link";
import { FaWhatsapp, Mail, MapPin, Phone } from "@/lib/icons";
import { flagshipStore } from "@/lib/stores";
import { SocialIcon } from "@/components/layout/social-icon";
import { useTranslations } from "@/contexts/locale-provider";
import { brandFullName } from "@/lib/brand";
import {
 getSiteWorkingHours,
 getWhatsAppHref,
 siteEmail,
 sitePhone,
 sitePhoneHref,
 socialLinks,
} from "@/lib/site-contact";
import { containerPremiumClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

const footerContactIconLinkClass =
 "inline-flex scale-100 text-charcoal/70 touch-manipulation transition-[scale,color] duration-200 ease-out hover:scale-110 hover:text-charcoal active:scale-95 active:duration-75 motion-reduce:transition-none";

function FooterColumn({ title, titleHref, children, className }) {
 const titleClassName =
  "font-body text-[13px] font-semibold tracking-wide text-charcoal touch-manipulation transition-[color,transform] duration-75 hover:text-charcoal/80 active:scale-[0.98] motion-reduce:active:scale-100";

 return (
  <div className={cn("flex min-w-0 flex-col gap-4", className)}>
   {titleHref ? (
    <Link href={titleHref} className={titleClassName}>
     {title}
    </Link>
   ) : (
    <h2 className={titleClassName}>{title}</h2>
   )}
   <div className="flex flex-col">{children}</div>
  </div>
 );
}

function FooterLinkList({ links }) {
 return (
  <ul className="flex flex-col gap-2.5">
   {links.map((item) => (
    <li key={item.href}>
     <Link
      href={item.href}
      className="font-body text-[13px] leading-relaxed text-charcoal/75 transition-[color,transform] duration-200 hover:text-charcoal active:scale-[0.98] active:opacity-80 active:duration-75"
     >
      {item.label}
     </Link>
    </li>
   ))}
  </ul>
 );
}

export function Footer() {
 const { navigation, t, locale, dictionary } = useTranslations();
 const { footerExploreLinks, footerCategoryLinks } = navigation;
 const whatsAppHref = getWhatsAppHref();
 const year = new Date().getFullYear();
 const workingHours = getSiteWorkingHours(locale, dictionary);

 return (
  <footer className="bg-white pt-12 lg:pt-14" data-nosnippet>
   <div className={containerPremiumClass}>
    <div className="mx-auto grid max-w-3xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 lg:gap-x-14">
     <FooterColumn title={t("footer.categories")} titleHref="/urunler">
      <FooterLinkList links={footerCategoryLinks} />
     </FooterColumn>

     <FooterColumn title={t("footer.explore")}>
      <FooterLinkList links={footerExploreLinks} />
     </FooterColumn>

     <FooterColumn
      title={t("footer.getInTouch")}
      titleHref="/iletisim"
      className="sm:col-span-2 lg:col-span-1"
     >
      <div className="flex flex-col gap-4">
       <div className="space-y-1 font-body text-[13px] leading-relaxed text-charcoal/70">
        {workingHours.map((row) => (
         <p key={row.label}>
          {row.label}: {row.hours}
         </p>
        ))}
       </div>

       <div className="flex flex-wrap items-center gap-4">
        {sitePhoneHref ? (
         <Link
          href={sitePhoneHref}
          className={footerContactIconLinkClass}
          aria-label={t("footer.phone", { phone: sitePhone })}
         >
          <Phone className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {whatsAppHref ? (
         <Link
          href={whatsAppHref}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={t("contact.whatsapp")}
         >
          <FaWhatsapp className="size-4" aria-hidden />
         </Link>
        ) : null}
        {siteEmail ? (
         <Link
          href={`mailto:${siteEmail}`}
          className={footerContactIconLinkClass}
          aria-label={t("footer.email", { email: siteEmail })}
         >
          <Mail className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {flagshipStore.mapUrl ? (
         <Link
          href={flagshipStore.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={t("footer.location")}
         >
          <MapPin className="size-4 shrink-0" aria-hidden />
         </Link>
        ) : null}
        {socialLinks.map((item) => (
         <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={footerContactIconLinkClass}
          aria-label={item.label}
         >
          <SocialIcon label={item.label} />
         </Link>
        ))}
       </div>
      </div>
     </FooterColumn>
    </div>

    <div className="mt-12 border-t border-charcoal/8 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:mt-14 lg:pt-8">
     <div className="flex min-h-(--glass-float-size) pr-[calc(1.25rem+var(--glass-float-size)+0.75rem)] max-sm:flex-col max-sm:justify-end max-sm:gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <p className="font-body text-[12px] text-charcoal/70">
       {year} © {brandFullName}
      </p>
      <p
       className="font-body text-[12px] text-charcoal/70 sm:text-right"
       data-nosnippet
      >
       {t("footer.siteDeveloper")}{" "}
       <Link
        href="https://www.veltstack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-charcoal/70 underline underline-offset-2 touch-manipulation transition-[color,transform] duration-75 hover:text-charcoal active:scale-[0.98] motion-reduce:active:scale-100"
       >
        VeltStack
       </Link>
      </p>
     </div>
    </div>
   </div>
  </footer>
 );
}
