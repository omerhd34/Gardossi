"use client";

import { useId, useState } from "react";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { AdminContentFormHeader } from "@/components/admin/admin-content-form-header";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import { handleContentSave } from "@/components/admin/content-block-save";
import { normalizeAboutHeroImages } from "@/lib/content/about-hero-images";
import { keepPageHeroImages } from "@/lib/content/page-hero-images";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

function paragraphAccordionId(index) {
 return `paragraph-${index}`;
}

function shiftOpenParagraphs(openValues, removedIndex) {
 return openValues
  .filter((value) => value !== paragraphAccordionId(removedIndex))
  .map((value) => {
   const index = Number(value.replace("paragraph-", ""));
   return index > removedIndex ? paragraphAccordionId(index - 1) : value;
  });
}

export function AboutContentForm({ initial, title = "Hakkımızda Sayfası" }) {
 const formId = useId();
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingHero, setUploadingHero] = useState(false);
 const [openParagraphs, setOpenParagraphs] = useState(() => {
  const count = Math.max(
   initial.contentTr?.paragraphs?.length ?? 0,
   initial.contentEn?.paragraphs?.length ?? 0
  );
  return count > 0 ? [paragraphAccordionId(0)] : [];
 });

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 function addParagraph() {
  const nextIndex = Math.max(
   form.contentTr.paragraphs?.length ?? 0,
   form.contentEn.paragraphs?.length ?? 0
  );
  setOpenParagraphs((values) => [...values, paragraphAccordionId(nextIndex)]);
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
  setOpenParagraphs((values) => shiftOpenParagraphs(values, index));
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
  <div className="space-y-6">
   <AdminContentFormHeader
    formId={formId}
    title={title}
    loading={loading}
    submitDisabled={uploadingHero}
   />
   <form
    id={formId}
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

       <Accordion
        type="multiple"
        value={openParagraphs}
        onValueChange={setOpenParagraphs}
        className="space-y-3"
       >
        {Array.from({ length: paragraphCount }).map((_, index) => {
         const preview = form.contentTr.paragraphs?.[index]?.trim();
         const previewLabel =
          preview && preview.length > 56 ? `${preview.slice(0, 56)}…` : preview;

         return (
          <AccordionItem
           key={index}
           value={paragraphAccordionId(index)}
           className="overflow-hidden rounded-lg border border-border/60"
          >
           <AccordionTrigger className="cursor-pointer px-4 py-3 text-sm font-medium hover:no-underline">
            <span className="text-left">
             Paragraf {index + 1}
             {previewLabel ? (
              <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
               {previewLabel}
              </span>
             ) : null}
            </span>
           </AccordionTrigger>
           <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 border-t border-border/60 pt-3">
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
           </AccordionContent>
          </AccordionItem>
         );
        })}
       </Accordion>

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
   </form>
  </div>
 );
}
