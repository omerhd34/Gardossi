"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
 DEFAULT_CATEGORY_DESCRIPTIONS_EN,
 DEFAULT_CATEGORY_DESCRIPTIONS_TR,
} from "@/lib/content/default-category-descriptions";
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
import { Textarea } from "@/components/ui/textarea";

const DEFAULT_DEVICE = "desktop";

export const ADMIN_CATEGORY_GROUP_FORM_ID = "admin-category-group-form";

const emptyCategoryGroup = {
 name: "",
 nameEn: "",
 slug: "",
 coverImage: "",
 coverImages: { ...EMPTY_CATEGORY_COVER_IMAGES },
 sortOrder: 0,
 isPublished: true,
 description: "",
 descriptionEn: "",
};

function initForm(categoryGroup) {
 if (!categoryGroup) return emptyCategoryGroup;

 const limited = applyAdminCategoryNameLimits(categoryGroup);
 const { coverImage, coverImages } = normalizeCategoryCoverImages(
  limited.coverImages,
  limited.coverImage
 );

 const slug = limited.slug ?? slugify(limited.name);
 const description =
  limited.description?.trim() ||
  DEFAULT_CATEGORY_DESCRIPTIONS_TR[slug] ||
  "";
 const descriptionEn =
  limited.descriptionEn?.trim() ||
  DEFAULT_CATEGORY_DESCRIPTIONS_EN[slug] ||
  "";

 return {
  ...limited,
  description,
  descriptionEn,
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
      description: form.description?.trim() || null,
      descriptionEn: form.descriptionEn?.trim() || null,
     }),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi.");

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
  <form
   id={ADMIN_CATEGORY_GROUP_FORM_ID}
   onSubmit={handleSubmit}
   noValidate
   className="space-y-6"
  >
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
     <p className="text-xs text-muted-foreground md:col-span-10">{ADMIN_CATEGORY_NAME_FIELDS_HINT}</p>
     <div className="grid gap-4 md:col-span-10 md:grid-cols-2">
      <div className="flex flex-col gap-2">
       <Label htmlFor="description">Açıklama (TR)</Label>
       <Textarea
        id="description"
        value={form.description ?? ""}
        onChange={(e) => updateField("description", e.target.value)}
        rows={4}
        placeholder="Ürünler sayfasında kategori başlığının altında görünür"
        className="field-sizing-fixed min-h-28 resize-y"
       />
      </div>
      <div className="flex flex-col gap-2">
       <Label htmlFor="descriptionEn">Açıklama (EN)</Label>
       <Textarea
        id="descriptionEn"
        value={form.descriptionEn ?? ""}
        onChange={(e) => updateField("descriptionEn", e.target.value)}
        rows={4}
        placeholder="Category subtitle on the products page (English)"
        className="field-sizing-fixed min-h-28 resize-y"
       />
      </div>
     </div>
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
       previewHeightClass="h-56 w-full"
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

   {!isEdit ? (
    <div className="flex justify-end">
     <Button type="submit" className="cursor-pointer gap-2" disabled={loading || uploading}>
      {loading ? "Kaydediliyor…" : "Oluştur"}
     </Button>
    </div>
   ) : null}
  </form>
 );
}
