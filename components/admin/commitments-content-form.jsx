"use client";

import { useState } from "react";
import { MdAdd, MdDeleteOutline, MdSave } from "react-icons/md";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import { normalizePageHeroImages, keepPageHeroImages } from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const COMMITMENTS_HERO_UPLOAD_FOLDER = "taahhutlerimiz";

function stripContent(content) {
 return keepPageHeroImages(content);
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

function updateList(content, key, index, value) {
 const list = [...(content[key] ?? [])];
 list[index] = value;
 return { ...content, [key]: list };
}

export function CommitmentsContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 const commitmentCount = Math.max(
  form.contentTr.commitments?.length ?? 0,
  form.contentEn.commitments?.length ?? 0
 );

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 function addCommitment() {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    commitments: [...(current.contentTr.commitments ?? []), ""],
   },
   contentEn: {
    ...current.contentEn,
    commitments: [...(current.contentEn.commitments ?? []), ""],
   },
  }));
 }

 function removeCommitment(index) {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    commitments: current.contentTr.commitments.filter((_, i) => i !== index),
   },
   contentEn: {
    ...current.contentEn,
    commitments: current.contentEn.commitments.filter((_, i) => i !== index),
   },
  }));
 }

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "commitments",
     stripContent(form.contentTr),
     stripContent(form.contentEn),
     setLoading,
     "Taahhütlerimiz"
    );
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>Taahhütlerimiz</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminPageHeroImages
      content={form.contentTr}
      defaultPage="commitments"
      uploadFolder={COMMITMENTS_HERO_UPLOAD_FOLDER}
      contentKey="commitments"
      getContentTr={() => form.contentTr}
      getContentEn={() => form.contentEn}
      stripContent={stripContent}
      onFormSync={({ contentTr, contentEn }) =>
       setForm((current) => ({ ...current, contentTr, contentEn }))
      }
      uploading={uploadingHero}
      onUploadingChange={setUploadingHero}
     />

     <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
       <Label>Taahhütler</Label>
       <Button
        type="button"
        variant="outline"
        size="sm"
        className="cursor-pointer gap-1.5"
        onClick={addCommitment}
       >
        <MdAdd className="size-4" aria-hidden />
        Taahhüt ekle
       </Button>
      </div>
      {Array.from({ length: commitmentCount }).map((_, index) => (
       <div key={index} className="space-y-3 rounded-lg border border-border/60 p-4">
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
         <div className="flex flex-col gap-2">
          <Label>Taahhüt {index + 1} (TR)</Label>
          <Textarea
           rows={3}
           className="min-h-20 resize-y"
           value={form.contentTr.commitments?.[index] ?? ""}
           onChange={(e) =>
            updateLocale("contentTr", (content) =>
             updateList(content, "commitments", index, e.target.value)
            )
           }
          />
         </div>
         <div className="flex flex-col gap-2">
          <Label>Taahhüt {index + 1} (EN)</Label>
          <Textarea
           rows={3}
           className="min-h-20 resize-y"
           value={form.contentEn.commitments?.[index] ?? ""}
           onChange={(e) =>
            updateLocale("contentEn", (content) =>
             updateList(content, "commitments", index, e.target.value)
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
          onClick={() => removeCommitment(index)}
         >
          <MdDeleteOutline className="size-4" aria-hidden />
          Kaldır
         </Button>
        </div>
       </div>
      ))}
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
