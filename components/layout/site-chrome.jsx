"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { ContactFloat } from "@/components/layout/contact-float";
import { Header } from "@/components/layout/header";

const Footer = dynamic(() =>
 import("@/components/layout/footer").then((module) => module.Footer)
);

export function SiteChrome() {
 const pathname = usePathname();
 const isAdmin = pathname?.startsWith("/admin");

 if (isAdmin) return null;

 return (
  <>
   <Header />
   <Footer />
   <ContactFloat />
  </>
 );
}
