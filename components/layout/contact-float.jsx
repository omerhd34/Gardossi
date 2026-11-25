/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowUp as TbArrowUp, Phone as TbPhone } from "lucide-react";
import { TbBrandWhatsapp } from "react-icons/tb";
import { useSiteContact, useTranslations } from "@/contexts/locale-provider";
import {
 contactFloatBtnClass,
 contactFloatIconClass,
} from "@/lib/layout/header-styles";

const FLOAT_ICON_STROKE = 3;

function getScrollThreshold() {
 const hero = document.querySelector(".hero-carousel");
 return hero?.offsetHeight ?? window.innerHeight;
}

export function ContactFloat() {
 const { t } = useTranslations();
 const { phoneHref, whatsappHref } = useSiteContact();
 const [showBackToTop, setShowBackToTop] = useState(false);

 const updateBackToTopVisibility = useCallback(() => {
  setShowBackToTop(window.scrollY > getScrollThreshold());
 }, []);

 useEffect(() => {
  updateBackToTopVisibility();
  window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
  window.addEventListener("resize", updateBackToTopVisibility);

  return () => {
   window.removeEventListener("scroll", updateBackToTopVisibility);
   window.removeEventListener("resize", updateBackToTopVisibility);
  };
 }, [updateBackToTopVisibility]);

 const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
 };

 if (!whatsappHref && !phoneHref) return null;

 return (
  <div className="contact-float-shell pointer-events-none fixed inset-x-auto right-5 bottom-(--contact-float-bottom) z-50 ultra:right-8 tv:right-10">
   <div className="pointer-events-auto flex flex-col items-center gap-3 ultra:gap-4 tv:gap-6">
    {showBackToTop ? (
     <button
      type="button"
      onClick={scrollToTop}
      className={contactFloatBtnClass}
      aria-label={t("contact.backToTop")}
     >
      <TbArrowUp
       className={contactFloatIconClass}
       strokeWidth={FLOAT_ICON_STROKE}
       aria-hidden
      />
     </button>
    ) : null}
    {phoneHref ? (
     <Link
      href={phoneHref}
      className={contactFloatBtnClass}
      aria-label={t("contact.call")}
     >
      <TbPhone
       className={contactFloatIconClass}
       strokeWidth={FLOAT_ICON_STROKE}
       aria-hidden
      />
     </Link>
    ) : null}
    {whatsappHref ? (
     <Link
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={contactFloatBtnClass}
      aria-label={t("contact.whatsapp")}
     >
      <TbBrandWhatsapp
       className={contactFloatIconClass}
       strokeWidth={FLOAT_ICON_STROKE}
       aria-hidden
      />
     </Link>
    ) : null}
   </div>
  </div>
 );
}
