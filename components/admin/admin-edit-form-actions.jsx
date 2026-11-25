"use client";

import { MdSave } from "react-icons/md";
import { DeleteButton } from "@/components/admin/delete-button";
import { Button } from "@/components/ui/button";

export function AdminEditFormActions({
 formId,
 deleteHref,
 deleteTitle = "Silmek istediğinize emin misiniz?",
 deleteDescription = "Bu işlem geri alınamaz.",
 deleteRedirect,
 submitLabel = "Kaydet",
}) {
 return (
  <>
   <DeleteButton
    href={deleteHref}
    confirmTitle={deleteTitle}
    confirmDescription={deleteDescription}
    redirectTo={deleteRedirect}
    iconOnly={false}
   />
   <Button type="submit" form={formId} className="cursor-pointer gap-2">
    <MdSave className="size-4" aria-hidden />
    {submitLabel}
   </Button>
  </>
 );
}