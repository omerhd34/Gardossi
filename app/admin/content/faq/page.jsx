import { FaqContentPage } from "@/components/admin/faq-content-page";
import { getAdminContentBlock, getAdminFaqCategories } from "@/lib/content/queries";

export default async function AdminFaqContentPage() {
 const [categories, faqSettings] = await Promise.all([
  getAdminFaqCategories(),
  getAdminContentBlock("faq"),
 ]);

 return <FaqContentPage categories={categories} faqSettings={faqSettings} />;
}