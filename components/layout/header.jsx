/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

const HeaderSearchBar = dynamic(() =>
 import("@/components/layout/header-search-bar").then(
  (module) => module.HeaderSearchBar
 )
);

const LOGO_LIGHT_ZONE_SELECTORS =
 ".hero-carousel, .page-header-bleed, .faq-hero, .mission-hero, .about-hero, .header-logo-light-zone";

const HEADER_DIVIDER_EXCLUDED_PATHS = new Set([
 "/",
 "/hakkimizda",
 "/misyon-vizyon",
 "/degerlerimiz",
 "/taahhutlerimiz",
 "/sss",
]);

function getHeaderHideThreshold() {
 const header = document.querySelector(".site-header");
 const headerHeight = header
  ? Math.ceil(header.getBoundingClientRect().height)
  : 0;

 return Math.max(80, headerHeight + 16);
}

function isLogoOverImageZone() {
 const zones = document.querySelectorAll(LOGO_LIGHT_ZONE_SELECTORS);
 if (zones.length === 0) return false;

 const logos = document.querySelectorAll(".site-header .brand-logo-image");
 let logo = null;

 for (const candidate of logos) {
  const rect = candidate.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
   logo = candidate;
   break;
  }
 }

 if (!logo) return true;

 const logoRect = logo.getBoundingClientRect();
 const logoCenterX = logoRect.left + logoRect.width / 2;
 const logoCenterY = logoRect.top + logoRect.height / 2;

 for (const zone of zones) {
  const zoneRect = zone.getBoundingClientRect();
  const overlapsZone =
   logoCenterX >= zoneRect.left &&
   logoCenterX <= zoneRect.right &&
   logoCenterY >= zoneRect.top &&
   logoCenterY <= zoneRect.bottom;

  if (overlapsZone) return true;
 }

 return false;
}

export function Header() {
 const pathname = usePathname();
 const [scrolled, setScrolled] = useState(false);
 const [heroOverlay, setHeroOverlay] = useState(undefined);
 const [searchOpen, setSearchOpen] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [submittedQuery, setSubmittedQuery] = useState("");

 const isHome = pathname === "/";
 const showHeaderDivider = !HEADER_DIVIDER_EXCLUDED_PATHS.has(pathname);
 const isProductsPage =
  pathname === "/urunler" || pathname.startsWith("/urunler/");
 const headerHidden =
  scrolled && !searchOpen && !menuOpen && !submittedQuery;

 const clearSearch = useCallback(() => {
  setSearchQuery("");
  setSubmittedQuery("");
 }, []);

 const closeSearch = useCallback(() => {
  setSearchOpen(false);
  clearSearch();
 }, [clearSearch]);

 const toggleSearch = () => {
  setSearchOpen((prev) => {
   const next = !prev;
   if (!next) clearSearch();
   return next;
  });
 };

 const handleSearchSubmit = (event) => {
  event.preventDefault();
  setSubmittedQuery(searchQuery.trim());
 };

 useLayoutEffect(() => {
  setScrolled(false);

  if (!isHome) return;

  const resetScroll = () => {
   window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  resetScroll();
  requestAnimationFrame(resetScroll);
 }, [isHome, pathname]);

 useEffect(() => {
  const onScroll = () => {
   const next = window.scrollY > getHeaderHideThreshold();
   setScrolled(next);
   if (next) {
    setMenuOpen(false);
   }
  };

  const onPageShow = (event) => {
   if (!event.persisted) return;
   if (isHome) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    setScrolled(false);
    return;
   }
   onScroll();
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pageshow", onPageShow);

  return () => {
   window.removeEventListener("scroll", onScroll);
   window.removeEventListener("pageshow", onPageShow);
  };
 }, [isHome, pathname]);

 useLayoutEffect(() => {
  if (isProductsPage) {
   setHeroOverlay(false);
   return;
  }

  const updateHeroOverlay = () => {
   const zones = document.querySelectorAll(LOGO_LIGHT_ZONE_SELECTORS);
   if (zones.length === 0) {
    setHeroOverlay(false);
    return;
   }
   setHeroOverlay(isLogoOverImageZone());
  };

  updateHeroOverlay();

  window.addEventListener("scroll", updateHeroOverlay, { passive: true });
  window.addEventListener("resize", updateHeroOverlay);

  const zones = document.querySelectorAll(LOGO_LIGHT_ZONE_SELECTORS);
  const zoneObserver = new ResizeObserver(updateHeroOverlay);
  zones.forEach((zone) => zoneObserver.observe(zone));

  const header = document.querySelector(".site-header");
  const headerObserver = header ? new ResizeObserver(updateHeroOverlay) : null;
  headerObserver?.observe(header);

  return () => {
   window.removeEventListener("scroll", updateHeroOverlay);
   window.removeEventListener("resize", updateHeroOverlay);
   zoneObserver.disconnect();
   headerObserver?.disconnect();
  };
 }, [pathname, isProductsPage]);

 useEffect(() => {
  setSearchOpen(false);
  setMenuOpen(false);
  clearSearch();
 }, [pathname, clearSearch]);

 useEffect(() => {
  if (!searchOpen && !submittedQuery) return;

  const onKeyDown = (event) => {
   if (event.key !== "Escape") return;
   closeSearch();
  };

  window.addEventListener("keydown", onKeyDown);
  return () => window.removeEventListener("keydown", onKeyDown);
 }, [searchOpen, submittedQuery, closeSearch]);

 return (
  <header
   data-home={isHome ? "true" : "false"}
   data-hero-overlay={heroOverlay ? "true" : "false"}
   data-search-open={searchOpen || submittedQuery ? "true" : "false"}
   data-menu-open={menuOpen || searchOpen || submittedQuery ? "true" : "false"}
   data-hidden={headerHidden ? "true" : "false"}
   className={cn(
    "site-header group/header pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent transition-[transform,opacity,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out [&_.header-search-shell]:pointer-events-auto **:[[role=search]]:pointer-events-auto [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_form]:pointer-events-auto [&_input]:pointer-events-auto",
    showHeaderDivider &&
    !heroOverlay &&
    "border-b border-border/70 bg-white shadow-sm",
    headerHidden && "pointer-events-none -translate-y-full opacity-0"
   )}
  >
   <div className="relative">
    <Navbar
     searchOpen={searchOpen}
     menuOpen={menuOpen}
     onMenuOpenChange={setMenuOpen}
     onSearchToggle={toggleSearch}
     onSearchClose={closeSearch}
     searchQuery={searchQuery}
     onSearchQueryChange={setSearchQuery}
     onSearchSubmit={handleSearchSubmit}
     onSearchClear={clearSearch}
    />
    {searchOpen || submittedQuery ? (
     <HeaderSearchBar
      open={searchOpen}
      onClose={closeSearch}
      inline
      query={searchQuery}
      onQueryChange={setSearchQuery}
      submittedQuery={submittedQuery}
      onSubmittedQueryChange={setSubmittedQuery}
      onClear={clearSearch}
     />
    ) : null}
   </div>
  </header>
 );
}
