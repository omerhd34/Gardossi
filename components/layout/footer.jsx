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

const footerContactIconClass =
 "size-6 shrink-0 ultra:size-8 tv:size-10";

const footerTitleClassName =
 "inline-block w-fit max-w-full border-b-2 border-black pb-1 font-display text-base font-semibold tracking-[0.14em] text-charcoal uppercase touch-manipulation transition-[color,transform] duration-75 hover:text-charcoal/80 active:scale-[0.98] motion-reduce:active:scale-100 md:text-lg ultra:pb-3.5 ultra:text-xl ultra:tracking-[0.18em] tv:pb-4 tv:text-2xl tv:tracking-[0.2em]";

const footerLinkClassName =
 "font-body text-sm leading-relaxed text-charcoal/75 transition-[color,transform] duration-200 hover:text-charcoal active:scale-[0.98] active:opacity-80 active:duration-75 ultra:text-base ultra:leading-relaxed tv:text-lg";

const footerBodyClassName =
 "font-body text-sm leading-relaxed text-charcoal/70 ultra:text-base tv:text-lg";

const footerLegalClassName =
 "font-body text-xs text-charcoal/70 ultra:text-sm tv:text-base";

function FooterColumn({ title, titleHref, children, className }) {
 const titleClassName = footerTitleClassName;

 return (
  <div className={cn("flex min-w-0 flex-col gap-5 ultra:gap-6 tv:gap-7", className)}>
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
  <ul className="flex flex-col gap-2.5 ultra:gap-3 tv:gap-3.5">
   {links.map((item) => (
    <li key={item.href}>
     <Link
      href={item.href}
      className={footerLinkClassName}
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
  <footer className="border-t border-border/70 bg-white pt-12 shadow-[0_-1px_2px_rgb(0_0_0/4%)] lg:pt-14 ultra:pt-16 tv:pt-20" data-nosnippet>
   <div className={containerPremiumClass}>
    <div className="mx-auto grid w-full max-w-3xl gap-x-10 gap-y-10 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-x-14 ultra:gap-x-20 tv:gap-x-24">
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
       <div className={cn("space-y-1", footerBodyClassName)}>
        {workingHours.map((row) => (
         <p key={row.label}>
          {row.label}: {row.hours}
         </p>
        ))}
       </div>

       <div className="flex flex-wrap items-center gap-4 ultra:gap-6 tv:gap-8">
        {sitePhoneHref ? (
         <Link
          href={sitePhoneHref}
          className={footerContactIconLinkClass}
          aria-label={t("footer.phone", { phone: sitePhone })}
         >
          <Phone className={footerContactIconClass} aria-hidden />
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
          <FaWhatsapp className={footerContactIconClass} aria-hidden />
         </Link>
        ) : null}
        {siteEmail ? (
         <Link
          href={`mailto:${siteEmail}`}
          className={footerContactIconLinkClass}
          aria-label={t("footer.email", { email: siteEmail })}
         >
          <Mail className={footerContactIconClass} aria-hidden />
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
          <MapPin className={footerContactIconClass} aria-hidden />
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
          <SocialIcon label={item.label} className={footerContactIconClass} />
         </Link>
        ))}
       </div>
      </div>
     </FooterColumn>
    </div>

    <div className="mt-12 border-t border-charcoal/8 pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] lg:mt-14 lg:pt-8 ultra:mt-16 ultra:pt-10 tv:mt-20 tv:pt-12">
     <div className="flex min-h-(--glass-float-size) pr-[calc(1.25rem+var(--glass-float-size)+0.75rem)] max-sm:flex-col max-sm:justify-end max-sm:gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <p className={footerLegalClassName}>
       {year} © {brandFullName}
      </p>
      <p
       className={cn(footerLegalClassName, "sm:text-right")}
       data-nosnippet
      >
       {t("footer.siteDeveloper")}{" "}
       <Link
        href="https://www.veltstack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-charcoal/70 underline underline-offset-2 touch-manipulation transition-[color,transform] duration-75 hover:text-charcoal active:scale-[0.98] motion-reduce:active:scale-100 ultra:underline-offset-4 tv:underline-offset-[5px]"
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
