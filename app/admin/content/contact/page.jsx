import { ContactContentForm } from "@/components/admin/contact-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminContactContentPage() {
 const contact = await getAdminContentBlock("contact");

 return <ContactContentForm initial={contact} />;
}