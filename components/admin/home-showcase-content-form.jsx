"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function stripHomeShowcaseFields(content) {
 return {
  categoriesDescription: content.categoriesDescription?.trim() ?? "",
  featuredDescription: content.featuredDescription?.trim() ?? "",
 };
}

export function HomeShowcaseFields({ form, setForm }) {
 function updateLocale(locale, field, value) {
  setForm((current) => ({
   ...current,
   [locale]: { ...current[locale], [field]: value },
  }));
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle>Kategori ve öne çıkan bölümleri</CardTitle>
   </CardHeader>
   <CardContent className="space-y-6">
    <p className="text-sm text-muted-foreground">
     Anasayfadaki &quot;Kategoriler&quot; ve &quot;Öne Çıkan Ürünler&quot; başlıklarının altındaki
     açıklama metinleri.
    </p>
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
     <div className="flex flex-col gap-2">
      <Label>Kategoriler açıklaması (TR)</Label>
      <Textarea
       rows={3}
       className="min-h-24 resize-y"
       value={form.contentTr.categoriesDescription ?? ""}
       onChange={(e) => updateLocale("contentTr", "categoriesDescription", e.target.value)}
       required
      />
     </div>
     <div className="flex flex-col gap-2">
      <Label>Categories description (EN)</Label>
      <Textarea
       rows={3}
       className="min-h-24 resize-y"
       value={form.contentEn.categoriesDescription ?? ""}
       onChange={(e) => updateLocale("contentEn", "categoriesDescription", e.target.value)}
       required
      />
     </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 md:items-start">
     <div className="flex flex-col gap-2">
      <Label>Öne çıkan ürünler açıklaması (TR)</Label>
      <Textarea
       rows={2}
       className="min-h-20 resize-y"
       value={form.contentTr.featuredDescription ?? ""}
       onChange={(e) => updateLocale("contentTr", "featuredDescription", e.target.value)}
       required
      />
     </div>
     <div className="flex flex-col gap-2">
      <Label>Featured products description (EN)</Label>
      <Textarea
       rows={2}
       className="min-h-20 resize-y"
       value={form.contentEn.featuredDescription ?? ""}
       onChange={(e) => updateLocale("contentEn", "featuredDescription", e.target.value)}
       required
      />
     </div>
    </div>
   </CardContent>
  </Card>
 );
}