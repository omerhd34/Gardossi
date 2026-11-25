import { ValuesContentForm } from "@/components/admin/values-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminValuesContentPage() {
 const values = await getAdminContentBlock("values");

 return <ValuesContentForm initial={values} />;
}