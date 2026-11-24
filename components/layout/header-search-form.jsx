"use client";

import { Search, X } from "@/lib/icons";
import { useTranslations } from "@/contexts/locale-provider";
import {
 catalogSearchFieldClass,
 catalogSearchInputClass,
 catalogSearchPillClass,
 headerCompactSearchActionClass,
 headerCompactSearchFieldClass,
 headerCompactSearchInputClass,
 headerCompactSearchPillClass,
 headerCompactSearchSubmitBtnClass,
 headerCompactSearchSubmitIconClass,
 headerSearchSubmitBtnClass,
 headerSearchSubmitIconClass,
} from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";

export function HeaderSearchForm({
 query,
 onQueryChange,
 onSubmit,
 onClear,
 inputRef,
 className,
 compact = false,
}) {
 const { t } = useTranslations();

 return (
  <form
   onSubmit={onSubmit}
   className={cn(
    compact ? headerCompactSearchPillClass : catalogSearchPillClass,
    className
   )}
   role="search"
  >
   <div className={compact ? headerCompactSearchFieldClass : catalogSearchFieldClass}>
    <input
     ref={inputRef}
     type="text"
     inputMode="search"
     enterKeyHint="search"
     autoComplete="off"
     autoCorrect="off"
     spellCheck={false}
     value={query}
     onChange={(event) => onQueryChange(event.target.value)}
     placeholder={t("common.searchPlaceholder")}
     className={compact ? headerCompactSearchInputClass : catalogSearchInputClass}
     aria-label={t("common.searchLabel")}
    />
    <div className="flex shrink-0 items-center gap-0.5">
     {query ? (
      <button
       type="button"
       onClick={onClear}
       className={cn(
        "flex shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent transition-opacity duration-150 hover:opacity-65",
        compact ? cn("size-7", headerCompactSearchActionClass, "text-white/55 group-data-[home=false]/header:group-data-[hero-overlay=false]/header:text-charcoal/55") : "size-7 text-charcoal/55"
       )}
       aria-label={t("common.clearSearch")}
      >
       <X className={compact ? "size-4" : "size-4"} aria-hidden />
      </button>
     ) : null}
     <button
      type="submit"
      className={cn(
       compact
        ? cn(headerCompactSearchSubmitBtnClass, headerCompactSearchActionClass)
        : headerSearchSubmitBtnClass
      )}
      aria-label={t("common.search")}
     >
      <Search
       className={compact ? headerCompactSearchSubmitIconClass : headerSearchSubmitIconClass}
       aria-hidden
      />
     </button>
    </div>
   </div>
  </form>
 );
}
