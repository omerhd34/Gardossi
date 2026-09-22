"use client";

import { useState } from "react";
import { AdminPageHeroImages } from "@/components/admin/admin-page-hero-images";
import {
 keepPageHeroImages,
 normalizePageHeroImages,
} from "@/lib/content/page-hero-images";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ_HERO_UPLOAD_FOLDER = "sss";

function normalizeInitialForm(initial) {
 return {
  ...initial,
  contentTr: normalizePageHeroImages(initial.contentTr),
  contentEn: normalizePageHeroImages(initial.contentEn),
 };
}

function stripHeroFields(content) {
 return keepPageHeroImages(content);
}

export function FaqHeroForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [uploadingHero, setUploadingHero] = useState(false);

 function syncForm({ contentTr, contentEn }) {
  setForm((current) => ({ ...current, contentTr, contentEn }));
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle>SSS Başlık Görseli</CardTitle>
   </CardHeader>
   <CardContent className="space-y-6">
    <AdminPageHeroImages
     content={form.contentTr}
     defaultPage="faq"
     uploadFolder={FAQ_HERO_UPLOAD_FOLDER}
     contentKey="faq"
     getContentTr={() => form.contentTr}
     getContentEn={() => form.contentEn}
     stripContent={stripHeroFields}
     onFormSync={syncForm}
     uploading={uploadingHero}
     onUploadingChange={setUploadingHero}
    />
   </CardContent>
  </Card>
 );
}
