import { notFound } from "next/navigation";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { AdminEditFormActions } from "@/components/admin/admin-edit-form-actions";
import { AdminEditStickyToolbar } from "@/components/admin/admin-edit-sticky-toolbar";
import {
 ADMIN_CATEGORY_GROUP_FORM_ID,
 CategoryGroupForm,
} from "@/components/admin/category-group-form";
import { getAdminCategoryGroup } from "@/lib/admin/queries";
import { Button } from "@/components/ui/button";

export default async function EditCategoryGroupPage({ params }) {
 const { id } = await params;
 const categoryGroup = await getAdminCategoryGroup(id);

 if (!categoryGroup) notFound();

 return (
  <div className="space-y-6">
   <AdminEditStickyToolbar>
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{categoryGroup.name}</h1>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-2">
     <AdminEditFormActions
      formId={ADMIN_CATEGORY_GROUP_FORM_ID}
      deleteHref={`/api/admin/category-groups/${categoryGroup.id}`}
      deleteTitle="Kategori grubunu sil?"
      deleteDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
      deleteRedirect="/admin/categories"
     />
     <Button
      className="gap-2 border-green-600 bg-green-600 text-white shadow-sm hover:border-green-700 hover:bg-green-700 hover:text-white"
      asChild
     >
      <Link href="/admin/categories">
       Listeye dön
       <LuArrowUpRight className="size-4" />
      </Link>
     </Button>
    </div>
   </AdminEditStickyToolbar>
   <CategoryGroupForm categoryGroup={categoryGroup} />
  </div>
 );
}