/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "@/lib/icons";
import { CategoryCoverPicture } from "@/components/ui/category-cover-picture";
import { useTranslations } from "@/contexts/locale-provider";
import {
 heroMegaMenuScrollClass,
 lightMegaMenuCategoryChevronClass,
 lightMegaMenuCategoryItemClass,
 lightMegaMenuCategoryLabelActiveClass,
 lightMegaMenuCategoryLabelInactiveClass,
 lightMegaMenuCategoryThumbActiveClass,
 lightMegaMenuCategoryThumbInactiveClass,
 lightMegaMenuDividerClass,
 lightMegaMenuEyebrowClass,
 lightMegaMenuFeaturedBgClass,
 lightMegaMenuFeaturedOverlayClass,
 lightMegaMenuPanelClass,
 lightMegaMenuPanelGradientClass,
 lightMegaMenuSidebarScrollClass,
 lightMegaMenuTitleClass,
 lightMegaMenuViewAllClass,
} from "@/lib/layout/header-styles";
import { containerPremiumClass, navPressClass, productCardKalifClass } from "@/lib/layout/shared-styles";
import { getCategoryGroupCoverImage } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function ProductMenuCard({ item, onNavigate }) {
 return (
  <Link href={item.href} onClick={onNavigate} className={cn("group block h-full", navPressClass)}>
   <div
    className={cn(
     productCardKalifClass,
     "relative aspect-3/2 overflow-hidden rounded-[1.35rem] border border-white/16 shadow-[0_8px_28px_rgb(0_0_0/16%)]"
    )}
   >
    <Image
     src={item.image}
     alt={item.label}
     fill
     sizes="(max-width: 768px) 50vw, (max-width: 1280px) 28vw, 22vw"
     className="object-cover transition-transform duration-200 ease-out active:duration-75 group-hover:scale-[1.04] motion-reduce:duration-150"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/52 via-black/8 to-transparent" />
    <div className="absolute right-3 bottom-3 left-3">
     <span className="inline-flex max-w-full truncate rounded-full border border-white/22 bg-white/16 px-3 py-1 text-xs font-semibold text-white shadow-[0_4px_16px_rgb(0_0_0/22%)] backdrop-blur-md transition-[scale,background-color] duration-200 ease-out active:duration-75 group-hover:scale-[1.03] group-hover:bg-white/24 motion-reduce:duration-150">
      {item.label}
     </span>
    </div>
   </div>
  </Link>
 );
}

function handleMegaMenuWheel(event) {
 const element = event.currentTarget;
 const { scrollTop, scrollHeight, clientHeight } = element;
 const maxScroll = scrollHeight - clientHeight;
 const scrollingUp = event.deltaY < 0;
 const scrollingDown = event.deltaY > 0;

 if (
  (scrollingUp && scrollTop > 0) ||
  (scrollingDown && scrollTop < maxScroll - 1)
 ) {
  event.stopPropagation();
  return;
 }

 event.preventDefault();
 event.stopPropagation();
}

const megaMenuProductGridClass = "grid grid-cols-2 gap-2.5 md:gap-3";

const viewAllLinkClass = cn(
 "products-mega-menu-view-all inline-flex shrink-0 items-center gap-1 rounded-full border border-white/18 bg-white/10 px-3 py-1.5 text-[0.8125rem] font-semibold text-white/92 shadow-[0_4px_18px_rgb(0_0_0/12%)] backdrop-blur-sm transition-[color,background-color,border-color,scale] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-[1.03] hover:border-white/28 hover:bg-white/18 hover:text-white motion-reduce:duration-150 motion-reduce:active:scale-100",
 lightMegaMenuViewAllClass
);

