"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import { AdminImageUpload } from "@/components/admin/admin-image-upload";
import {
 ADMIN_CATEGORY_NAME_FIELDS_HINT,
 applyAdminCategoryNameLimits,
 clampAdminCategoryName,
 MAX_ADMIN_CATEGORY_NAME_LENGTH,
 validateAdminCategoryName,
 validateAdminCategoryNameEn,
} from "@/lib/admin/field-limits";
import {
 ADMIN_DRAFT_UPLOAD_FOLDER,
 validateImageUploadFile,
} from "@/lib/admin/image-upload";
import {
 CATEGORY_COVER_DEVICE_IMAGES,
 getCategoryCoverDeviceImageHint,
 getCategoryCoverImageRequirements,
 getCategoryCoverImageSummary,
} from "@/lib/admin/image-specs";
import { slugify } from "@/lib/admin/slug";
import {
 CATEGORY_COVER_DEVICES,
 EMPTY_CATEGORY_COVER_IMAGES,
 mergeCategoryCoverDeviceImage,
 normalizeCategoryCoverImages,
} from "@/lib/content/category-cover-images";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_DEVICE = "desktop";

const emptyCategoryGroup = {
 name: "",
 nameEn: "",
 slug: "",
 coverImage: "",
 coverImages: { ...EMPTY_CATEGORY_COVER_IMAGES },
 sortOrder: 0,
 isPublished: true,
};

function initForm(categoryGroup) {
 if (!categoryGroup) return emptyCategoryGroup;

 const limited = applyAdminCategoryNameLimits(categoryGroup);
 const { coverImage, coverImages } = normalizeCategoryCoverImages(
  limited.coverImages,
  limited.coverImage
 );

 return {
  ...limited,
  coverImage,
  coverImages,
 };
}

function getDefaultCoverPreview(categoryGroup, device) {
 const { coverImages } = normalizeCategoryCoverImages(
  categoryGroup?.coverImages,
  categoryGroup?.coverImage
 );
 if (coverImages[device]) return "";

 const firstProduct = categoryGroup?.products?.[0];
 return firstProduct?.images?.[0]?.url ?? "";
}

function DeviceTabList({ device, onDeviceChange }) {
 return (
  <div
   role="tablist"
   aria-label="Kapak görseli cihaz seçimi"
   className="inline-flex shrink-0 rounded-lg border border-border/70 bg-muted/40 p-1"
  >
   {CATEGORY_COVER_DEVICES.map((deviceId) => {
    const { label } = CATEGORY_COVER_DEVICE_IMAGES[deviceId];
    const isActive = device === deviceId;

    return (
     <button
      key={deviceId}
      type="button"
      role="tab"
      aria-selected={isActive}
      className={cn(
       "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150",
       isActive
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
      )}
      onClick={() => onDeviceChange(deviceId)}
     >
      {label}
     </button>
    );
   })}
  </div>
 );
}

