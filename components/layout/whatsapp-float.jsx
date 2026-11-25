"use client";

import Link from "next/link";
import { useSiteContact } from "@/contexts/locale-provider";
import { FaWhatsapp } from "@/lib/icons";

export function WhatsAppFloat() {
 const { whatsappHref } = useSiteContact();
 if (!whatsappHref) return null;

 return (
  <Link
   href={whatsappHref}
   target="_blank"
   rel="noopener noreferrer"
   className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgb(0_0_0/0.18)] transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
   aria-label="WhatsApp ile iletişime geç"
  >
   <FaWhatsapp className="size-7 text-[#25D366]" aria-hidden />
  </Link>
 );
}