function CategoryNavItem({ group, isActive, index, onSelect, menuOpen }) {
 const previewImage = getCategoryGroupCoverImage(group);

 return (
  <button
   type="button"
   onMouseEnter={() => onSelect(group.slug)}
   onFocus={() => onSelect(group.slug)}
   aria-current={isActive ? "true" : undefined}
   style={{ animationDelay: `${index * 35}ms` }}
   className={cn(
    "products-mega-menu-category flex w-full cursor-pointer items-center gap-3 rounded-2xl px-2 py-2 text-left transition-[background-color,box-shadow] duration-300 ease-out motion-reduce:transition-none md:px-2.5 md:py-2.5",
    menuOpen && "animate-[mega-menu-category-in_0.55s_cubic-bezier(0.22,1,0.36,1)_both]",
    isActive
     ? "bg-white/16 shadow-[inset_0_0_0_1px_oklch(1_0_0/22%)]"
     : "hover:bg-white/8",
    lightMegaMenuCategoryItemClass
   )}
  >
   <span
    className={cn(
     "relative size-11 shrink-0 overflow-hidden rounded-xl border shadow-[0_4px_14px_rgb(0_0_0/18%)] transition-[border-color,scale] duration-300 md:size-12",
     isActive ? "border-white/36 scale-100" : "border-white/18",
     isActive
      ? lightMegaMenuCategoryThumbActiveClass
      : lightMegaMenuCategoryThumbInactiveClass
    )}
   >
    {previewImage ? (
     <CategoryCoverPicture
      group={group}
      alt=""
      sizes="48px"
      className="object-cover"
     />
    ) : null}
    <span
     className={cn(
      "absolute inset-0 transition-opacity duration-300",
      isActive ? "bg-white/8" : "bg-black/10"
     )}
     aria-hidden
    />
   </span>
   <span
    className={cn(
     "min-w-0 flex-1 truncate text-[0.8125rem] font-medium leading-snug transition-colors duration-200 md:text-sm",
     isActive ? "font-semibold text-white" : "text-white/78",
     isActive
      ? lightMegaMenuCategoryLabelActiveClass
      : lightMegaMenuCategoryLabelInactiveClass
    )}
   >
    {group.label}
   </span>
   <ChevronRight
    className={cn(
     "size-3.5 shrink-0 text-white transition-[opacity,transform] duration-300",
     isActive ? "translate-x-0 opacity-90" : "-translate-x-0.5 opacity-0",
     lightMegaMenuCategoryChevronClass
    )}
    aria-hidden
   />
  </button>
 );
}

function ProductGrid({ items, onNavigate }) {
 return (
  <div className={megaMenuProductGridClass}>
   {items.map((item) => (
    <ProductMenuCard key={item.href} item={item} onNavigate={onNavigate} />
   ))}
  </div>
 );
}

