"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
 MdArticle,
 MdCategory,
 MdLogout,
 MdOpenInNew,
 MdViewModule,
} from "react-icons/md";
import { AdminLogo } from "@/components/admin/admin-logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
 { href: "/admin/categories", label: "Kategoriler", icon: MdCategory },
 { href: "/admin/products", label: "Ürünler", icon: MdViewModule },
 { href: "/admin/content", label: "İçerik", icon: MdArticle },
];

export function AdminNav() {
 const pathname = usePathname();
 const router = useRouter();
 const headerRef = useRef(null);
 const navRef = useRef(null);

 useEffect(() => {
  const header = headerRef.current;
  if (!header) return;

  const syncNavHeight = () => {
   document.documentElement.style.setProperty(
    "--admin-nav-height",
    `${header.offsetHeight}px`
   );
  };

  syncNavHeight();
  const observer = new ResizeObserver(syncNavHeight);
  observer.observe(header);
  return () => observer.disconnect();
 }, []);

 useEffect(() => {
  const activeLink = navRef.current?.querySelector('[aria-current="page"]');
  activeLink?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
 }, [pathname]);

 async function handleLogout() {
  await fetch("/api/admin/auth/logout", { method: "POST" });
  router.push("/admin/login");
  router.refresh();
 }

 return (
  <header
   ref={headerRef}
   className="sticky top-0 z-50 border-b border-border/70 bg-card/90 shadow-sm backdrop-blur-md"
  >
   <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-2.5 sm:gap-3 sm:py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-4">
    <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-3 lg:justify-start">
     <div className="flex min-w-0 items-center gap-2 sm:gap-3">
      <AdminLogo height="h-7 sm:h-8" />
      <span className="hidden rounded-full border border-border/80 bg-muted/60 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:inline">
       Yönetim
      </span>
     </div>
     <div className="flex items-center gap-1.5 lg:hidden">
      <Button variant="ghost" size="sm" className="cursor-pointer" asChild>
       <Link href="/" target="_blank" aria-label="Siteyi gör">
        <MdOpenInNew />
       </Link>
      </Button>
      <Button
       variant="ghost"
       size="sm"
       className="cursor-pointer"
       onClick={handleLogout}
       aria-label="Çıkış"
      >
       <MdLogout />
      </Button>
     </div>
    </div>

    <div className="-mx-4 min-w-0 px-4 lg:mx-0 lg:px-0">
     <nav
      ref={navRef}
      aria-label="Yönetim menüsü"
      className="flex w-full items-center gap-1 overflow-x-auto rounded-xl border border-border/60 bg-background/80 p-1 scroll-smooth scrollbar-none lg:w-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden"
     >
      {links.map((link) => {
       const active = pathname.startsWith(link.href);
       const Icon = link.icon;

       return (
        <Link
         key={link.href}
         href={link.href}
         aria-current={active ? "page" : undefined}
         className={cn(
          "inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
          active
           ? "bg-primary text-primary-foreground shadow-sm"
           : "text-muted-foreground hover:bg-muted hover:text-foreground"
         )}
        >
         <Icon className="size-4 shrink-0" />
         <span>{link.label}</span>
        </Link>
       );
      })}
     </nav>
    </div>

    <div className="hidden items-center justify-end gap-2 lg:flex">
     <Button variant="outline" size="sm" className="cursor-pointer gap-2" asChild>
      <Link href="/" target="_blank">
       <MdOpenInNew className="size-4" />
       Siteyi Gör
      </Link>
     </Button>
     <Button
      size="sm"
      className="cursor-pointer gap-2 border-transparent bg-red-600 text-white hover:bg-red-800/90 hover:text-white"
      onClick={handleLogout}
     >
      <MdLogout className="size-4" />
      Çıkış
     </Button>
    </div>
   </div>
  </header>
 );
}
