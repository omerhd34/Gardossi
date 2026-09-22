"use client";

import { useState } from "react";
import { MdAdd, MdDeleteOutline, MdSave } from "react-icons/md";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import { normalizePageHeroImages, keepPageHeroImages } from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DynamicReactIcon } from "@/components/ui/dynamic-react-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { REACT_ICONS_URL } from "@/lib/react-icon-resolver";

const VALUES_HERO_UPLOAD_FOLDER = "degerlerimiz";
const DEFAULT_VALUE_ICON = "MdVerifiedUser";

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

export function ValuesContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);

 const valueCount = Math.max(
  form.contentTr.values?.length ?? 0,
  form.contentEn.values?.length ?? 0
 );

 function addValue() {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    values: [
     ...(current.contentTr.values ?? []),
     { icon: DEFAULT_VALUE_ICON, title: "", description: "" },
    ],
   },
   contentEn: {
    ...current.contentEn,
    values: [
     ...(current.contentEn.values ?? []),
     { icon: DEFAULT_VALUE_ICON, title: "", description: "" },
    ],
   },
  }));
 }

 function removeValue(index) {
  setForm((current) => ({
   contentTr: {
    ...current.contentTr,
    values: current.contentTr.values.filter((_, i) => i !== index),
   },
   contentEn: {
    ...current.contentEn,
    values: current.contentEn.values.filter((_, i) => i !== index),
   },
  }));
 }

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "values",
     stripContent(form.contentTr),
     stripContent(form.contentEn),
     setLoading,
     "Değerlerimiz"
    );
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>Değerlerimiz</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
     <AdminPageHeroImages
      content={form.contentTr}
      defaultPage="values"
      uploadFolder={VALUES_HERO_UPLOAD_FOLDER}
      contentKey="values"
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
       <Label>Değerler</Label>
       <Button
        type="button"
        variant="outline"
        size="sm"
        className="cursor-pointer gap-1.5"
        onClick={addValue}
       >
        <MdAdd className="size-4" aria-hidden />
        Değer ekle
       </Button>
      </div>
      <p className="text-xs text-muted-foreground">
       İkon adını{" "}
       <a
        href={REACT_ICONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer font-medium text-foreground underline underline-offset-2 hover:text-primary"
       >
        react-icons
       </a>{" "}
       sitesinden kopyalayın.
      </p>
      {Array.from({ length: valueCount }).map((_, index) => (
       <div key={index} className="space-y-3 rounded-lg border border-border/60 p-4">
        <div className="space-y-2">
         <Label>İkon</Label>
         <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/40">
           <DynamicReactIcon
            name={form.contentTr.values?.[index]?.icon}
            className="size-5 text-charcoal/70"
           />
          </div>
          <Input
           className="font-mono text-sm"
           placeholder="MdVerifiedUser"
           value={form.contentTr.values?.[index]?.icon ?? ""}
           onChange={(e) => {
            const icon = e.target.value;
            setForm((current) => ({
             contentTr: {
              ...current.contentTr,
              values: current.contentTr.values.map((value, i) =>
               i === index ? { ...value, icon } : value
              ),
             },
             contentEn: {
              ...current.contentEn,
              values: current.contentEn.values.map((value, i) =>
               i === index ? { ...value, icon } : value
              ),
             },
            }));
           }}
          />
         </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:items-start">
         <div className="flex flex-col gap-2">
          <Label>Değer başlığı (TR)</Label>
          <Input
           value={form.contentTr.values?.[index]?.title ?? ""}
           onChange={(e) =>
            setForm((current) => ({
             ...current,
             contentTr: {
              ...current.contentTr,
              values: current.contentTr.values.map((value, i) =>
               i === index ? { ...value, title: e.target.value } : value
              ),
             },
            }))
           }
          />
          <Label>Açıklama (TR)</Label>
          <Textarea
           rows={3}
           className="min-h-24 resize-y"
           value={form.contentTr.values?.[index]?.description ?? ""}
           onChange={(e) =>
            setForm((current) => ({
             ...current,
             contentTr: {
              ...current.contentTr,
              values: current.contentTr.values.map((value, i) =>
               i === index ? { ...value, description: e.target.value } : value
              ),
             },
            }))
           }
          />
         </div>
         <div className="flex flex-col gap-2">
          <Label>Değer başlığı (EN)</Label>
          <Input
           value={form.contentEn.values?.[index]?.title ?? ""}
           onChange={(e) =>
            setForm((current) => ({
             ...current,
             contentEn: {
              ...current.contentEn,
              values: current.contentEn.values.map((value, i) =>
               i === index ? { ...value, title: e.target.value } : value
              ),
             },
            }))
           }
          />
          <Label>Açıklama (EN)</Label>
          <Textarea
           rows={3}
           className="min-h-24 resize-y"
           value={form.contentEn.values?.[index]?.description ?? ""}
           onChange={(e) =>
            setForm((current) => ({
             ...current,
             contentEn: {
              ...current.contentEn,
              values: current.contentEn.values.map((value, i) =>
               i === index ? { ...value, description: e.target.value } : value
              ),
             },
            }))
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
          onClick={() => removeValue(index)}
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
