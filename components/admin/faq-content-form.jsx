"use client";

import { useState } from "react";
import { MdAdd, MdDeleteOutline, MdSave } from "react-icons/md";
import { toast } from "sonner";
import { DeleteButton } from "@/components/admin/delete-button";
import { slugify } from "@/lib/admin/slug";
import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function getCategoryKey(category, index) {
 return category.id ?? category.slug ?? `category-${index}`;
}

function getItemKey(categoryKey, item, itemIndex) {
 return `${categoryKey}-${item.id ?? itemIndex}`;
}

function getItemLabel(item, itemIndex) {
 const tr = item.questionTr?.trim();
 if (tr) return tr.length > 80 ? `${tr.slice(0, 80)}…` : tr;
 const en = item.questionEn?.trim();
 if (en) return en.length > 80 ? `${en.slice(0, 80)}…` : en;
 return `Soru ${itemIndex + 1}`;
}

export function FaqContentForm({ categories: initialCategories }) {
 const [categories, setCategories] = useState(initialCategories);
 const [openCategories, setOpenCategories] = useState([]);
 const [openItems, setOpenItems] = useState([]);

 async function refreshCategories() {
  const response = await fetch("/api/admin/faq");
  const data = await response.json();
  if (response.ok) setCategories(data);
 }

 async function saveCategory(category) {
  const isNew =
   !category.id || category.id.startsWith("default-") || category.id.startsWith("temp-");
  const response = await fetch(
   isNew ? "/api/admin/faq" : `/api/admin/faq/categories/${category.id}`,
   {
    method: isNew ? "POST" : "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
   }
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Kategori kaydedilemedi.");
  await refreshCategories();
  toast.success("Kategori kaydedildi.");
 }

 async function saveItem(item, categoryId) {
  if (!categoryId || categoryId.startsWith("default-") || categoryId.startsWith("temp-")) {
   throw new Error("Önce kategoriyi kaydedin.");
  }

  const isNew = !item.id || item.id.startsWith("default-") || item.id.startsWith("temp-");
  const response = await fetch(isNew ? "/api/admin/faq/items" : `/api/admin/faq/items/${item.id}`, {
   method: isNew ? "POST" : "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ ...item, categoryId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Soru kaydedilemedi.");
  await refreshCategories();
  toast.success("Soru kaydedildi.");
 }

 function updateCategory(index, patch) {
  setCategories((current) =>
   current.map((category, i) => (i === index ? { ...category, ...patch } : category))
  );
 }

 function updateItem(categoryIndex, itemIndex, patch) {
  setCategories((current) =>
   current.map((category, i) => {
    if (i !== categoryIndex) return category;
    return {
     ...category,
     items: category.items.map((item, j) => (j === itemIndex ? { ...item, ...patch } : item)),
    };
   })
  );
 }

 function addCategory() {
  const tempId = `temp-${Date.now()}`;
  setCategories((current) => [
   ...current,
   {
    id: tempId,
    slug: "",
    titleTr: "",
    titleEn: "",
    sortOrder: current.length,
    initialVisible: 4,
    items: [],
   },
  ]);
  setOpenCategories((current) => [...current, tempId]);
 }

 function removeItem(categoryIndex, itemIndex) {
  const category = categories[categoryIndex];
  const categoryKey = getCategoryKey(category, categoryIndex);
  const item = category.items[itemIndex];
  const itemKey = getItemKey(categoryKey, item, itemIndex);
  setOpenItems((current) => current.filter((key) => key !== itemKey));

  setCategories((current) =>
   current.map((category, i) => {
    if (i !== categoryIndex) return category;
    return {
     ...category,
     items: category.items
      .filter((_, j) => j !== itemIndex)
      .map((item, j) => ({ ...item, sortOrder: j })),
    };
   })
  );
 }

 function addItem(categoryIndex) {
  const category = categories[categoryIndex];
  const categoryKey = getCategoryKey(category, categoryIndex);
  const tempId = `temp-item-${Date.now()}`;

  setCategories((current) =>
   current.map((cat, index) => {
    if (index !== categoryIndex) return cat;
    const newItem = {
     id: tempId,
     questionTr: "",
     questionEn: "",
     answerTr: "",
     answerEn: "",
     sortOrder: 0,
    };
    return {
     ...cat,
     items: [
      newItem,
      ...cat.items.map((item, itemIndex) => ({
       ...item,
       sortOrder: itemIndex + 1,
      })),
     ],
    };
   })
  );
  setOpenItems((current) => [...current, `${categoryKey}-${tempId}`]);
 }

 return (
  <div className="space-y-6">
   <div className="flex items-center justify-between gap-3">
    <h2 className="text-lg font-semibold">Kategoriler ve Sorular</h2>
    <Button type="button" variant="outline" className="cursor-pointer gap-1.5" onClick={addCategory}>
     <MdAdd className="size-4" aria-hidden />
     Kategori ekle
    </Button>
   </div>

   <Accordion
    type="multiple"
    value={openCategories}
    onValueChange={setOpenCategories}
    className="space-y-3"
   >
    {categories.map((category, categoryIndex) => {
     const categoryKey = getCategoryKey(category, categoryIndex);
     const questionCount = category.items?.length ?? 0;

     return (
      <AccordionItem
       key={categoryKey}
       value={categoryKey}
       className="overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm"
      >
       <div className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex min-w-0 flex-1 items-center">
         <AccordionTrigger className="grid w-full min-w-0 cursor-pointer grid-cols-[8.5rem_5.5rem_1.25rem] items-center gap-x-3 py-0 text-base font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:col-start-3 **:data-[slot=accordion-trigger-icon]:row-start-1 **:data-[slot=accordion-trigger-icon]:justify-self-center **:data-[slot=accordion-trigger-icon]:ml-0 **:data-[slot=accordion-trigger-icon]:size-4">
          <span className="col-start-1 truncate">{category.titleTr || "Yeni kategori"}</span>
          <Badge
           variant="secondary"
           className="col-start-2 w-full justify-center font-normal tabular-nums"
          >
           {questionCount} soru
          </Badge>
         </AccordionTrigger>
        </div>
        <div className="flex shrink-0 items-center gap-2">
         {!category.id?.startsWith("default-") && category.id && !category.id.startsWith("temp-") ? (
          <DeleteButton
           href={`/api/admin/faq/categories/${category.id}`}
           label="Sil"
           onDeleted={refreshCategories}
          />
         ) : null}
         <Button
          type="button"
          size="icon-lg"
          className="cursor-pointer"
          aria-label="Kategoriyi kaydet"
          onClick={() =>
           saveCategory({
            ...category,
            slug: category.slug || slugify(category.titleTr),
           }).catch((error) => toast.error(error.message))
          }
         >
          <MdSave className="size-5" aria-hidden />
         </Button>
        </div>
       </div>
       <AccordionContent className="px-6 pb-6">
        <div className="space-y-6 border-t border-border/60 pt-6">
         <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
           <Label>Başlık (TR)</Label>
           <Input
            value={category.titleTr ?? ""}
            onChange={(e) => updateCategory(categoryIndex, { titleTr: e.target.value })}
           />
          </div>
          <div className="space-y-2">
           <Label>Title (EN)</Label>
           <Input
            value={category.titleEn ?? ""}
            onChange={(e) => updateCategory(categoryIndex, { titleEn: e.target.value })}
           />
          </div>
          <div className="space-y-2">
           <Label>İlk görünen soru sayısı</Label>
           <Input
            type="number"
            min="1"
            value={category.initialVisible ?? 4}
            onChange={(e) =>
             updateCategory(categoryIndex, { initialVisible: Number(e.target.value) || 4 })
            }
           />
          </div>
         </div>

         <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
           <Label>Sorular</Label>
           <Button
            type="button"
            variant="outline"
            size="icon-lg"
            className="cursor-pointer"
            aria-label="Soru ekle"
            onClick={() => addItem(categoryIndex)}
           >
            <MdAdd className="size-5" aria-hidden />
           </Button>
          </div>

          <Accordion
           type="multiple"
           value={openItems}
           onValueChange={setOpenItems}
           className="space-y-2"
          >
           {category.items.map((item, itemIndex) => {
            const itemKey = getItemKey(categoryKey, item, itemIndex);

            return (
             <AccordionItem
              key={itemKey}
              value={itemKey}
              className="overflow-hidden rounded-lg border border-border/60 bg-background"
             >
              <div className="flex items-center justify-between gap-3 px-4 py-3">
               <div className="flex min-w-0 flex-1 items-center">
                <AccordionTrigger className="grid w-full min-w-0 cursor-pointer grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-x-3 py-0 text-sm font-medium hover:no-underline **:data-[slot=accordion-trigger-icon]:col-start-2 **:data-[slot=accordion-trigger-icon]:row-start-1 **:data-[slot=accordion-trigger-icon]:justify-self-center **:data-[slot=accordion-trigger-icon]:ml-0 **:data-[slot=accordion-trigger-icon]:size-4">
                 <span className="truncate text-left">
                  {getItemLabel(item, itemIndex)}
                 </span>
                </AccordionTrigger>
               </div>
               <div className="flex shrink-0 items-center gap-2">
                {item.id && !item.id.startsWith("default-") && !item.id.startsWith("temp-") ? (
                 <DeleteButton
                  href={`/api/admin/faq/items/${item.id}`}
                  label="Sil"
                  onDeleted={refreshCategories}
                 />
                ) : (
                 <Button
                  type="button"
                  variant="destructive"
                  size="icon-lg"
                  className="cursor-pointer"
                  aria-label="Soruyu kaldır"
                  onClick={() => removeItem(categoryIndex, itemIndex)}
                 >
                  <MdDeleteOutline className="size-5" aria-hidden />
                 </Button>
                )}
                <Button
                 type="button"
                 size="icon-lg"
                 className="cursor-pointer"
                 aria-label="Soruyu kaydet"
                 onClick={() =>
                  saveItem(item, category.id).catch((error) => toast.error(error.message))
                 }
                >
                 <MdSave className="size-5" aria-hidden />
                </Button>
               </div>
              </div>
              <AccordionContent className="px-4 pb-4">
               <div className="grid gap-4 border-t border-border/60 pt-4 md:grid-cols-2">
                <div className="space-y-2">
                 <Label>Soru (TR)</Label>
                 <Textarea
                  rows={2}
                  value={item.questionTr ?? ""}
                  onChange={(e) =>
                   updateItem(categoryIndex, itemIndex, { questionTr: e.target.value })
                  }
                 />
                </div>
                <div className="space-y-2">
                 <Label>Question (EN)</Label>
                 <Textarea
                  rows={2}
                  value={item.questionEn ?? ""}
                  onChange={(e) =>
                   updateItem(categoryIndex, itemIndex, { questionEn: e.target.value })
                  }
                 />
                </div>
                <div className="space-y-2">
                 <Label>Cevap (TR)</Label>
                 <Textarea
                  rows={4}
                  value={item.answerTr ?? ""}
                  onChange={(e) =>
                   updateItem(categoryIndex, itemIndex, { answerTr: e.target.value })
                  }
                 />
                </div>
                <div className="space-y-2">
                 <Label>Answer (EN)</Label>
                 <Textarea
                  rows={4}
                  value={item.answerEn ?? ""}
                  onChange={(e) =>
                   updateItem(categoryIndex, itemIndex, { answerEn: e.target.value })
                  }
                 />
                </div>
               </div>
              </AccordionContent>
             </AccordionItem>
            );
           })}
          </Accordion>
         </div>
        </div>
       </AccordionContent>
      </AccordionItem>
     );
    })}
   </Accordion>
  </div>
 );
}
