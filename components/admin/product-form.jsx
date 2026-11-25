"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MdAdd, MdDeleteOutline } from "react-icons/md";
import { AdminFormSelect } from "@/components/admin/admin-form-select";
import { VariantImagesEditor } from "@/components/admin/variant-images-editor";
import { MAX_FEATURED_PRODUCTS } from "@/lib/admin/featured-products";
import {
 ADMIN_NAME_FIELDS_HINT,
 ADMIN_PART_FIELDS_HINT,
 applyProductTextLimits,
 clampAdminPartName,
 clampAdminText,
 MAX_ADMIN_NAME_LENGTH,
 MAX_ADMIN_PART_NAME_LENGTH,
 validateAdminName,
 validateAdminNameEn,
 validateDimensionItemsText,
} from "@/lib/admin/field-limits";
import {
 ADMIN_DRAFT_UPLOAD_FOLDER,
 validateImageUploadFile,
} from "@/lib/admin/image-upload";
import {
 formatTurkishAmountInput,
 MAX_TURKISH_AMOUNT_INPUT_LENGTH,
 parseTurkishAmount,
} from "@/lib/admin/price-input";
import { slugify } from "@/lib/admin/slug";
import {
 EMPTY_PRODUCT_IMAGE_URLS,
 mergeProductImageDeviceUrl,
 normalizeProductImage,
 PRODUCT_IMAGE_DEVICES,
} from "@/lib/content/product-images";
import { PRODUCT_IMAGE_DEVICE_IMAGES } from "@/lib/admin/image-specs";
import { CORNER_CATEGORY_SLUG } from "@/lib/product-category";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
 Tooltip,
 TooltipContent,
 TooltipProvider,
 TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

const emptyDimensionItem = {
 name: "",
 nameEn: "",
 widthCm: "",
 depthCm: "",
 heightCm: "",
 amount: "",
 quantity: "1",
};

function normalizeDimensionItemQuantity(quantity) {
 if (quantity == null || quantity === "" || Number(quantity) < 1) return "1";
 return String(quantity);
}

const emptyImage = {
 url: "",
 urls: { ...EMPTY_PRODUCT_IMAGE_URLS },
 alt: "",
 altEn: "",
 isPrimary: false,
};

const DEFAULT_IMAGE_DEVICE = "desktop";

function parseRankInput(value, fallback = 1) {
 if (value === "" || value == null) return fallback;
 const parsed = Number(value);
 if (!Number.isFinite(parsed)) return fallback;
 return Math.max(1, Math.trunc(parsed));
}

function createEmptyProduct(categoryGroupId = "") {
 return {
  name: "",
  nameEn: "",
  slug: "",
  description: "",
  descriptionEn: "",
  widthCm: "",
  depthCm: "",
  heightCm: "",
  cornerStandardSideACm: "",
  cornerStandardSideBCm: "",
  sortOrder: 1,
  isPublished: true,
  isFeatured: false,
  featuredOrder: 1,
  categoryGroupId,
  priceTotal: "",
  dimensionItems: [{ ...emptyDimensionItem }],
  images: [],
 };
}

export const ADMIN_PRODUCT_FORM_ID = "admin-product-form";

const PRODUCT_FORM_SECTION_CLASS =
 "flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 data-[state=closed]:gap-0";

const PRODUCT_FORM_ACCORDION_SECTIONS = ["general", "dimensions", "images"];

const PRODUCT_FORM_HEADER_TRIGGER_CLASS =
 "flex h-9 w-full min-w-0 cursor-pointer items-center gap-3 py-0 text-left hover:no-underline **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4";

function ProductFormSection({ value, title, headerAction, contentClassName, children }) {
 return (
  <AccordionItem value={value} className={PRODUCT_FORM_SECTION_CLASS}>
   <CardHeader className="grid-cols-1 pb-0">
    <AccordionTrigger className={PRODUCT_FORM_HEADER_TRIGGER_CLASS}>
     <CardTitle className="min-w-0 flex-1">{title}</CardTitle>
     {headerAction ? <div className="shrink-0">{headerAction}</div> : null}
    </AccordionTrigger>
   </CardHeader>
   <AccordionContent className="pb-0">
    <CardContent className={cn("pt-0", contentClassName)}>{children}</CardContent>
   </AccordionContent>
  </AccordionItem>
 );
}

