/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { parseAdminInt } from "@/lib/admin/parse-admin-int";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function FeaturedOrderControl({
 productId,
 featuredOrder,
 className,
}) {
 const router = useRouter();
 const inputRef = useRef(null);
 const [editing, setEditing] = useState(false);
 const normalizeOrder = (value) => Math.max(1, parseAdminInt(value, 1));
 const [draft, setDraft] = useState(String(normalizeOrder(featuredOrder)));
 const [displayOrder, setDisplayOrder] = useState(normalizeOrder(featuredOrder));
 const [saving, setSaving] = useState(false);

 useEffect(() => {
  const order = normalizeOrder(featuredOrder);
  setDisplayOrder(order);
  if (!editing) {
   setDraft(String(order));
  }
 }, [featuredOrder, editing]);

 useEffect(() => {
  if (editing) {
   inputRef.current?.focus();
   inputRef.current?.select();
  }
 }, [editing]);

 function cancelEdit() {
  setDraft(String(displayOrder));
  setEditing(false);
 }

 async function saveOrder() {
  const next = Math.max(1, parseAdminInt(draft, displayOrder || 1));

  setSaving(true);
  try {
   const response = await fetch(`/api/admin/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ featuredOrder: next }),
   });
   const data = await response.json().catch(() => ({}));
   if (!response.ok) {
    throw new Error(data.error || "Kaydedilemedi.");
   }

   setDisplayOrder(data.featuredOrder ?? next);
   setDraft(String(data.featuredOrder ?? next));
   toast.success("Vitrin sırası güncellendi; ilgili ürünle yer değiştirildi.");
   router.refresh();
  } catch (error) {
   toast.error(error.message);
   setDraft(String(displayOrder));
  } finally {
   setSaving(false);
   setEditing(false);
  }
 }

 if (editing) {
  return (
   <span
    className={cn(
     "inline-flex h-5 items-stretch overflow-hidden rounded-4xl border border-border bg-background text-xs font-medium",
     className
    )}
   >
    <span className="flex items-center px-2 text-foreground">Vitrin</span>
    <Input
     ref={inputRef}
     type="number"
     min={1}
     inputMode="numeric"
     disabled={saving}
     value={draft}
     onChange={(event) => setDraft(event.target.value)}
     onBlur={() => saveOrder()}
     onKeyDown={(event) => {
      if (event.key === "Enter") {
       event.preventDefault();
       void saveOrder();
      }
      if (event.key === "Escape") {
       event.preventDefault();
       cancelEdit();
      }
     }}
     className="h-5 w-12 min-w-0 rounded-none border-0 border-l border-border px-1 py-0 text-center text-xs tabular-nums shadow-none focus-visible:ring-0"
     aria-label="Vitrin sırası"
    />
   </span>
  );
 }

 return (
  <span
   className={cn(
    "inline-flex h-5 items-stretch overflow-hidden rounded-4xl border border-border text-xs font-medium text-foreground",
    className
   )}
  >
   <span className="flex items-center px-2">Vitrin</span>
   <button
    type="button"
    onClick={() => setEditing(true)}
    className="cursor-pointer border-l border-border bg-muted/40 px-2 tabular-nums text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    aria-label={`Vitrin sırası: ${displayOrder}. Düzenlemek için tıklayın.`}
   >
    {displayOrder}
   </button>
  </span>
 );
}