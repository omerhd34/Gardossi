import { HERO_SAFE_ZONE_INSET_PERCENT } from "@/lib/admin/image-specs";

export function AdminSafeZoneOverlay({
 insetPercent = HERO_SAFE_ZONE_INSET_PERCENT,
 label = "Güvenli alan",
}) {
 const inset = `${insetPercent}%`;

 return (
  <div
   className="pointer-events-none absolute inset-0 z-5"
   aria-hidden
  >
   <div
    className="absolute rounded-sm border border-dashed border-white/70"
    style={{
     inset,
     boxShadow: "0 0 0 9999px rgb(0 0 0 / 38%)",
    }}
   >
    <span className="absolute top-1.5 left-1.5 rounded bg-black/55 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-white/95">
     {label}
    </span>
   </div>
  </div>
 );
}
