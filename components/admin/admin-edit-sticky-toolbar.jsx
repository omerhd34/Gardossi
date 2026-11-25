import { cn } from "@/lib/utils";

export function AdminEditStickyToolbar({ children, className }) {
 return (
  <div
   className={cn(
    "sticky top-(--admin-nav-height) z-40 flex w-full min-w-0 flex-wrap items-center justify-between gap-3 rounded-xl bg-card px-4 py-3 text-sm text-card-foreground ring-1 ring-foreground/10 shadow-sm",
    className
   )}
  >
   {children}
  </div>
 );
}