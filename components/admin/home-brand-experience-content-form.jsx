"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import {
 keepPageHeroImages,
 normalizePageHeroImages,
} from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const HOME_BRAND_EXPERIENCE_UPLOAD_FOLDER = "anasayfa-marka-banner";

export function stripBrandLockedFields(content) {
 return keepPageHeroImages(content);
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

function updateTitleLine(content, index, value) {
 const lines = [...(content.brandExperienceTitleLines ?? ["", "", ""])];
 lines[index] = value;
 return { ...content, brandExperienceTitleLines: lines };
}

export function HomeBrandExperienceFields({
 form,
 setForm,
 uploadingHero,
 setUploadingHero,
}) {
 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle>Marka Deneyimi Afişi</CardTitle>
   </CardHeader>
   <CardContent className="space-y-6">
    <AdminPageHeroImages
     content={form.contentTr}
     defaultPage="homeBrandExperience"
     uploadFolder={HOME_BRAND_EXPERIENCE_UPLOAD_FOLDER}
     contentKey="homeBrandExperience"
     getContentTr={() => form.contentTr}
     getContentEn={() => form.contentEn}
     stripContent={stripBrandLockedFields}
     onFormSync={({ contentTr, contentEn }) =>
      setForm((current) => ({ ...current, contentTr, contentEn }))
     }
     uploading={uploadingHero}
     onUploadingChange={setUploadingHero}
    />

    <div className="grid gap-4 md:grid-cols-2">
     <div className="space-y-2">
      <Label>Görsel alt metni (TR)</Label>
      <Input
       value={form.contentTr.brandExperienceAlt ?? ""}
       onChange={(e) =>
        updateLocale("contentTr", (content) => ({
         ...content,
         brandExperienceAlt: e.target.value,
        }))
       }
      />
     </div>
     <div className="space-y-2">
      <Label>Image alt text (EN)</Label>
      <Input
       value={form.contentEn.brandExperienceAlt ?? ""}
       onChange={(e) =>
        updateLocale("contentEn", (content) => ({
         ...content,
         brandExperienceAlt: e.target.value,
        }))
       }
      />
     </div>
    </div>

    <div className="space-y-4">
     <Label className="text-sm font-medium">Başlık satırları</Label>
     {[0, 1, 2].map((index) => (
      <div
       key={index}
       className="grid gap-4 rounded-lg border border-border/60 p-4 md:grid-cols-2"
      >
       <div className="space-y-2">
        <Label>Satır {index + 1} (TR)</Label>
        <Input
         value={form.contentTr.brandExperienceTitleLines?.[index] ?? ""}
         onChange={(e) =>
          updateLocale("contentTr", (content) =>
           updateTitleLine(content, index, e.target.value)
          )
         }
        />
       </div>
       <div className="space-y-2">
        <Label>Line {index + 1} (EN)</Label>
        <Input
         value={form.contentEn.brandExperienceTitleLines?.[index] ?? ""}
         onChange={(e) =>
          updateLocale("contentEn", (content) =>
           updateTitleLine(content, index, e.target.value)
          )
         }
        />
       </div>
      </div>
     ))}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
     <div className="space-y-2">
      <Label>Açıklama (TR)</Label>
      <Textarea
       rows={4}
       className="min-h-28 resize-y"
       value={form.contentTr.brandExperienceDescription ?? ""}
       onChange={(e) =>
        updateLocale("contentTr", (content) => ({
         ...content,
         brandExperienceDescription: e.target.value,
        }))
       }
      />
     </div>
     <div className="space-y-2">
      <Label>Description (EN)</Label>
      <Textarea
       rows={4}
       className="min-h-28 resize-y"
       value={form.contentEn.brandExperienceDescription ?? ""}
       onChange={(e) =>
        updateLocale("contentEn", (content) => ({
         ...content,
         brandExperienceDescription: e.target.value,
        }))
       }
      />
     </div>
    </div>
   </CardContent>
  </Card>
 );
}

export function HomeBrandExperienceContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "homeBrandExperience",
     stripBrandLockedFields(form.contentTr),
     stripBrandLockedFields(form.contentEn),
     setLoading,
     "Anasayfa marka banner"
    );
   }}
  >
   <HomeBrandExperienceFields
    form={form}
    setForm={setForm}
    uploadingHero={uploadingHero}
    setUploadingHero={setUploadingHero}
   />

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
