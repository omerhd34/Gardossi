import { CommitmentsContentForm } from "@/components/admin/commitments-content-form";
import { getAdminContentBlock } from "@/lib/content/queries";

export default async function AdminCommitmentsContentPage() {
 const commitments = await getAdminContentBlock("commitments");

 return <CommitmentsContentForm initial={commitments} />;
}