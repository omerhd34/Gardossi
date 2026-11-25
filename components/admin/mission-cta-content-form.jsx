"use client";

import { useId, useState } from "react";
import { AdminContentFormHeader } from "@/components/admin/admin-content-form-header";
import { handleContentSave } from "@/components/admin/content-block-save";
import { MissionCtaFields, pickMissionCtaContent } from "@/components/admin/mission-cta-fields";
import { Card, CardContent } from "@/components/ui/card";

export function MissionCtaContentForm({ initial }) {
 const formId = useId();
 const [form, setForm] = useState(() => ({
  contentTr: pickMissionCtaContent(initial?.contentTr),
  contentEn: pickMissionCtaContent(initial?.contentEn),
 }));
 const [loading, setLoading] = useState(false);

 return (
  <div className="space-y-6">
   <AdminContentFormHeader
    formId={formId}
    title="Alt çağrı bandı"
    loading={loading}
   />
   <form
    id={formId}
    className="space-y-6"
    onSubmit={(event) => {
     event.preventDefault();
     handleContentSave(
      "missionVision",
      form.contentTr,
      form.contentEn,
      setLoading,
      "Alt çağrı bandı"
     );
    }}
   >
    <Card>
     <CardContent className="pt-6">
      <MissionCtaFields
       contentTr={form.contentTr}
       contentEn={form.contentEn}
       onChangeTr={(field, value) =>
        setForm((current) => ({
         ...current,
         contentTr: { ...current.contentTr, [field]: value },
        }))
       }
       onChangeEn={(field, value) =>
        setForm((current) => ({
         ...current,
         contentEn: { ...current.contentEn, [field]: value },
        }))
       }
      />
     </CardContent>
    </Card>
   </form>
  </div>
 );
}