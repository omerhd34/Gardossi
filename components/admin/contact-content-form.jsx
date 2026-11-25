"use client";

import { useId, useState } from "react";
import { AdminContentFormHeader } from "@/components/admin/admin-content-form-header";
import { handleContentSave } from "@/components/admin/content-block-save";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { normalizeInstagramHandle } from "@/lib/instagram-handle";
import {
 normalizePhoneAdminInput,
 normalizePhoneForStorage,
} from "@/lib/site-contact-resolve";

function sharedContactFields(form) {
 return {
  phone: normalizePhoneForStorage(form.phone),
  email: form.email.trim(),
  instagramHandle: normalizeInstagramHandle(form.instagramHandle),
  whatsappNumber: form.whatsappNumber.trim()
   ? normalizePhoneForStorage(form.whatsappNumber)
   : "",
  weekdayHours: form.weekdayHours.trim(),
  weekendHours: form.weekendHours.trim(),
 };
}

function normalizeInitialForm(initial) {
 const shared = initial.contentTr ?? {};
 return {
  seoIntroTr: shared.seoIntro ?? "",
  seoIntroEn: initial.contentEn?.seoIntro ?? "",
  phone: normalizePhoneAdminInput(shared.phone ?? ""),
  email: shared.email ?? "",
  instagramHandle: normalizeInstagramHandle(
   shared.instagramHandle ?? shared.instagramUrl
  ),
  whatsappNumber: normalizePhoneAdminInput(shared.whatsappNumber ?? ""),
  weekdayHours: shared.weekdayHours ?? initial.contentEn?.weekdayHours ?? "",
  weekendHours: shared.weekendHours ?? initial.contentEn?.weekendHours ?? "",
 };
}

export function ContactContentForm({ initial, title = "İletişim Sayfası" }) {
 const formId = useId();
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);

 function updateField(field, value) {
  setForm((current) => ({ ...current, [field]: value }));
 }

 return (
  <div className="space-y-6">
   <AdminContentFormHeader formId={formId} title={title} loading={loading} />
   <form
    id={formId}
    className="space-y-6"
    onSubmit={(event) => {
     event.preventDefault();
     const shared = sharedContactFields(form);
     const contentTr = {
      ...shared,
      seoIntro: form.seoIntroTr.trim(),
     };
     const contentEn = {
      ...shared,
      seoIntro: form.seoIntroEn.trim(),
     };
     handleContentSave("contact", contentTr, contentEn, setLoading, "İletişim sayfası");
    }}
   >
    <Card>
     <CardHeader>
      <CardTitle>İletişim kanalları</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
       Sayfanın altındaki iletişim alanı, İletişim sayfası, Sıkça Sorulan Sorular ve sağ alttaki
       telefon / WhatsApp simgelerinde görünür.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
       <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <Input
         id="phone"
         value={form.phone}
         onChange={(e) => updateField("phone", e.target.value)}
         placeholder="05437451916"
         inputMode="tel"
         required
        />
        <p className="text-xs text-muted-foreground">
         Başında 0 ile, boşluksuz (ör. 05351234567).
        </p>
       </div>
       <div className="space-y-2">
        <Label htmlFor="email">E-posta</Label>
        <Input
         id="email"
         type="email"
         value={form.email}
         onChange={(e) => updateField("email", e.target.value)}
         required
        />
       </div>
       <div className="space-y-2 md:col-span-2">
        <Label htmlFor="instagramHandle">Instagram kullanıcı adı</Label>
        <Input
         id="instagramHandle"
         value={form.instagramHandle}
         onChange={(e) => updateField("instagramHandle", e.target.value)}
         placeholder="gardossi"
         autoComplete="off"
        />
        <p className="text-xs text-muted-foreground">
         Yalnızca kullanıcı adı; @ veya tam adres girmeyin.
        </p>
       </div>
       <div className="space-y-2 md:col-span-2">
        <Label htmlFor="whatsappNumber">WhatsApp numarası (isteğe bağlı)</Label>
        <Input
         id="whatsappNumber"
         value={form.whatsappNumber}
         onChange={(e) => updateField("whatsappNumber", e.target.value)}
         placeholder="05437451916"
         inputMode="tel"
        />
        <p className="text-xs text-muted-foreground">Boş bırakılırsa telefon numarası kullanılır.</p>
       </div>
      </div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader>
      <CardTitle>Giriş metni</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
       İletişim sayfası başlığının altındaki showroom ve randevu açıklaması.
      </p>
      <div className="grid gap-4 md:grid-cols-2 md:items-start">
       <div className="flex flex-col gap-2">
        <Label htmlFor="seoIntroTr">Metin (TR)</Label>
        <Textarea
         id="seoIntroTr"
         rows={4}
         className="min-h-28 resize-y"
         value={form.seoIntroTr}
         onChange={(e) => updateField("seoIntroTr", e.target.value)}
         required
        />
       </div>
       <div className="flex flex-col gap-2">
        <Label htmlFor="seoIntroEn">Metin (EN)</Label>
        <Textarea
         id="seoIntroEn"
         rows={4}
         className="min-h-28 resize-y"
         value={form.seoIntroEn}
         onChange={(e) => updateField("seoIntroEn", e.target.value)}
         required
        />
       </div>
      </div>
     </CardContent>
    </Card>

    <Card>
     <CardHeader>
      <CardTitle>Çalışma Saatleri</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <p className="text-sm text-muted-foreground">
       Footer ve iletişim sayfasında görünen saatler. Örnek format: 10:00 - 19:00
      </p>
      <div className="grid gap-4 md:grid-cols-2">
       <div className="space-y-2">
        <Label htmlFor="weekdayHours">Hafta içi</Label>
        <Input
         id="weekdayHours"
         value={form.weekdayHours}
         onChange={(e) => updateField("weekdayHours", e.target.value)}
         placeholder="10:00 - 19:00"
         required
        />
       </div>
       <div className="space-y-2">
        <Label htmlFor="weekendHours">Hafta sonu</Label>
        <Input
         id="weekendHours"
         value={form.weekendHours}
         onChange={(e) => updateField("weekendHours", e.target.value)}
         placeholder="11:00 - 20:00"
         required
        />
       </div>
      </div>
     </CardContent>
    </Card>
   </form>
  </div>
 );
}