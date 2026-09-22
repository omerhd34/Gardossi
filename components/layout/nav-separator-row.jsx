import Link from "next/link";
import { Fragment } from "react";
import { navPressClass } from "@/lib/layout/shared-styles";
import { cn } from "@/lib/utils";

export function NavSeparatorRow({ items, variant = "secondary", pathname }) {
 return (
  <nav
   className="flex flex-wrap items-center justify-center"
   aria-label={variant === "secondary" ? "Kurumsal menü" : "Ana menü"}
  >
   {items.map((item, index) => (
    <Fragment key={item.href}>
     {index > 0 && (
      <span
       className="text-white/25 select-none px-2.5 text-[10px] md:px-3"
       aria-hidden
      >
       |
      </span>
     )}
     <Link
      href={item.href}
      data-active={
       pathname === item.href || pathname.startsWith(`${item.href}/`)
        ? "true"
        : undefined
      }
      className={cn(
       "nav-menu-link font-display transition-[colors,transform] hover:text-white",
       navPressClass,
       variant === "secondary" &&
       "text-[0.6rem] font-normal tracking-[0.22em] uppercase md:text-[0.65rem]",
       variant === "primary" &&
       "text-[13px] font-normal tracking-[0.18em] uppercase",
       pathname === item.href || pathname.startsWith(`${item.href}/`)
        ? "text-white"
        : variant === "secondary"
          ? "text-white/75"
          : "text-white/85"
      )}
     >
      {item.label}
     </Link>
    </Fragment>
   ))}
  </nav>
 );
}
