"use client";

import Link from "next/link";
import { useState } from "react";
import {
 ChevronLeft,
 CloseIcon,
 HeroChevronRight,
 Collections,
 Explore,
 Heart,
 HeartFilled,
 HelpOutline,
 Home,
 MapPin,
 MailOutline,
 MissionVision,
 Handshake,
 CircleCheckIcon,
 ShieldCheck,
 ViewModule,
 Work,
} from "@/lib/icons";
import { useFavorites } from "@/contexts/favorites-provider";
import { BrandLogoLink } from "@/components/layout/brand-logo";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileProductsCategoryGrid } from "@/components/layout/mobile-products-category-grid";
import {
 mobileNavIconClass,
 mobileNavIconWrapClass,
 mobileNavItemClass,
 mobileNavLinkClass,
 mobileNavLinkLabelClass,
 mobileNavLinkTrailingClass,
 mobileNavProductsBackClass,
 mobileNavProductsBackBtnClass,
 mobileNavSheetCloseBtnClass,
 mobileNavSheetClosedClass,
 mobileNavSheetFooterClass,
 mobileNavSheetHeaderClass,
 mobileNavSheetLogoClass,
 mobileNavSheetOpenClass,
 mobileNavSheetOverlayClass,
 mobileNavSheetPanelClass,
 mobileNavSheetScrollClass,
} from "@/lib/layout/header-styles";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/contexts/locale-provider";
import { brandName } from "@/lib/brand";
import {
 SheetClose,
 SheetContent,
 SheetHeader,
 SheetTitle,
} from "@/components/ui/sheet";

const mobileNavIconMap = {
 home: Home,
 products: ViewModule,
 explore: Explore,
 favorites: Heart,
 collections: Collections,
 projects: Work,
 stores: MapPin,
 mission: MissionVision,
 values: Handshake,
 commitments: CircleCheckIcon,
 faq: HelpOutline,
 contact: MailOutline,
 policies: ShieldCheck,
};

function navItemKey(item) {
 return item.id ?? item.href ?? item.label;
}

