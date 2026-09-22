"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import {
 AdminHeroSlideImage,
 getHomeHeroSlideImageHint,
} from "@/components/admin/admin-hero-slide-image";
import { handleContentSave } from "@/components/admin/content-block-save";
import { HOME_HERO_DEVICE_IMAGES } from "@/lib/admin/image-specs";
import {
 EMPTY_HERO_SLIDE_IMAGES,
 HOME_HERO_DEVICES,
 HOME_HERO_SLIDE_SLUGS,
 getHomeHeroSlideNumber,
 normalizeHeroSlide,
 normalizeHomeHeroContent,
} from "@/lib/content/home-hero-slides";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardAction,
 CardContent,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HOME_HERO_UPLOAD_FOLDER = "anasayfa-hero";
const DEFAULT_DEVICE = "desktop";

function DeviceTabList({ slideNumber, device, onDeviceChange }) {
 return (
  <div
   role="tablist"
   aria-label={`Slayt ${slideNumber} cihaz görselleri`}
   className="inline-flex shrink-0 rounded-lg border border-border/70 bg-muted/40 p-1"
  >
   {HOME_HERO_DEVICES.map((deviceId) => {
    const { label } = HOME_HERO_DEVICE_IMAGES[deviceId];
    const isActive = device === deviceId;

    return (
     <button
      key={deviceId}
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
       "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150",
       isActive
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => onDeviceChange(deviceId)}
     >
      {label}
     </button>
    );
   })}
  </div>
 );
}

function SlideCard({
 slug,
 slideNumber,
 slide,
 form,
 setForm,
 uploadingSlot,
 setUploadingSlot,
 updateLocale,
}) {
 const [device, setDevice] = useState(DEFAULT_DEVICE);
 const slotKey = `${slug}:${device}`;

 return (
  <Card className="h-full">
   <CardHeader>
    <CardTitle>Slayt {slideNumber}</CardTitle>
    <CardAction>
     <DeviceTabList
      slideNumber={slideNumber}
      device={device}
      onDeviceChange={setDevice}
     />
    </CardAction>
   </CardHeader>
   <CardContent className="space-y-6">
    <AdminHeroSlideImage
     slideSlug={slug}
     device={device}
     slide={slide}
     uploadFolder={`${HOME_HERO_UPLOAD_FOLDER}/${slideNumber}`}
     contentKey="homeHero"
     getContentTr={() => form.contentTr}
     getContentEn={() => form.contentEn}
     stripContent={stripHeroLockedFields}
     onFormSync={({ contentTr, contentEn }) =>
      setForm((current) => ({ ...current, contentTr, contentEn }))
     }
     uploading={uploadingSlot === slotKey}
     onUploadingChange={(isUploading) =>
      setUploadingSlot(isUploading ? slotKey : null)
     }
    />

    <div className="grid gap-4 xl:grid-cols-2">
     <div className="space-y-2">
      <Label>Görsel alt metni (TR)</Label>
      <Input
       value={slide?.alt ?? ""}
       onChange={(e) =>
        updateLocale("contentTr", (content) =>
         updateSlideAlt(content, slug, e.target.value)
        )
       }
      />
     </div>
     <div className="space-y-2">
      <Label>Image alt text (EN)</Label>
      <Input
       value={getSlideBySlug(form.contentEn, slug)?.alt ?? ""}
       onChange={(e) =>
        updateLocale("contentEn", (content) =>
         updateSlideAlt(content, slug, e.target.value)
        )
       }
      />
     </div>
    </div>
   </CardContent>
  </Card>
 );
}

export function stripHeroLockedFields(content) {
 return {
  slides:
   content.slides?.map((slide) => {
    const normalized = normalizeHeroSlide(slide);
    return {
     slug: normalized.slug,
     heroImage: normalized.heroImage ?? "",
     heroImages: { ...EMPTY_HERO_SLIDE_IMAGES, ...normalized.heroImages },
     alt: normalized.alt ?? "",
    };
   }) ??
   HOME_HERO_SLIDE_SLUGS.map((slug) => ({
    slug,
    heroImage: "",
    heroImages: { ...EMPTY_HERO_SLIDE_IMAGES },
    alt: "",
   })),
 };
}

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizeHomeHeroContent(initial.contentTr),
  contentEn: normalizeHomeHeroContent(initial.contentEn),
 };
}

function updateSlideAlt(content, slug, value) {
 const slides = [...(content.slides ?? [])];
 const slideIndex = slides.findIndex((slide) => slide.slug === slug);
 if (slideIndex === -1) return content;

 slides[slideIndex] = { ...slides[slideIndex], alt: value };
 return { ...content, slides };
}

function getSlideBySlug(content, slug) {
 return content.slides?.find((slide) => slide.slug === slug);
}

export function HomeHeroFields({
 form,
 setForm,
 uploadingSlot,
 setUploadingSlot,
}) {
 const heroHint = getHomeHeroSlideImageHint();

 function updateLocale(locale, updater) {
  setForm((current) => ({
   ...current,
   [locale]: updater(current[locale]),
  }));
 }

 return (
  <>
   <Card>
    <CardHeader>
     <CardTitle>Hero Slayt Görselleri</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
     <p className="text-xs text-muted-foreground">{heroHint.lead}</p>
    </CardContent>
   </Card>

   <div className="grid gap-4 lg:grid-cols-2">
    {HOME_HERO_SLIDE_SLUGS.map((slug) => {
     const slideNumber = getHomeHeroSlideNumber(slug);
     const slide = getSlideBySlug(form.contentTr, slug);

     return (
      <SlideCard
       key={slug}
       slug={slug}
       slideNumber={slideNumber}
       slide={slide}
       form={form}
       setForm={setForm}
       uploadingSlot={uploadingSlot}
       setUploadingSlot={setUploadingSlot}
       updateLocale={updateLocale}
      />
     );
    })}
   </div>
  </>
 );
}

export function HomeHeroContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);
 const [uploadingSlot, setUploadingSlot] = useState(null);

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    handleContentSave(
     "homeHero",
     stripHeroLockedFields(form.contentTr),
     stripHeroLockedFields(form.contentEn),
     setLoading,
     "Anasayfa hero slaytları"
    );
   }}
  >
   <HomeHeroFields
    form={form}
    setForm={setForm}
    uploadingSlot={uploadingSlot}
    setUploadingSlot={setUploadingSlot}
   />

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
