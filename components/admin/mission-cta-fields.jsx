"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const MISSION_CTA_FIELD_KEYS = [
 "ctaTitle",
 "ctaDescription",
 "ctaProducts",
 "ctaContact",
];

export const MISSION_CTA_FIELDS = [
 ["ctaTitle", "Başlık"],
 ["ctaDescription", "Açıklama"],
 ["ctaProducts", "Ürünler butonu"],
 ["ctaContact", "İletişim butonu"],
];

export function pickMissionCtaContent(content) {
 return Object.fromEntries(
  MISSION_CTA_FIELD_KEYS.map((field) => [field, content?.[field] ?? ""])
 );
}

export function MissionCtaFields({ contentTr, contentEn, onChangeTr, onChangeEn }) {
 return (
  <div className="space-y-4">
   <p className="text-sm text-muted-foreground">
    Misyon, değerler ve taahhüt sayfalarının altındaki koyu bandın metinleri (TR/EN).
   </p>
   {MISSION_CTA_FIELDS.map(([field, label]) => (
    <div key={field} className="grid gap-4 md:grid-cols-2 md:items-start">
     <div className="flex flex-col gap-2">
      <Label>{label} (TR)</Label>
      {field === "ctaDescription" ? (
       <Textarea
        rows={3}
        className="min-h-24 resize-y"
        value={contentTr[field] ?? ""}
        onChange={(e) => onChangeTr(field, e.target.value)}
        required
       />
      ) : (
       <Input
        value={contentTr[field] ?? ""}
        onChange={(e) => onChangeTr(field, e.target.value)}
        required
       />
      )}
     </div>
     <div className="flex flex-col gap-2">
      <Label>{label} (EN)</Label>
      {field === "ctaDescription" ? (
       <Textarea
        rows={3}
        className="min-h-24 resize-y"
        value={contentEn[field] ?? ""}
        onChange={(e) => onChangeEn(field, e.target.value)}
        required
       />
      ) : (
       <Input
        value={contentEn[field] ?? ""}
        onChange={(e) => onChangeEn(field, e.target.value)}
        required
       />
      )}
     </div>
    </div>
   ))}
  </div>
 );
}