"use client";

import { useState } from "react";
import { FaqAccordionList } from "@/components/faq/faq-accordion-list";
import { useLocale } from "@/contexts/locale-provider";
import { ChevronDownIcon } from "@/lib/icons";

export function FaqCategorySection({ category }) {
 const { t } = useLocale();
 const { id, title, items, initialVisible = items.length } = category;
 const [visibleCount, setVisibleCount] = useState(initialVisible);

 const visibleItems = items.slice(0, visibleCount);
 const hasMore = visibleCount < items.length;

 return (
  <section
   id={id}
   className="scroll-mt-32 pt-16 md:pt-20"
   aria-labelledby={`${id}-heading`}
  >
   <h2
    id={`${id}-heading`}
    className="text-center font-display text-[clamp(1.1rem,2.5vw,1.65rem)] font-normal tracking-[0.32em] text-charcoal uppercase"
   >
    {title}
   </h2>

   <div className="mx-auto mt-8 max-w-3xl ultra:max-w-4xl tv:max-w-5xl">
    <FaqAccordionList items={visibleItems} idPrefix={id} />

    {hasMore ? (
     <div className="mt-6 text-center">
      <button
       type="button"
       onClick={() => setVisibleCount(items.length)}
       className="inline-flex cursor-pointer items-center gap-1.5 font-display text-[0.8rem] tracking-[0.12em] text-charcoal/55 uppercase transition-colors hover:text-charcoal"
      >
       {t("faq.showMore")}
       <ChevronDownIcon className="size-3.5 shrink-0" aria-hidden />
      </button>
     </div>
    ) : null}
   </div>
  </section>
 );
}
