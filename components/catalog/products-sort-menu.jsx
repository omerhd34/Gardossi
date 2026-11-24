"use client";

import { useMemo, useState } from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, CloseIcon } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import { getSortOptions } from "@/lib/i18n/catalog";
import { cn } from "@/lib/utils";

const sortMenuHoverClass =
 "scale-100 transition-[scale,background-color,color] duration-200 ease-out active:duration-75 motion-reduce:duration-150";

export function ProductsSortMenu({
 sort,
 onSortChange,
 sortOptions: sortOptionsProp,
}) {
 const { t, dictionary } = useTranslations();
 const [open, setOpen] = useState(false);
 const sortOptions = useMemo(
  () => sortOptionsProp ?? getSortOptions(dictionary),
  [dictionary, sortOptionsProp]
 );
 return (
  <div className="shrink-0 lg:self-auto">
   <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
    <DropdownMenuTrigger asChild>
     <button
      type="button"
      aria-label={t("catalog.sortOptions")}
      aria-expanded={open}
      className={cn(
       "flex h-11 min-w-0 cursor-pointer items-center justify-between gap-2 rounded-full border border-charcoal/12 bg-white py-0 pr-3 pl-3.5 text-sm font-medium text-charcoal shadow-[0_1px_2px_rgb(0_0_0/4%)] outline-none transition hover:border-charcoal/20 hover:shadow-[0_2px_8px_rgb(0_0_0/6%)] focus-visible:border-charcoal/25 focus-visible:ring-2 focus-visible:ring-charcoal/10 data-[state=open]:border-charcoal/20 data-[state=open]:shadow-[0_4px_16px_rgb(0_0_0/8%)] lg:h-14 lg:min-w-38 lg:gap-3 lg:pr-3.5 lg:pl-4 lg:text-base ultra:h-15 ultra:min-w-44 ultra:gap-3.5 ultra:px-5 ultra:text-lg tv:h-16 tv:min-w-48 tv:gap-4 tv:px-6 tv:text-xl"
      )}
     >
      <span>{t("catalog.sort")}</span>
      <ChevronDownIcon
       className={cn(
        "size-4 shrink-0 text-charcoal/65 transition-transform duration-200 lg:size-4.5 ultra:size-5 tv:size-6",
        open && "rotate-180"
       )}
       aria-hidden
      />
     </button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
     align="end"
     sideOffset={10}
     className="w-[min(19rem,calc(100vw-2rem))]! min-w-76 overflow-hidden rounded-2xl border border-charcoal/8 bg-white p-0 text-charcoal shadow-[0_8px_32px_rgb(0_0_0/12%)] ring-0 lg:w-[min(20rem,calc(100vw-2rem))]! lg:min-w-80 lg:rounded-[1.25rem] ultra:w-[24rem]! ultra:min-w-[24rem] ultra:rounded-3xl ultra:shadow-[0_12px_48px_rgb(0_0_0/14%)] tv:w-md! tv:min-w-md"
    >
     <div className="flex items-center justify-between px-5 py-4 lg:px-6 lg:py-5 ultra:px-7 ultra:py-6 tv:px-8 tv:py-7">
      <p
       className={cn(
        "origin-left text-base font-semibold text-charcoal lg:text-lg ultra:text-xl tv:text-2xl",
        sortMenuHoverClass,
        "hover:scale-105"
       )}
      >
       {t("catalog.sort")}
      </p>
      <button
       type="button"
       onClick={() => setOpen(false)}
       className={cn(
        "flex size-8 scale-100 cursor-pointer items-center justify-center rounded-full text-charcoal/55 lg:size-9 ultra:size-10 tv:size-11",
        sortMenuHoverClass,
        "hover:scale-110 hover:bg-charcoal/6 hover:text-charcoal"
       )}
       aria-label={t("catalog.closeSort")}
      >
       <CloseIcon
        className="size-5 stroke-[1.75] lg:size-5.5 ultra:size-6 tv:size-7"
        aria-hidden
       />
      </button>
     </div>

     <div className="border-t border-charcoal/8" />

     <div className="space-y-1 px-3 py-3 lg:space-y-1.5 lg:px-4 lg:py-4 ultra:space-y-2 ultra:px-5 ultra:py-5 tv:space-y-2.5 tv:px-6 tv:py-6">
      {sortOptions.map((option) => {
       const active = sort === option.value;

       return (
        <DropdownMenuItem
         key={option.value}
         onSelect={() => {
          onSortChange(option.value);
          setOpen(false);
         }}
         className={cn(
          sortMenuHoverClass,
          "origin-left cursor-pointer rounded-xl px-3 py-3 text-left text-sm leading-snug text-charcoal/75 hover:scale-[1.03] focus:bg-charcoal/6 focus:text-charcoal lg:rounded-2xl lg:px-4 lg:py-3.5 lg:text-base ultra:px-5 ultra:py-4 ultra:text-lg ultra:leading-normal tv:px-6 tv:py-5 tv:text-xl",
          active && "bg-charcoal/6 font-semibold text-charcoal"
         )}
        >
         {option.label}
        </DropdownMenuItem>
       );
      })}
     </div>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 );
}
