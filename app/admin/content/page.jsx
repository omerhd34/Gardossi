import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { EditButton } from "@/components/admin/edit-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
 {
  href: "/admin/content/home",
  title: "Anasayfa",
  description: "Hero slaytlar, kategori/öne çıkan açıklamaları ve marka bandı.",
 },
 {
  href: "/admin/content/about",
  title: "Hakkımızda Sayfası",
  description: "Sayfa görseli, hikâye, giriş metni ve içerikler.",
 },
 {
  href: "/admin/content/mission",
  title: "Misyon & Vizyon Sayfası",
  description: "Sayfa görseli ve misyon/vizyon metinleri.",
 },
 {
  href: "/admin/content/values",
  title: "Değerlerimiz Sayfası",
  description: "Sayfa görseli ve kurumsal değerler.",
 },
 {
  href: "/admin/content/commitments",
  title: "Taahhütlerimiz Sayfası",
  description: "Sayfa görseli ve kalite taahhütleri.",
 },
 {
  href: "/admin/content/faq",
  title: "Sıkça Sorulan Sorular Sayfası",
  description: "Giriş metni, sayfa görseli, kategoriler, sorular ve yanıtlar.",
 },
 {
  href: "/admin/content/contact",
  title: "İletişim Sayfası",
  description: "Telefon, e-posta, sosyal medya, giriş metni ve saatler.",
 },
 {
  href: "/admin/content/mission-cta",
  title: "Alt çağrı bandı",
  description: "Misyon, değerler ve taahhüt sayfalarında ortak band metinleri.",
 },
];

export default function AdminContentPage() {
 return (
  <div className="space-y-6">
   <AdminPageHeader
    title="Site İçeriği"
    description="Marka sayfalarınızın metinlerini, görsellerini ve yardım merkezi içeriklerini tek merkezden düzenleyin."
   />

   <div className="grid gap-4 md:grid-cols-2">
    {sections.map((section) => (
     <Card key={section.href} className="gap-0">
      <CardHeader className="pb-0">
       <CardTitle>{section.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-0 pt-0 sm:flex-row sm:items-end sm:justify-between">
       <p className="text-sm text-muted-foreground">{section.description}</p>
       <EditButton href={section.href} className="shrink-0" />
      </CardContent>
     </Card>
    ))}
   </div>
  </div>
 );
}
