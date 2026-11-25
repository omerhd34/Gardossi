import { AboutContentForm } from "@/components/admin/about-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminAboutContentPage() {
 const about = await getAdminContentBlock("about");

 return <AboutContentForm initial={about} />;
}