function isNavItemActive(item, pathname) {
 if (!item.href) {
  return Boolean(
   item.children?.some((child) => isNavItemActive(child, pathname))
  );
 }

 if (item.href === "/") {
  return pathname === "/";
 }

 return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function MobileMenuDrawer({ pathname, onClose }) {
 const [productsViewOpen, setProductsViewOpen] = useState(false);
 const [submenuStack, setSubmenuStack] = useState([]);
 const { navigation, t } = useTranslations();
 const mobileNavSection = navigation.mobileNavSections[0];
 const mobileNavItems = mobileNavSection?.items ?? [];
 const activeSubmenu = submenuStack.at(-1) ?? null;

 const openSubmenu = (item) => {
  setSubmenuStack((stack) => [...stack, item]);
 };

 const closeSubmenu = () => {
  setSubmenuStack((stack) => stack.slice(0, -1));
 };

 const sheetTitle = productsViewOpen
  ? t("nav.productCategories")
  : activeSubmenu
   ? activeSubmenu.label
   : t("nav.mainMenuTitle", { brand: brandName });

 return (
  <SheetContent
   side="left"
   showCloseButton={false}
   overlayClassName={mobileNavSheetOverlayClass}
   className={cn(
    mobileNavSheetPanelClass,
    mobileNavSheetOpenClass,
    mobileNavSheetClosedClass,
    "mobile-nav-sheet flex flex-col overflow-hidden border-0! p-0 data-open:animate-none data-closed:animate-none sm:max-w-none!"
   )}
  >
   <SheetHeader className="sr-only">
    <SheetTitle>{sheetTitle}</SheetTitle>
   </SheetHeader>

   <div className={mobileNavSheetHeaderClass}>
    <div className={mobileNavSheetLogoClass}>
     <BrandLogoLink size="lg" />
    </div>
    <SheetClose asChild>
     <button
      type="button"
      className={mobileNavSheetCloseBtnClass}
      aria-label={t("nav.closeMenu")}
     >
      <CloseIcon className="size-5 shrink-0" strokeWidth={3.25} aria-hidden />
     </button>
    </SheetClose>
   </div>

   {productsViewOpen ? (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden pb-6 lg:pb-8">
     <div className={cn(mobileNavProductsBackClass, "w-full shrink-0")}>
      <button
       type="button"
       onClick={() => setProductsViewOpen(false)}
       className={mobileNavProductsBackBtnClass}
       aria-label={t("nav.mainMenu")}
      >
       <span className={cn(mobileNavIconWrapClass, "lg:bg-white/12")}>
        <ChevronLeft className={mobileNavIconClass} aria-hidden />
       </span>
       <ViewModule className={cn(mobileNavIconClass, "lg:hidden")} aria-hidden />
       <span>{t("nav.products")}</span>
      </button>
      <span className="min-w-0 flex-1" aria-hidden />
      <span className={cn(mobileNavLinkTrailingClass, "hidden lg:block")} aria-hidden />
     </div>

     <div className={mobileNavSheetScrollClass}>
      <MobileProductsCategoryGrid onClose={onClose} variant="drawer" />
     </div>

     <div className={mobileNavSheetFooterClass}>
      <Link
       href="/urunler"
       onClick={onClose}
       className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-white/18 bg-white/10 px-3 py-2.5 text-[0.8125rem] font-semibold text-white/92 shadow-[0_4px_18px_rgb(0_0_0/12%)] backdrop-blur-sm touch-manipulation transition-[color,background-color,border-color,scale] duration-200 ease-out active:scale-[0.98] active:duration-75 hover:scale-[1.02] hover:border-white/28 hover:bg-white/18 hover:text-white motion-reduce:duration-150 motion-reduce:active:scale-100 lg:py-2"
      >
       {t("categories.allProducts")}
       <HeroChevronRight className="size-3.5 shrink-0" strokeWidth={3.5} aria-hidden />
      </Link>
     </div>
    </div>
   ) : activeSubmenu ? (
    <MobileDrawerSubmenuView
     activeSubmenu={activeSubmenu}
     pathname={pathname}
     onClose={onClose}
     onBack={closeSubmenu}
     onOpenProductsMenu={() => setProductsViewOpen(true)}
     onOpenSubmenu={openSubmenu}
     t={t}
    />
   ) : (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
     <nav
      className={cn(
       mobileNavSheetScrollClass,
       "flex min-h-0 flex-1 flex-col lg:pt-1"
      )}
      aria-label={t("nav.mainNav")}
     >
      <ul className="flex flex-col px-0 lg:gap-1">
       {mobileNavItems.map((item) =>
        item.href === "/favoriler" ? (
         <MobileDrawerFavoritesItem
          key={navItemKey(item)}
          pathname={pathname}
          onClose={onClose}
          t={t}
         />
        ) : (
         <MobileDrawerNavItem
          key={navItemKey(item)}
          item={item}
          pathname={pathname}
          onClose={onClose}
          onOpenProductsMenu={() => setProductsViewOpen(true)}
          onOpenSubmenu={openSubmenu}
          t={t}
         />
        )
       )}
      </ul>
     </nav>

     <div className={mobileNavSheetFooterClass}>
      <LocaleSwitcher variant="mobile" />
     </div>
    </div>
   )}
  </SheetContent>
 );
}

function MobileDrawerSubmenuView({
 activeSubmenu,
 pathname,
 onClose,
 onBack,
 onOpenProductsMenu,
 onOpenSubmenu,
 t,
}) {
 const SubmenuIcon = activeSubmenu.icon
  ? mobileNavIconMap[activeSubmenu.icon]
  : null;

 return (
  <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
   <div className={cn(mobileNavProductsBackClass, "w-full shrink-0")}>
    <button
     type="button"
     onClick={onBack}
     className={mobileNavProductsBackBtnClass}
     aria-label={t("nav.mainMenu")}
    >
     <span className={cn(mobileNavIconWrapClass, "lg:bg-white/12")}>
      <ChevronLeft className={mobileNavIconClass} aria-hidden />
     </span>
     {SubmenuIcon ? (
      <SubmenuIcon
       className={cn(mobileNavIconClass, "lg:hidden")}
       aria-hidden
      />
     ) : null}
     <span>{activeSubmenu.label}</span>
    </button>
    <span className="min-w-0 flex-1" aria-hidden />
    <span className={cn(mobileNavLinkTrailingClass, "hidden lg:block")} aria-hidden />
   </div>

   <nav
    className={cn(
     mobileNavSheetScrollClass,
     "flex min-h-0 flex-1 flex-col lg:pt-1"
    )}
    aria-label={activeSubmenu.label}
   >
    <ul className="flex flex-col px-0 lg:gap-1">
     {(activeSubmenu.children ?? []).map((item) => (
      <MobileDrawerNavItem
       key={navItemKey(item)}
       item={item}
       pathname={pathname}
       onClose={onClose}
       onOpenProductsMenu={onOpenProductsMenu}
       onOpenSubmenu={onOpenSubmenu}
       t={t}
      />
     ))}
    </ul>
   </nav>

   <div className={mobileNavSheetFooterClass}>
    <LocaleSwitcher variant="mobile" />
   </div>
  </div>
 );
}

function MobileDrawerFavoritesItem({ pathname, onClose, t }) {
 const { count, hydrated } = useFavorites();
 const active =
  pathname === "/favoriler" || pathname.startsWith("/favoriler/");
 const visibleCount = hydrated ? count : 0;

 return (
  <li className={mobileNavItemClass}>
   <Link
    href="/favoriler"
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white lg:bg-white/16"
    )}
    aria-label={t("favorites.navLabel", { count: visibleCount })}
    aria-current={active ? "page" : undefined}
   >
    <span className={mobileNavIconWrapClass}>
     {visibleCount > 0 ? (
      <HeartFilled className={mobileNavIconClass} aria-hidden />
     ) : (
      <Heart className={mobileNavIconClass} aria-hidden />
     )}
    </span>
    <span className={mobileNavLinkLabelClass}>{t("nav.favorites")}</span>
    <span className={mobileNavLinkTrailingClass} aria-hidden />
   </Link>
  </li>
 );
}