function ProductFormSections({ openSections, onOpenSectionsChange, children }) {
 return (
  <Accordion
   type="multiple"
   value={openSections}
   onValueChange={onOpenSectionsChange}
   className="space-y-6"
  >
   {children}
  </Accordion>
 );
}

export function ProductForm({
 product = null,
 categoryGroups = [],
 featuredCount = 0,
 maxFeatured = MAX_FEATURED_PRODUCTS,
}) {
 const router = useRouter();
 const isEdit = Boolean(product?.id);
 const [form, setForm] = useState(() => {
  if (!product) {
   return createEmptyProduct(categoryGroups[0]?.id ?? "");
  }

  return applyProductTextLimits({
   ...product,
   widthCm: product.widthCm ?? "",
   depthCm: product.depthCm ?? "",
   heightCm: product.heightCm ?? "",
   cornerStandardSideACm: product.cornerStandardSideACm ?? "",
   cornerStandardSideBCm: product.cornerStandardSideBCm ?? "",
   priceTotal:
    product.priceTotal != null && product.priceTotal !== ""
     ? formatTurkishAmountInput(String(product.priceTotal))
     : "",
   dimensionItems:
    product.dimensionItems?.length > 0
     ? product.dimensionItems.map((item) => ({
      name: item.name ?? "",
      nameEn: item.nameEn ?? "",
      widthCm: item.widthCm ?? "",
      depthCm: item.depthCm ?? "",
      heightCm: item.heightCm ?? "",
      amount:
       item.amount != null && item.amount !== ""
        ? formatTurkishAmountInput(String(item.amount))
        : "",
      quantity: normalizeDimensionItemQuantity(item.quantity),
     }))
     : [{ ...emptyDimensionItem }],
   images:
    product.images?.map((image) => normalizeProductImage({
     url: image.url ?? "",
     urls: image.urls ?? null,
     alt: image.alt ?? "",
     altEn: image.altEn ?? "",
     isPrimary: Boolean(image.isPrimary),
    })) ?? [],
   categoryGroupId: product.categoryGroupId ?? product.categoryGroup?.id ?? "",
   sortOrder: Math.max(1, product.sortOrder ?? 1),
   featuredOrder: product.isFeatured
    ? Math.max(1, product.featuredOrder ?? 1)
    : product.featuredOrder ?? 0,
  });
 });
 const [loading, setLoading] = useState(false);
 const [uploading, setUploading] = useState(false);
 const [uploadStatus, setUploadStatus] = useState("");
 const [imageDevice, setImageDevice] = useState(DEFAULT_IMAGE_DEVICE);
 const [openSections, setOpenSections] = useState(() => ["general"]);
 const fileInputRef = useRef(null);

 function handleOpenSectionsChange(nextValue) {
  setOpenSections(
   nextValue.filter((section) => PRODUCT_FORM_ACCORDION_SECTIONS.includes(section))
  );
 }
 const canMarkFeatured = Boolean(form.isFeatured) || featuredCount < maxFeatured;
 const selectedCategory = categoryGroups.find((group) => group.id === form.categoryGroupId);
 const isCornerCategory = selectedCategory?.slug === CORNER_CATEGORY_SLUG;
 const imageDeviceLabel =
  PRODUCT_IMAGE_DEVICE_IMAGES[imageDevice]?.label ?? "Masaüstü";

 const lineItemsPriceSum = useMemo(() => {
  return form.dimensionItems.reduce((sum, item) => {
   const amount = parseTurkishAmount(item.amount);
   const quantity = Number(item.quantity) > 0 ? Number(item.quantity) : 1;
   if (amount == null) return sum;
   return sum + amount * quantity;
  }, 0);
 }, [form.dimensionItems]);

 const clampedTextFields = new Set(["name", "nameEn"]);

 function updateField(field, value) {
  setForm((current) => {
   const nextValue = clampedTextFields.has(field) ? clampAdminText(value) : value;
   const next = { ...current, [field]: nextValue };
   if (field === "name") {
    next.slug = slugify(nextValue);
   }
   return next;
  });
 }

 function updateListItem(listName, index, field, value) {
  let nextValue = value;

  if (listName === "dimensionItems" && (field === "name" || field === "nameEn")) {
   nextValue = clampAdminPartName(value);
  } else if (field === "amount") {
   nextValue = formatTurkishAmountInput(value);
  }

  setForm((current) => ({
   ...current,
   [listName]: current[listName].map((item, itemIndex) =>
    itemIndex === index ? { ...item, [field]: nextValue } : item
   ),
  }));
 }

 function addListItem(listName, template) {
  setForm((current) => ({
   ...current,
   [listName]: [...current[listName], { ...template }],
  }));
 }

 function removeListItem(listName, index) {
  setForm((current) => ({
   ...current,
   [listName]: current[listName].filter((_, itemIndex) => itemIndex !== index),
  }));
 }

 function updateImages(updater) {
  setForm((current) => ({
   ...current,
   images: updater(current.images ?? []),
  }));
 }

 function moveImage(imageIndex, direction) {
  updateImages((images) => {
   const items = [...images];
   const target = imageIndex + direction;
   if (target < 0 || target >= items.length) return items;
   [items[imageIndex], items[target]] = [items[target], items[imageIndex]];
   return items;
  });
 }

 function setPrimaryImage(imageIndex) {
  updateImages((images) =>
   images.map((image, index) => ({
    ...image,
    isPrimary: index === imageIndex,
   }))
  );
 }

 function getUploadFolder() {
  return slugify(form.name) || product?.slug || ADMIN_DRAFT_UPLOAD_FOLDER;
 }

 async function uploadSingleFile(file, folder) {
  const body = new FormData();
  body.append("file", file);
  body.append("folder", `${folder}/${imageDevice}`);

  const response = await fetch("/api/admin/upload", {
   method: "POST",
   body,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Yükleme başarısız.");
  if (!data.url) throw new Error("Yüklenen görsel adresi alınamadı.");
  return data.url;
 }

 async function handleUpload(event) {
  const files = Array.from(event.target.files ?? []);
  event.target.value = "";
  await uploadImageFiles(files);
 }

 async function handleReplaceUpload(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  const imageIndex = replaceImageIndex;
  setReplaceImageIndex(null);
  if (!file || imageIndex == null) return;

  const fileTypeError = validateImageUploadFile(file);
  if (fileTypeError) {
   toast.error(fileTypeError);
   return;
  }

  setUploadStatus(`${file.name} güncelleniyor…`);
  setUploading(true);
  try {
   const url = await uploadSingleFile(file, getUploadFolder());
   updateImages((images) =>
    images.map((image, index) =>
     index === imageIndex ? mergeProductImageDeviceUrl(image, imageDevice, url) : image
    )
   );
   setUploadStatus(`${imageDeviceLabel} görseli güncellendi.`);
   toast.success(`${imageDeviceLabel} görseli güncellendi.`);
  } catch (error) {
   setUploadStatus("");
   toast.error(error.message);
  } finally {
   setUploading(false);
  }
 }

 async function uploadImageFiles(files) {
  if (!files.length || uploading) return;

  const folder = getUploadFolder();

  for (const file of files) {
   const fileTypeError = validateImageUploadFile(file);
   if (fileTypeError) {
    toast.error(fileTypeError);
    continue;
   }

   setUploadStatus(`${file.name} yükleniyor…`);
   setUploading(true);
   try {
    const url = await uploadSingleFile(file, folder);

    updateImages((images) => [
     ...images,
     normalizeProductImage({
      ...emptyImage,
      urls: { ...EMPTY_PRODUCT_IMAGE_URLS, [imageDevice]: url },
      url,
      isPrimary: images.length === 0,
     }),
    ]);
    setUploadStatus(`${file.name} eklendi.`);
    toast.success(`${imageDeviceLabel} görseli yüklendi.`);
   } catch (error) {
    setUploadStatus("");
    toast.error(error.message);
   } finally {
    setUploading(false);
   }
  }
 }

 function openUpload() {
  fileInputRef.current?.click();
 }

 async function handleSubmit(event) {
  event.preventDefault();

  const nameError = validateAdminName(form.name, "Ad (TR)");
  if (nameError) {
   toast.error(nameError);
   return;
  }

  const nameEnError = validateAdminNameEn(form.nameEn);
  if (nameEnError) {
   toast.error(nameEnError);
   return;
  }

  if (!form.categoryGroupId) {
   toast.error("Kategori seçin.");
   return;
  }

  if (
   !(form.images ?? []).some((image) => {
    const normalized = normalizeProductImage(image);
    return Boolean(
     normalized.url ||
     PRODUCT_IMAGE_DEVICES.some((device) => normalized.urls[device])
    );
   })
  ) {
   toast.error("En az bir görsel gereklidir.");
   return;
  }

  const dimensionItemsError = validateDimensionItemsText(form.dimensionItems);
  if (dimensionItemsError) {
   toast.error(dimensionItemsError);
   return;
  }

  setLoading(true);

  try {
   const payload = {
    ...form,
    sortOrder: parseRankInput(form.sortOrder),
    featuredOrder: form.isFeatured ? parseRankInput(form.featuredOrder) : 0,
    slug: slugify(form.name),
    images: (form.images ?? []).map((image, index) => {
     const normalized = normalizeProductImage(image);
     return {
      ...normalized,
      isPrimary:
       Boolean(normalized.isPrimary) ||
       (index === 0 && !(form.images ?? []).some((item) => item.isPrimary)),
     };
    }),
   };

   const response = await fetch(
    isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
    {
     method: isEdit ? "PUT" : "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    }
   );

   const data = await response.json();
   if (!response.ok) throw new Error(data.error || "Kaydedilemedi.");

   toast.success(isEdit ? "Ürün güncellendi." : "Ürün oluşturuldu.");
   router.push(isEdit ? `/admin/products/${data.id}` : "/admin/products");
   router.refresh();
  } catch (error) {
   toast.error(error.message);
  } finally {
   setLoading(false);
  }
 }

 return (
  <form
   id={ADMIN_PRODUCT_FORM_ID}
   onSubmit={handleSubmit}
   noValidate
   className="space-y-6"
  >
   <ProductFormSections
    openSections={openSections}
    onOpenSectionsChange={handleOpenSectionsChange}
   >
    <ProductFormSection value="general" title="Genel Bilgiler" contentClassName="grid gap-4 md:grid-cols-2">
     <div className="space-y-2 md:col-span-2">
      <div className="grid gap-4 md:grid-cols-2">
       <div className="space-y-2">
        <Label htmlFor="name">Ad (TR)</Label>
        <Input
         id="name"
         value={form.name}
         onChange={(e) => updateField("name", e.target.value)}
         maxLength={MAX_ADMIN_NAME_LENGTH}
        />
       </div>
       <div className="space-y-2">
        <Label htmlFor="nameEn">Ad (EN)</Label>
        <Input
         id="nameEn"
         value={form.nameEn ?? ""}
         onChange={(e) => updateField("nameEn", e.target.value)}
         maxLength={MAX_ADMIN_NAME_LENGTH}
        />
       </div>
      </div>
      <p className="text-xs text-muted-foreground">{ADMIN_NAME_FIELDS_HINT}</p>
     </div>
     <div className="space-y-2 md:col-span-2">
      <Label htmlFor="categoryGroupId">Kategori</Label>
      <AdminFormSelect
       id="categoryGroupId"
       value={form.categoryGroupId ?? ""}
       onValueChange={(nextValue) => updateField("categoryGroupId", nextValue)}
       placeholder="Kategori seçin"
       options={categoryGroups.map((group) => ({
        value: group.id,
        label: group.name,
       }))}
      />
     </div>
     <div className="flex flex-wrap items-center gap-4 md:col-span-2">
      <label className="flex cursor-pointer items-center gap-2">
       <Checkbox
        checked={form.isPublished !== false}
        onCheckedChange={(checked) => updateField("isPublished", Boolean(checked))}
       />
       <span className="text-sm">Yayında</span>
      </label>
      <div className="flex items-center gap-2">
       <label
        className={`flex items-center gap-2 ${canMarkFeatured ? "cursor-pointer" : "cursor-default"}`}
       >
        <Checkbox
         checked={Boolean(form.isFeatured)}
         disabled={!canMarkFeatured}
         className="disabled:cursor-default"
         onCheckedChange={(checked) => {
          if (checked && !canMarkFeatured) {
           toast.error(`Anasayfa vitrininde en fazla ${maxFeatured} ürün olabilir.`);
           return;
          }
          const isFeatured = Boolean(checked);
          setForm((current) => ({
           ...current,
           isFeatured,
           featuredOrder: isFeatured ? parseRankInput(current.featuredOrder) : 0,
          }));
         }}
        />
        <span
         className={`text-sm ${!canMarkFeatured ? "text-muted-foreground" : ""}`}
        >
         Anasayfa vitrininde göster
        </span>
       </label>
       {!canMarkFeatured ? (
        <TooltipProvider>
         <Tooltip>
          <TooltipTrigger asChild>
           <button
            type="button"
            className="inline-flex cursor-pointer items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            aria-label="Vitrin limiti hakkında bilgi"
           >
            <InfoIcon className="size-4" />
           </button>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={6}>
           Vitrin dolu ({featuredCount}/{maxFeatured}). Yeni vitrin eklemek için mevcut bir
           vitrin işaretini kaldırın.
          </TooltipContent>
         </Tooltip>
        </TooltipProvider>
       ) : null}
      </div>
     </div>
     <div
      className={cn(
       "grid gap-4 md:col-span-2",
       form.isFeatured ? "md:grid-cols-2" : "md:grid-cols-1"
      )}
     >
      <div className="space-y-2">
       <Label htmlFor="sortOrder">Sıra</Label>
       <Input
        id="sortOrder"
        type="number"
        min={1}
        value={form.sortOrder ?? 1}
        onChange={(e) => updateField("sortOrder", parseRankInput(e.target.value))}
        className="w-full"
       />
       <p className="text-xs text-muted-foreground">
        Seçili kategori listesindeki sıra; aynı numaradaki ürünle yer değişir.
       </p>
      </div>
      {form.isFeatured ? (
       <div className="space-y-2">
        <Label htmlFor="featuredOrder">Vitrin sırası</Label>
        <Input
         id="featuredOrder"
         type="number"
         min={1}
         value={form.featuredOrder ?? 1}
         onChange={(e) => updateField("featuredOrder", parseRankInput(e.target.value))}
         className="w-full"
        />
        <p className="text-xs text-muted-foreground">
         Anasayfa vitrinindeki sıra; aynı numaradaki vitrin ürünüyle yer değişir.
        </p>
       </div>
      ) : null}
     </div>
     <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
      <div className="flex flex-col gap-2">
       <Label htmlFor="description">Açıklama (TR)</Label>
       <Textarea
        id="description"
        value={form.description ?? ""}
        onChange={(e) => updateField("description", e.target.value)}
        rows={6}
        className="h-36 field-sizing-fixed resize-none"
       />
      </div>
      <div className="flex flex-col gap-2">
       <Label htmlFor="descriptionEn">Açıklama (EN)</Label>
       <Textarea
        id="descriptionEn"
        value={form.descriptionEn ?? ""}
        onChange={(e) => updateField("descriptionEn", e.target.value)}
        rows={6}
        className="h-36 field-sizing-fixed resize-none"
       />
      </div>
     </div>
    </ProductFormSection>
   </ProductFormSections>

   {isCornerCategory ? (
    <Card>
     <CardHeader>
      <CardTitle>Standart Köşe Ölçüsü</CardTitle>
     </CardHeader>
     <CardContent className="space-y-4">
      <p className="text-xs text-muted-foreground">
       L formundaki iki kol boyu. Genişlik, derinlik veya yükseklik değildir;
       ürün sayfasında ölçü tablosunun altında ayrı gösterilir.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
       <div className="space-y-1">
        <Label htmlFor="cornerStandardSideACm">L - uzun (cm)</Label>
        <Input
         id="cornerStandardSideACm"
         type="number"
         value={form.cornerStandardSideACm}
         onChange={(e) => updateField("cornerStandardSideACm", e.target.value)}
        />
       </div>
       <div className="space-y-1">
        <Label htmlFor="cornerStandardSideBCm">L - kısa (cm)</Label>
        <Input
         id="cornerStandardSideBCm"
         type="number"
         value={form.cornerStandardSideBCm}
         onChange={(e) => updateField("cornerStandardSideBCm", e.target.value)}
        />
       </div>
      </div>
     </CardContent>
    </Card>
   ) : null}

   <ProductFormSections
    openSections={openSections}
    onOpenSectionsChange={handleOpenSectionsChange}
   >
    <ProductFormSection
     value="dimensions"
     title="Parça Ölçüleri ve Fiyatlar"
     contentClassName="space-y-4"
    >
     <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
       <Label
        htmlFor="product-price-total"
        className="shrink-0 text-sm font-medium leading-none"
       >
        Toplam fiyat (TL)
       </Label>
       <Input
        id="product-price-total"
        type="text"
        inputMode="decimal"
        value={form.priceTotal}
        onChange={(e) =>
         updateField("priceTotal", formatTurkishAmountInput(e.target.value))
        }
        maxLength={MAX_TURKISH_AMOUNT_INPUT_LENGTH}
        className="h-9 w-full tabular-nums sm:max-w-36"
        placeholder="Takım fiyatı"
        aria-label="Toplam fiyat"
       />
      </div>
      {lineItemsPriceSum > 0 ? (
       <p className="text-xs text-muted-foreground sm:text-right">
        Parça toplamı:{" "}
        <span className="font-medium tabular-nums text-foreground">
         {lineItemsPriceSum.toLocaleString("tr-TR")} TL
        </span>
       </p>
      ) : null}
     </div>
     <p className="text-xs text-muted-foreground">{ADMIN_PART_FIELDS_HINT}</p>

     {form.dimensionItems.map((item, index) => (
      <div
       key={`dim-${index}`}
       className="space-y-3 rounded-lg border p-4"
      >
       <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
         <Label>Parça (TR)</Label>
         <Input
          value={item.name}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "name", e.target.value)
          }
          maxLength={MAX_ADMIN_PART_NAME_LENGTH}
         />
        </div>
        <div className="space-y-1">
         <Label>Parça (EN)</Label>
         <Input
          value={item.nameEn}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "nameEn", e.target.value)
          }
          maxLength={MAX_ADMIN_PART_NAME_LENGTH}
         />
        </div>
       </div>
       <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
         <Label>Fiyat (TL)</Label>
         <Input
          type="text"
          inputMode="decimal"
          value={item.amount}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "amount", e.target.value)
          }
          maxLength={MAX_TURKISH_AMOUNT_INPUT_LENGTH}
          className="tabular-nums"
         />
        </div>
        <div className="space-y-1">
         <Label>Adet</Label>
         <Input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "quantity", e.target.value)
          }
          onBlur={(e) => {
           if (!e.target.value || Number(e.target.value) < 1) {
            updateListItem("dimensionItems", index, "quantity", "1");
           }
          }}
         />
        </div>
       </div>
       <div className="grid gap-3 md:grid-cols-3">
        <div className="space-y-1">
         <Label>Genişlik (cm)</Label>
         <Input
          type="number"
          value={item.widthCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "widthCm", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Derinlik (cm)</Label>
         <Input
          type="number"
          value={item.depthCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "depthCm", e.target.value)
          }
         />
        </div>
        <div className="space-y-1">
         <Label>Yükseklik (cm)</Label>
         <Input
          type="number"
          value={item.heightCm}
          onChange={(e) =>
           updateListItem("dimensionItems", index, "heightCm", e.target.value)
          }
         />
        </div>
       </div>
       <div className="flex justify-end border-t border-border/60 pt-3">
        <Button
         type="button"
         variant="outline"
         size="sm"
         className="cursor-pointer border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
         onClick={() => removeListItem("dimensionItems", index)}
         disabled={form.dimensionItems.length === 1}
        >
         <MdDeleteOutline aria-hidden />
         Parçayı kaldır
        </Button>
       </div>
      </div>
     ))}

     <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={() => addListItem("dimensionItems", { ...emptyDimensionItem })}
     >
      <MdAdd aria-hidden />
      Parça ekle
     </Button>
    </ProductFormSection>

    <ProductFormSection value="images" title="Görseller" contentClassName="space-y-4">
     <input
      ref={fileInputRef}
      type="file"
      accept="image/jpeg,image/png,image/webp"
      multiple
      onChange={handleUpload}
      disabled={uploading}
      className="sr-only"
     />
     <VariantImagesEditor
      images={form.images ?? []}
      productName={form.name}
      device={imageDevice}
      onDeviceChange={setImageDevice}
      uploading={uploading}
      uploadStatus={uploadStatus}
      onSelectFile={openUpload}
      onDropFiles={(files) => void uploadImageFiles(files)}
      onSetPrimary={setPrimaryImage}
      onMove={moveImage}
      onRemove={(imageIndex) =>
       updateImages((images) => images.filter((_, index) => index !== imageIndex))
      }
     />
    </ProductFormSection>
   </ProductFormSections>

   {!isEdit ? (
    <div className="flex justify-end">
     <Button
      type="submit"
      className="cursor-pointer gap-2"
      disabled={loading || uploading}
     >
      {loading ? "Kaydediliyor…" : "Oluştur"}
     </Button>
    </div>
   ) : null}
  </form>
 );
}