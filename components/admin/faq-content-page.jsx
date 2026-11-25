"use client";

import { FaqContentForm } from "@/components/admin/faq-content-form";
import { FaqHeroForm } from "@/components/admin/faq-hero-form";

export function FaqContentPage({ categories, faqSettings }) {
 return (
  <div className="space-y-6">
   <FaqHeroForm initial={faqSettings} />
   <FaqContentForm categories={categories} />
  </div>
 );
}