function MobileDrawerNavItem({
 item,
 pathname,
 onClose,
 onOpenProductsMenu,
 onOpenSubmenu,
 t,
}) {
 const active = isNavItemActive(item, pathname);
 const isProductsMenu = item.megaMenu === "products";
 const hasChildren = Boolean(item.children?.length);
 const Icon = item.icon ? mobileNavIconMap[item.icon] : null;

 if (isProductsMenu || hasChildren) {
  return (
   <li className={mobileNavItemClass}>
    <button
     type="button"
     onClick={() => {
      if (isProductsMenu) {
       onOpenProductsMenu();
       return;
      }
      onOpenSubmenu(item);
     }}
     className={cn(
      mobileNavLinkClass,
      "group",
      active && "font-semibold text-white lg:bg-white/16"
     )}
     aria-label={
      isProductsMenu
       ? t("nav.openProductCategories")
       : item.id === "corporate"
        ? t("nav.openCorporateMenu")
        : t("nav.openSubmenu", { label: item.label })
     }
     aria-expanded={false}
     aria-haspopup="true"
    >
     {Icon ? (
      <span className={mobileNavIconWrapClass}>
       <Icon className={mobileNavIconClass} aria-hidden />
      </span>
     ) : null}
     <span className={mobileNavLinkLabelClass}>{item.label}</span>
     <HeroChevronRight
      className={cn(
       mobileNavLinkTrailingClass,
       "text-white/72 transition-colors duration-200 group-hover:text-white/92"
      )}
      strokeWidth={3.5}
      aria-hidden
     />
    </button>
   </li>
  );
 }

 return (
  <li className={mobileNavItemClass}>
   <Link
    href={item.href}
    onClick={onClose}
    className={cn(
     mobileNavLinkClass,
     "group",
     active && "font-semibold text-white lg:bg-white/16"
    )}
    aria-current={active ? "page" : undefined}
   >
    {Icon ? (
     <span className={mobileNavIconWrapClass}>
      <Icon className={mobileNavIconClass} aria-hidden />
     </span>
    ) : null}
    <span className={mobileNavLinkLabelClass}>{item.label}</span>
    <span className={mobileNavLinkTrailingClass} aria-hidden />
   </Link>
  </li>
 );
}
