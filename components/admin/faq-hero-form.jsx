"use client";

import { useId, useState } from "react";
import { AdminContentFormHeader } from "@/components/admin/admin-content-form-header";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import {
 keepPageHeroImages,
 normalizePageHeroImages,
} from "@/lib/content/page-hero-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FAQ_HERO_UPLOAD_FOLDER = "sss";

function stripFaqFields(content) {
 return {
  ...keepPageHeroImages(content),
  intro: content.intro ?? "",
 };
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

export function FaqHeroForm({ initial }) {
 const formId = useId();
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [uploadingHero, setUploadingHero] = useState(false);
 const [loading, setLoading] = useState(false);

 function syncForm({ contentTr, contentEn }) {
  setForm((current) => ({ ...current, contentTr, contentEn }));
 }

 function updateIntro(locale, value) {
  setForm((current) => ({
   ...current,
   [locale]: { ...current[locale], intro: value },
  }));
 }

 return (
  <div className="space-y-6">
   <form
    id={formId}
    className="space-y-6"
    onSubmit={(event) => {
     event.preventDefault();
     handleContentSave(
      "faq",
      stripFaqFields(form.contentTr),
      stripFaqFields(form.contentEn),
      setLoading,
      "SSS giriş metni"
     );
    }}
   >
    <AdminContentFormHeader
     formId={formId}
     title="Sıkça Sorulan Sorular Sayfası"
     loading={loading}
     submitDisabled={uploadingHero}
    />

    <Card>
     <CardHeader>
      <CardTitle>Giriş metni</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
       Başlık görselinin altında, iletişim simgelerinin üstünde görünen açıklama.
      </p>
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
       <div className="flex flex-col gap-2">
        <Label>Metin (TR)</Label>
        <Textarea
         rows={3}
         className="min-h-24 resize-y"
         value={form.contentTr.intro ?? ""}
         onChange={(e) => updateIntro("contentTr", e.target.value)}
         required
        />
       </div>
       <div className="flex flex-col gap-2">
        <Label>Metin (EN)</Label>
        <Textarea
         rows={3}
         className="min-h-24 resize-y"
         value={form.contentEn.intro ?? ""}
         onChange={(e) => updateIntro("contentEn", e.target.value)}
         required
        />
       </div>
      </div>
     </CardContent>
    </Card>
   </form>

   <Card>
    <CardHeader>
     <CardTitle>SSS başlık görseli</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminPageHeroImages
      content={form.contentTr}
      defaultPage="faq"
      uploadFolder={FAQ_HERO_UPLOAD_FOLDER}
      contentKey="faq"
      getContentTr={() => form.contentTr}
      getContentEn={() => form.contentEn}
      stripContent={stripFaqFields}
      onFormSync={syncForm}
      uploading={uploadingHero}
      onUploadingChange={setUploadingHero}
     />
    </CardContent>
   </Card>
  </div>
 );
}