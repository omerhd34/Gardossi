"use client";

import { useId, useState } from "react";
import { AdminContentFormHeader } from "@/components/admin/admin-content-form-header";
import {
 HomeBrandExperienceFields,
 normalizeBrandExperienceContent,
 stripBrandLockedFields,
} from "@/components/admin/home-brand-experience-content-form";
import { HomeHeroFields, stripHeroLockedFields } from "@/components/admin/home-hero-content-form";
import {
 HomeShowcaseFields,
 stripHomeShowcaseFields,
} from "@/components/admin/home-showcase-content-form";
import { saveContentBlock } from "@/components/admin/content-block-save";
import { normalizeHomeHeroContent } from "@/lib/content/home-hero-slides";
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
  contentTr: normalizeBrandExperienceContent(initial.contentTr),
  contentEn: normalizeBrandExperienceContent(initial.contentEn),
 };
}

export function HomeContentForm({ initialHero, initialBrand, initialShowcase }) {
 const formId = useId();
 const [heroForm, setHeroForm] = useState(() => normalizeHeroInitial(initialHero));
 const [brandForm, setBrandForm] = useState(() => normalizeBrandInitial(initialBrand));
 const [showcaseForm, setShowcaseForm] = useState(() => ({
  contentTr: { ...initialShowcase.contentTr },
  contentEn: { ...initialShowcase.contentEn },
 }));
 const [loading, setLoading] = useState(false);
 const [uploadingSlot, setUploadingSlot] = useState(null);
 const [uploadingBrandHero, setUploadingBrandHero] = useState(false);

 async function handleSubmit(event) {
  event.preventDefault();
  setLoading(true);

  try {
   const [savedHero, savedBrand, savedShowcase] = await Promise.all([
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
    saveContentBlock(
     "homeShowcase",
     stripHomeShowcaseFields(showcaseForm.contentTr),
     stripHomeShowcaseFields(showcaseForm.contentEn)
    ),
   ]);

   setHeroForm({
    ...savedHero,
    contentTr: normalizeHomeHeroContent(savedHero.contentTr),
    contentEn: normalizeHomeHeroContent(savedHero.contentEn),
   });
   setBrandForm({
    ...savedBrand,
    contentTr: normalizeBrandExperienceContent(savedBrand.contentTr),
    contentEn: normalizeBrandExperienceContent(savedBrand.contentEn),
   });
   setShowcaseForm({
    contentTr: { ...savedShowcase.contentTr },
    contentEn: { ...savedShowcase.contentEn },
   });

   toast.success("Anasayfa kaydedildi.");
  } catch (error) {
   toast.error(error.message || "Kaydedilemedi.");
  } finally {
   setLoading(false);
  }
 }

 return (
  <div className="space-y-6">
   <AdminContentFormHeader
    formId={formId}
    title="Anasayfa"
    loading={loading}
    submitDisabled={uploadingSlot !== null || uploadingBrandHero}
   />
   <form id={formId} className="space-y-6" onSubmit={handleSubmit}>
    <HomeHeroFields
     form={heroForm}
     setForm={setHeroForm}
     uploadingSlot={uploadingSlot}
     setUploadingSlot={setUploadingSlot}
    />

    <HomeShowcaseFields form={showcaseForm} setForm={setShowcaseForm} />

    <HomeBrandExperienceFields
     form={brandForm}
     setForm={setBrandForm}
     uploadingHero={uploadingBrandHero}
     setUploadingHero={setUploadingBrandHero}
    />
   </form>
  </div>
 );
}
