import Link from "next/link";
import {
 MdAdd,
 MdAddCircleOutline,
 MdArticle,
 MdCategory,
 MdImage,
 MdViewModule,
} from "react-icons/md";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminStats } from "@/lib/admin/queries";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const headerActions = [
 {
  label: "Yeni ürün",
  href: "/admin/products/new",
  className: "bg-neutral-900 text-white hover:bg-neutral-900/85",
 },
 {
  label: "Yeni kategori",
  href: "/admin/categories/new",
  className: "bg-neutral-300 text-neutral-900 hover:bg-neutral-300/85",
 },
];

const statMeta = [
 { key: "categoryGroups", label: "Kategori grubu", href: "/admin/categories", icon: MdCategory },
 { key: "products", label: "Ürün", href: "/admin/products", icon: MdViewModule },
 { key: "images", label: "Görsel", icon: MdImage },
];

const quickActions = [
 {
  title: "Yeni ürün ekle",
  description: "Kataloga yeni bir ürün, fiyat ve görsel ekleyin.",
  href: "/admin/products/new",
  cta: "Ürün oluştur",
  icon: MdAddCircleOutline,
 },
 {
  title: "Kategori grupları",
  description: "Oturma, köşe ve diğer ürün kategorilerini düzenleyin.",
  href: "/admin/categories",
  cta: "Kategoriler",
  icon: MdCategory,
 },
 {
  title: "Site içeriği",
  description: "Marka sayfalarının metinlerini, görsellerini ve yardım merkezi içeriklerini düzenleyin.",
  href: "/admin/content",
  cta: "İçerik yönetimi",
  icon: MdArticle,
 },
];

export default async function AdminDashboardPage() {
 const stats = await getAdminStats();

 return (
  <div className="space-y-8">
   <AdminPageHeader
    title="Yönetim Paneli"
    description="Ürünleri, kategorileri, site içeriklerini ve görselleri tek yerden yönetin."
   >
    {headerActions.map((action) => (
     <Button
      key={action.href}
      className={cn(
       "w-full cursor-pointer gap-2 border-transparent shadow-none sm:w-auto",
       action.className
      )}
      asChild
     >
      <Link href={action.href}>
       <MdAdd className="size-4" />
       {action.label}
      </Link>
     </Button>
    ))}
   </AdminPageHeader>

   <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {statMeta.map((item) => {
     const Icon = item.icon;
     const value = stats[item.key];

     const card = (
      <Card
       className={cn(
        "border-border/70 bg-card/90 shadow-sm transition-shadow",
        item.href && "hover:border-border hover:shadow-md"
       )}
      >
       <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="min-w-0 space-y-1">
         <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
         <p className="text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
         <Icon className="size-5" />
        </div>
       </CardContent>
      </Card>
     );

     if (item.href) {
      return (
       <Link
        key={item.key}
        href={item.href}
        className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
       >
        {card}
       </Link>
      );
     }

     return <div key={item.key}>{card}</div>;
    })}
   </div>

   <div className="grid gap-4 items-stretch lg:grid-cols-2">
    {quickActions.map((action) => {
     const ActionIcon = action.icon;

     return (
      <Card
       key={action.href}
       className="h-full gap-0 py-0 border-border/70 bg-card/90 shadow-sm transition-shadow hover:shadow-md"
      >
       <CardContent className="flex h-full flex-col gap-3.5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
         <div className="flex items-center gap-2">
          {ActionIcon ? <ActionIcon className="size-5 text-muted-foreground" /> : null}
          <h2 className="text-base font-semibold tracking-tight">{action.title}</h2>
         </div>
         <p className="min-h-10 text-sm leading-snug text-muted-foreground">{action.description}</p>
        </div>
        <Button variant="outline" className="cursor-pointer shrink-0" asChild>
         <Link href={action.href}>{action.cta}</Link>
        </Button>
       </CardContent>
      </Card>
     );
    })}
   </div>
  </div>
 );
}
