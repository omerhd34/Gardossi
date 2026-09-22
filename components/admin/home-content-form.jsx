"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { HomeBrandExperienceFields, stripBrandLockedFields } from "@/components/admin/home-brand-experience-content-form";
import { HomeHeroFields, stripHeroLockedFields } from "@/components/admin/home-hero-content-form";
import { saveContentBlock } from "@/components/admin/content-block-save";
import { normalizeHomeHeroContent } from "@/lib/content/home-hero-slides";
import { normalizePageHeroImages } from "@/lib/content/page-hero-images";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function normalizeHeroInitial(initial) {
 return {
  ...initial,
  contentTr: normalizeHomeHeroContent(initial.contentTr),
  contentEn: normalizeHomeHeroContent(initial.contentEn),
 };
}

function normalizeBrandInitial(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

export function HomeContentForm({ initialHero, initialBrand }) {
 const [heroForm, setHeroForm] = useState(() => normalizeHeroInitial(initialHero));
 const [brandForm, setBrandForm] = useState(() => normalizeBrandInitial(initialBrand));
 const [loading, setLoading] = useState(false);
 const [uploadingSlot, setUploadingSlot] = useState(null);
 const [uploadingBrandHero, setUploadingBrandHero] = useState(false);

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);

  try {
   const [savedHero, savedBrand] = await Promise.all([
    saveContentBlock(
     "homeHero",
     stripHeroLockedFields(heroForm.contentTr),
     stripHeroLockedFields(heroForm.contentEn)
    ),
    saveContentBlock(
     "homeBrandExperience",
     stripBrandLockedFields(brandForm.contentTr),
     stripBrandLockedFields(brandForm.contentEn)
    ),
   ]);

   setHeroForm({
    ...savedHero,
    contentTr: normalizeHomeHeroContent(savedHero.contentTr),
    contentEn: normalizeHomeHeroContent(savedHero.contentEn),
   });
   setBrandForm({
    ...savedBrand,
    contentTr: normalizePageHeroImages(savedBrand.contentTr),
    contentEn: normalizePageHeroImages(savedBrand.contentEn),
   });

   toast.success("Anasayfa kaydedildi.");
  } catch (error) {
   toast.error(error.message || "Kaydedilemedi");
  } finally {
   setLoading(false);
  }
 }

 return (
  <form className="space-y-6" onSubmit={handleSubmit}>
   <HomeHeroFields
    form={heroForm}
    setForm={setHeroForm}
    uploadingSlot={uploadingSlot}
    setUploadingSlot={setUploadingSlot}
   />

   <HomeBrandExperienceFields
    form={brandForm}
    setForm={setBrandForm}
    uploadingHero={uploadingBrandHero}
    setUploadingHero={setUploadingBrandHero}
   />

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
