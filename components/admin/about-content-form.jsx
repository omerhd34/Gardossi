"use client";

import { useState } from "react";
import { MdAdd, MdDeleteOutline, MdSave } from "react-icons/md";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import { normalizeAboutHeroImages } from "@/lib/content/about-hero-images";
import { keepPageHeroImages } from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ABOUT_HERO_UPLOAD_FOLDER = "hakkimizda";

function updateParagraphs(content, index, value) {
 const paragraphs = [...(content.paragraphs ?? [])];
 paragraphs[index] = value;
 return { ...content, paragraphs };
}

function stripLockedFields(content) {
 const { heroEyebrow, pageTitle, ...editable } = keepPageHeroImages(content);
 return editable;
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizeAboutHeroImages(initial.contentTr),
  contentEn: normalizeAboutHeroImages(initial.contentEn),
 };
}

export function AboutContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 function addParagraph() {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    paragraphs: [...(current.contentTr.paragraphs ?? []), ""],
   },
   contentEn: {
    ...current.contentEn,
    paragraphs: [...(current.contentEn.paragraphs ?? []), ""],
   },
  }));
 }

 function removeParagraph(index) {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    paragraphs: current.contentTr.paragraphs.filter((_, i) => i !== index),
   },
   contentEn: {
    ...current.contentEn,
    paragraphs: current.contentEn.paragraphs.filter((_, i) => i !== index),
   },
  }));
 }

 const paragraphCount = Math.max(
  form.contentTr.paragraphs?.length ?? 0,
  form.contentEn.paragraphs?.length ?? 0
 );

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "about",
     stripLockedFields(form.contentTr),
     stripLockedFields(form.contentEn),
     setLoading,
     "Hakkımızda"
    );
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>Hakkımızda Sayfası</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminPageHeroImages
      content={form.contentTr}
      defaultPage="about"
      uploadFolder={ABOUT_HERO_UPLOAD_FOLDER}
      contentKey="about"
      getContentTr={() => form.contentTr}
      getContentEn={() => form.contentEn}
      stripContent={stripLockedFields}
      onFormSync={({ contentTr, contentEn }) =>
       setForm((current) => ({ ...current, contentTr, contentEn }))
      }
      uploading={uploadingHero}
      onUploadingChange={setUploadingHero}
     />

     <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
       <Label>Karşılama (TR)</Label>
       <Input
        value={form.contentTr.greeting ?? ""}
        onChange={(e) =>
         updateLocale("contentTr", (content) => ({ ...content, greeting: e.target.value }))
        }
       />
      </div>
      <div className="space-y-2">
       <Label>Greeting (EN)</Label>
       <Input
        value={form.contentEn.greeting ?? ""}
        onChange={(e) =>
         updateLocale("contentEn", (content) => ({ ...content, greeting: e.target.value }))
        }
       />
      </div>
      <div className="space-y-2">
       <Label>Kapanış (TR)</Label>
       <Input
        value={form.contentTr.closing ?? ""}
        onChange={(e) =>
         updateLocale("contentTr", (content) => ({ ...content, closing: e.target.value }))
        }
       />
      </div>
      <div className="space-y-2">
       <Label>Closing (EN)</Label>
       <Input
        value={form.contentEn.closing ?? ""}
        onChange={(e) =>
         updateLocale("contentEn", (content) => ({ ...content, closing: e.target.value }))
        }
       />
      </div>
     </div>

     <div className="space-y-4">
      <Label className="text-sm font-medium">Paragraflar</Label>

      {Array.from({ length: paragraphCount }).map((_, index) => (
       <div key={index} className="space-y-3 rounded-lg border border-border/60 p-4">
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
         <div className="flex flex-col gap-2">
          <Label>Paragraf {index + 1} (TR)</Label>
          <Textarea
           rows={4}
           className="min-h-28 resize-y"
           value={form.contentTr.paragraphs?.[index] ?? ""}
           onChange={(e) =>
            updateLocale("contentTr", (content) =>
             updateParagraphs(content, index, e.target.value)
            )
           }
          />
         </div>
         <div className="flex flex-col gap-2">
          <Label>Paragraph {index + 1} (EN)</Label>
          <Textarea
           rows={4}
           className="min-h-28 resize-y"
           value={form.contentEn.paragraphs?.[index] ?? ""}
           onChange={(e) =>
            updateLocale("contentEn", (content) =>
             updateParagraphs(content, index, e.target.value)
            )
           }
          />
         </div>
        </div>
        <div className="flex justify-end border-t border-border/60 pt-3">
         <Button
          type="button"
          variant="outline"
          size="sm"
          className="cursor-pointer gap-1.5 border border-destructive/40 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => removeParagraph(index)}
         >
          <MdDeleteOutline className="size-4" aria-hidden />
          Kaldır
         </Button>
        </div>
       </div>
      ))}

      <Button
       type="button"
       variant="outline"
       size="sm"
       className="cursor-pointer gap-1.5"
       onClick={addParagraph}
      >
       <MdAdd className="size-4" aria-hidden />
       Paragraf ekle
      </Button>
     </div>
    </CardContent>
   </Card>

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
