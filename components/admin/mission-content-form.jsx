"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import { normalizePageHeroImages, keepPageHeroImages } from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MISSION_HERO_UPLOAD_FOLDER = "misyon-vizyon";

const LOCKED_FIELDS = [
 "heroEyebrow",
 "pageTitle",
 "missionTitle",
 "visionTitle",
 "valuesTitle",
 "commitmentsTitle",
 "ctaTitle",
 "ctaDescription",
 "ctaProducts",
 "ctaContact",
 "values",
 "commitments",
 "intro",
];

function stripLockedFields(content) {
 const editable = keepPageHeroImages(content);
 for (const field of LOCKED_FIELDS) {
  delete editable[field];
 }
 return editable;
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

export function MissionContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "missionVision",
     stripLockedFields(form.contentTr),
     stripLockedFields(form.contentEn),
     setLoading,
     "Misyon & Vizyon"
    );
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>Misyon & Vizyon</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminPageHeroImages
      content={form.contentTr}
      defaultPage="missionVision"
      uploadFolder={MISSION_HERO_UPLOAD_FOLDER}
      contentKey="missionVision"
      getContentTr={() => form.contentTr}
      getContentEn={() => form.contentEn}
      stripContent={stripLockedFields}
      onFormSync={({ contentTr, contentEn }) =>
       setForm((current) => ({ ...current, contentTr, contentEn }))
      }
      uploading={uploadingHero}
      onUploadingChange={setUploadingHero}
     />

     {[
      ["missionText", "Misyon metni"],
      ["visionText", "Vizyon metni"],
     ].map(([field, label]) => (
      <div key={field} className="grid gap-4 md:grid-cols-2 md:items-start">
       <div className="flex flex-col gap-2">
        <Label>{label} (TR)</Label>
        <Textarea
         rows={4}
         className="min-h-28 resize-y"
         value={form.contentTr[field] ?? ""}
         onChange={(e) =>
          updateLocale("contentTr", (content) => ({ ...content, [field]: e.target.value }))
         }
        />
       </div>
       <div className="flex flex-col gap-2">
        <Label>{label} (EN)</Label>
        <Textarea
         rows={4}
         className="min-h-28 resize-y"
         value={form.contentEn[field] ?? ""}
         onChange={(e) =>
          updateLocale("contentEn", (content) => ({ ...content, [field]: e.target.value }))
         }
        />
       </div>
      </div>
     ))}
    </CardContent>
   </Card>

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