export function ProductsMegaMenu({ open, panelRef, onClose }) {
 const { navigation, t } = useTranslations();
 const { groups } = navigation.productsMegaMenu;
 const scrollRef = useRef(null);
 const [activeSlug, setActiveSlug] = useState(groups[0]?.slug ?? null);

 const activeGroup = groups.find((group) => group.slug === activeSlug) ?? groups[0];
 const hasFeaturedImage = activeGroup
  ? Boolean(getCategoryGroupCoverImage(activeGroup))
  : false;

 useEffect(() => {
  if (!open) return;
  setActiveSlug(groups[0]?.slug ?? null);
 }, [open, groups]);

 useEffect(() => {
  if (scrollRef.current) scrollRef.current.scrollTop = 0;
 }, [activeSlug]);

 useEffect(() => {
  if (!open) return;

  const scrollElement = scrollRef.current;
  if (!scrollElement) return;

  const onWheel = (event) => handleMegaMenuWheel(event);
  const onTouchMove = (event) => {
   if (scrollRef.current?.contains(event.target)) return;
   event.preventDefault();
  };

  scrollElement.addEventListener("wheel", onWheel, { passive: false });
  document.addEventListener("touchmove", onTouchMove, { passive: false });

  return () => {
   scrollElement.removeEventListener("wheel", onWheel);
   document.removeEventListener("touchmove", onTouchMove);
  };
 }, [open]);

 return (
  <div
   data-open={open ? "true" : undefined}
   className={cn(
    "products-mega-menu-root pointer-events-none absolute inset-x-0 top-full z-50 pt-3",
    open
     ? "visible opacity-100 transition-none"
     : "invisible opacity-0 transition-opacity duration-200 ease-in"
   )}
   aria-hidden={!open}
  >
   <div className={containerPremiumClass}>
    <div
     ref={panelRef}
     className={cn(
      "products-mega-menu-panel relative overflow-hidden rounded-4xl border border-(--glass-hero-border) bg-(--glass-hero-surface)! shadow-(--glass-hero-shadow) [backdrop-filter:var(--glass-hero-blur)] [-webkit-backdrop-filter:var(--glass-hero-blur)]",
      open && "animate-[mega-menu-panel-in_0.65s_cubic-bezier(0.22,1,0.36,1)_both]",
      lightMegaMenuPanelClass
     )}
    >
     <div
      className={cn(
       "pointer-events-none absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/8",
       lightMegaMenuPanelGradientClass
      )}
      aria-hidden
     />

     <div className="relative flex h-[min(72vh,44rem)]">
      <aside
       className={cn(
        "flex h-full min-h-0 w-56 shrink-0 flex-col border-r border-white/12 md:w-60 lg:w-64",
        lightMegaMenuDividerClass
       )}
      >
       <div className="px-4 pt-5 pb-3 md:px-5 md:pt-6">
        <p
         className={cn(
          "text-[0.6875rem] font-semibold tracking-[0.14em] text-white/52 uppercase",
          lightMegaMenuEyebrowClass
         )}
        >
         {t("nav.productCategories")}
        </p>
       </div>

       <nav
        className={cn(
         "products-mega-menu-categories min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-2 pb-3 md:px-3 [scrollbar-color:oklch(1_0_0/42%)_transparent] scrollbar-thin hover:[&::-webkit-scrollbar-thumb]:bg-white/55 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/38 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1",
         lightMegaMenuSidebarScrollClass
        )}
        aria-label={t("nav.productCategories")}
       >
        {groups.map((group, index) => (
         <CategoryNavItem
          key={group.slug}
          group={group}
          index={index}
          menuOpen={open}
          isActive={group.slug === activeGroup?.slug}
          onSelect={setActiveSlug}
         />
        ))}
       </nav>

       <div
        className={cn(
         "shrink-0 border-t border-white/12 px-4 py-4 md:px-5",
         lightMegaMenuDividerClass
        )}
       >
        <Link
         href="/urunler"
         onClick={onClose}
         className={cn(viewAllLinkClass, "w-full justify-center")}
        >
         {t("categories.allProducts")}
         <ChevronRight className="size-3.5 shrink-0" aria-hidden />
        </Link>
       </div>
      </aside>

      <div
       ref={scrollRef}
       className={cn(
        "products-mega-menu-scroll relative min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain p-4 md:p-5 lg:p-6",
        "[scrollbar-color:oklch(0.62_0.01_260/0.38)_transparent] scrollbar-thin hover:[&::-webkit-scrollbar-thumb]:bg-charcoal/48 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-charcoal/32 [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1",
        heroMegaMenuScrollClass
       )}
      >
       {hasFeaturedImage ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
         <CategoryCoverPicture
          group={activeGroup}
          alt=""
          sizes="60vw"
          className={cn(
           "scale-110 object-cover opacity-28 blur-2xl saturate-125",
           lightMegaMenuFeaturedBgClass
          )}
         />
         <div
          className={cn(
           "absolute inset-0 bg-linear-to-r from-black/28 via-black/12 to-transparent",
           lightMegaMenuFeaturedOverlayClass
          )}
         />
        </div>
       ) : null}

       {activeGroup ? (
        <section
         key={activeGroup.slug}
         aria-label={activeGroup.label}
         className="relative animate-[mega-menu-content-in_0.55s_cubic-bezier(0.22,1,0.36,1)_both]"
        >
         <div className="mb-5 flex items-center justify-between gap-4 md:mb-6">
          <h3
           className={cn(
            "products-mega-menu-section-title min-w-0 font-heading text-xl font-semibold tracking-[-0.02em] text-white [text-shadow:0_2px_18px_oklch(0_0_0/35%)] md:text-2xl",
            lightMegaMenuTitleClass
           )}
          >
           {activeGroup.label}
          </h3>
          <Link href={activeGroup.href} onClick={onClose} className={viewAllLinkClass}>
           {t("categories.viewAll")}
           <ChevronRight className="size-3.5 shrink-0" aria-hidden />
          </Link>
         </div>

         <ProductGrid items={activeGroup.items} onNavigate={onClose} />
        </section>
       ) : null}
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
