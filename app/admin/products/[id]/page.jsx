import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminEditFormActions } from "@/components/admin/admin-edit-form-actions";
import { AdminEditStickyToolbar } from "@/components/admin/admin-edit-sticky-toolbar";
import {
 ADMIN_PRODUCT_FORM_ID,
 ProductForm,
} from "@/components/admin/product-form";
import { getAdminProduct, getCategoryGroupOptions } from "@/lib/admin/queries";
import { getFeaturedProductCount } from "@/lib/admin/featured-products";
import { Button } from "@/components/ui/button";
import { LuArrowUpRight } from "react-icons/lu";

export default async function EditProductPage({ params }) {
 const { id } = await params;
 const [product, categoryGroups, featuredCount] = await Promise.all([
  getAdminProduct(id),
  getCategoryGroupOptions(),
  getFeaturedProductCount(),
 ]);

 if (!product) notFound();

 return (
  <div className="space-y-6">
   <AdminEditStickyToolbar>
    <div>
     <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
    </div>
    <div className="flex flex-wrap items-center justify-end gap-2">
     <AdminEditFormActions
      formId={ADMIN_PRODUCT_FORM_ID}
      deleteHref={`/api/admin/products/${product.id}`}
      deleteTitle="Ürünü sil?"
      deleteDescription="Bu ürün kalıcı olarak silinir."
      deleteRedirect="/admin/products"
     />
     <Button
      className="gap-2 border-green-600 bg-green-600 text-white shadow-sm hover:border-green-700 hover:bg-green-700 hover:text-white"
      asChild
     >
      <Link href="/admin/products">
       Listeye dön
       <LuArrowUpRight className="size-4" />
      </Link>
     </Button>
    </div>
   </AdminEditStickyToolbar>
   <ProductForm
    product={product}
    categoryGroups={categoryGroups}
    featuredCount={featuredCount}
   />
  </div>
 );
}