export function CategoryGroupForm({ categoryGroup = null }) {
 const router = useRouter();
 const [form, setForm] = useState(() => initForm(categoryGroup));
 const [device, setDevice] = useState(DEFAULT_DEVICE);
 const [loading, setLoading] = useState(false);
 const [uploading, setUploading] = useState(false);
 const isEdit = Boolean(categoryGroup?.id);
 const spec = CATEGORY_COVER_DEVICE_IMAGES[device] ?? CATEGORY_COVER_DEVICE_IMAGES.desktop;
 const coverValue = form.coverImages?.[device] ?? "";
 const defaultCoverPreview = useMemo(
  () => getDefaultCoverPreview(categoryGroup, device),
  [categoryGroup, device]
 );

 function getCoverUploadFolder(currentForm) {
  const activeUrl = currentForm.coverImages?.[device] || currentForm.coverImage;
  if (activeUrl) {
   const parts = activeUrl.split("/").filter(Boolean);
   if (parts.length >= 2) return parts[0];
  }

  return slugify(currentForm.name) || ADMIN_DRAFT_UPLOAD_FOLDER;
 }

 function updateField(field, value) {
  setForm((current) => {
   const nextValue =
    field === "name" || field === "nameEn" ? clampAdminCategoryName(value) : value;
   const next = { ...current, [field]: nextValue };
   if (field === "name") {
    next.slug = slugify(nextValue);
   }
   return next;
  });
 }

 function updateCoverDevice(url) {
  setForm((current) => {
   const merged = mergeCategoryCoverDeviceImage(current.coverImages, device, url);
   return {
    ...current,
    coverImage: merged.coverImage,
    coverImages: merged.coverImages,
   };
  });
 }

 async function uploadCoverImage(file) {
  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  const folder = `${getCoverUploadFolder(form)}/${device}`;

  setUploading(true);
  try {
   const body = new FormData();
   body.append("file", file);
   body.append("folder", folder);

   const response = await fetch("/api/admin/upload", {
    method: "POST",
    body,
   });
   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Yükleme başarısız");

   updateCoverDevice(data.url);
   toast.success(`${spec.label} kapak görseli yüklendi`);
  } catch (error) {
   toast.error(error.message);
  } finally {
   setUploading(false);
  }
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const nameError = validateAdminCategoryName(form.name, "Ad (TR)");
  if (nameError) {
   toast.error(nameError);
   return;
  }

  const nameEnError = validateAdminCategoryNameEn(form.nameEn);
  if (nameEnError) {
   toast.error(nameEnError);
   return;
  }

  setLoading(true);

  const { coverImage, coverImages } = normalizeCategoryCoverImages(
   form.coverImages,
   form.coverImage
  );

  try {
   const response = await fetch(
    isEdit
     ? `/api/admin/category-groups/${categoryGroup.id}`
     : "/api/admin/category-groups",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      name: form.name,
      nameEn: form.nameEn,
      slug: slugify(form.name),
      coverImage,
      coverImages,
      sortOrder: form.sortOrder,
      isPublished: form.isPublished,
     }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi");

   toast.success(isEdit ? "Kategori grubu güncellendi" : "Kategori grubu oluşturuldu.");

   if (isEdit) {
    router.push(`/admin/categories/${data.id}`);
   } else {
    router.replace("/admin/categories");
   }

   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <form onSubmit={handleSubmit} noValidate className="space-y-6">
   <Card>
    <CardHeader>
     <CardTitle>{isEdit ? "Kategori Grubu Düzenle" : "Yeni Kategori Grubu"}</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-4 md:grid-cols-10">
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="name">Ad (TR)</Label>
      <Input
       id="name"
       value={form.name}
       onChange={(e) => updateField("name", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-4">
      <Label htmlFor="nameEn">Ad (EN)</Label>
      <Input
       id="nameEn"
       value={form.nameEn ?? ""}
       onChange={(e) => updateField("nameEn", e.target.value)}
       maxLength={MAX_ADMIN_CATEGORY_NAME_LENGTH}
      />
     </div>
     <div className="space-y-2 md:col-span-2">
      <Label htmlFor="sortOrder">Sıra</Label>
      <Input
       id="sortOrder"
       type="number"
       value={form.sortOrder ?? 0}
       onChange={(e) => updateField("sortOrder", Number(e.target.value))}
      />
     </div>
     <p className="text-xs text-muted-foreground md:col-span-8">{ADMIN_CATEGORY_NAME_FIELDS_HINT}</p>
     <div className="space-y-3 md:col-span-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
       <div className="min-w-0 flex-1 space-y-1">
        <Label>Kapak görseli</Label>
        <p className="text-xs text-muted-foreground">{getCategoryCoverImageSummary()}</p>
        <p className="text-xs text-muted-foreground">{getCategoryCoverImageRequirements()}</p>
        <p className="text-xs text-muted-foreground">{getCategoryCoverDeviceImageHint(device)}</p>
       </div>
       <DeviceTabList device={device} onDeviceChange={setDevice} />
      </div>
      <AdminImageUpload
       label="Kapak görseli"
       hideLabel
       value={coverValue}
       defaultPreview={defaultCoverPreview}
       onChange={(value) => updateCoverDevice(value)}
       onUpload={uploadCoverImage}
       uploading={uploading}
       hint=""
       previewAspectClass={spec.previewAspectClass}
       fullWidth
      />
     </div>
     <label className="flex cursor-pointer items-center gap-2 md:col-span-10">
      <Checkbox
       checked={form.isPublished !== false}
       onCheckedChange={(checked) => updateField("isPublished", Boolean(checked))}
      />
      <span className="text-sm">Yayında</span>
     </label>
    </CardContent>
   </Card>

   <div className="flex items-center justify-between gap-3">
    {isEdit ? (
     <DeleteButton
      href={`/api/admin/category-groups/${categoryGroup.id}`}
      confirmTitle="Kategori grubunu sil?"
      confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
      redirectTo="/admin/categories"
      iconOnly={false}
     />
    ) : (
     <div />
    )}
    <Button type="submit" className="cursor-pointer gap-2" disabled={loading || uploading}>
     {loading ? (
      "Kaydediliyor…"
     ) : isEdit ? (
      <>
       <MdSave className="size-4" />
       Güncelle
      </>
     ) : (
      "Oluştur"
     )}
    </Button>
   </div>
  </form>
 );
}
