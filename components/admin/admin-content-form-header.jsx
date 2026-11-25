"use client";

import Link from "next/link";
import { LuArrowUpLeft } from "react-icons/lu";
import { MdSave } from "react-icons/md";
import { AdminEditStickyToolbar } from "@/components/admin/admin-edit-sticky-toolbar";
import { Button } from "@/components/ui/button";

export const adminContentToolbarButtonClass = "cursor-pointer gap-2";

export const adminContentBackButtonClass =
 "gap-2 border-green-600 bg-green-600 text-white shadow-sm hover:border-green-700 hover:bg-green-700 hover:text-white";

export function AdminContentBackLink() {
 return (
  <Button className={`${adminContentToolbarButtonClass} ${adminContentBackButtonClass}`} asChild>
   <Link href="/admin/content">
    <LuArrowUpLeft className="size-4" aria-hidden />
    Geri
   </Link>
  </Button>
 );
}

export function AdminContentStickyToolbar({ title, actions }) {
 return (
  <AdminEditStickyToolbar className="items-center">
   <div className="min-w-0 flex-1">
    <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
   </div>
   {actions ? (
    <div className="flex flex-wrap items-center justify-end gap-2">{actions}</div>
   ) : null}
  </AdminEditStickyToolbar>
 );
}

export function AdminContentFormHeader({
 title,
 formId,
 loading = false,
 submitDisabled = false,
}) {
 return (
  <AdminContentStickyToolbar
   title={title}
   actions={
    <>
     <AdminContentBackLink />
     <Button
      type="submit"
      form={formId}
      className={adminContentToolbarButtonClass}
      disabled={loading || submitDisabled}
     >
      {!loading ? <MdSave className="size-4" aria-hidden /> : null}
      {loading ? "Kaydediliyor..." : "Kaydet"}
     </Button>
    </>
   }
  />
 );
}