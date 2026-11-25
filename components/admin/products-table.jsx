"use client";

import { useMemo, useState } from "react";
import { MdSearch } from "react-icons/md";
import { AdminFormSelect } from "@/components/admin/admin-form-select";
import { AdminMobileList, AdminMobileListItem } from "@/components/admin/admin-mobile-list";
import { AdminTablePagination } from "@/components/admin/admin-table-pagination";
import { DeleteButton } from "@/components/admin/delete-button";
import { EditButton } from "@/components/admin/edit-button";
import { FeaturedOrderControl } from "@/components/admin/featured-order-control";
import { SortableTableHead } from "@/components/admin/sortable-table-head";
import { sortRows } from "@/lib/admin/table-sort";
import { useAdminTablePagination } from "@/lib/admin/use-admin-table-pagination";
import { getProductPriceTotal } from "@/lib/product-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const SORT_COLUMNS = {
 name: {
  label: "Ad",
  getValue: (product) => product.name,
 },
 category: {
  label: "Kategori",
  getValue: (product) => product.categoryGroup?.name ?? "",
 },
 price: {
  label: "Fiyat (TL)",
  getValue: (product) =>
   getProductPriceTotal(product) ?? Number.POSITIVE_INFINITY,
 },
 status: {
  label: "Durum",
  getValue: (product) =>
   (product.isPublished ? 2 : 0) + (product.isFeatured ? 1 : 0),
 },
};

const STATUS_FILTER_OPTIONS = [
 { value: "published", label: "Yayında" },
 { value: "draft", label: "Taslak" },
 { value: "featured", label: "Vitrin" },
];

const TABLE_TEXT_MAX_LENGTH = 20;

function truncateTableText(value) {
 if (value == null || value === "") return null;

 const text = String(value);
 if (text.length <= TABLE_TEXT_MAX_LENGTH) return text;

 return `${text.slice(0, TABLE_TEXT_MAX_LENGTH)}...`;
}

const EMPTY_FILTERS = {
 categoryGroupId: "",
 priceMin: "",
 priceMax: "",
 status: "",
 searchQuery: "",
};

function buildFilterOptions(products) {
 const categories = new Map();
 let priceMin = Number.POSITIVE_INFINITY;
 let priceMax = Number.NEGATIVE_INFINITY;

 for (const product of products) {
  if (product.categoryGroup) {
   categories.set(product.categoryGroup.id, product.categoryGroup.name);
  }
  const total = getProductPriceTotal(product);
  if (total != null) {
   priceMin = Math.min(priceMin, total);
   priceMax = Math.max(priceMax, total);
  }
 }

 return {
  categories: [...categories.entries()]
   .map(([value, label]) => ({ value, label }))
   .sort((a, b) => a.label.localeCompare(b.label, "tr")),
  priceBounds:
   priceMin === Number.POSITIVE_INFINITY
    ? null
    : { min: priceMin, max: priceMax },
  status: STATUS_FILTER_OPTIONS,
 };
}

function matchesFilters(product, filters) {
 if (filters.categoryGroupId && product.categoryGroup?.id !== filters.categoryGroupId) {
  return false;
 }
 const total = getProductPriceTotal(product);
 if (filters.priceMin) {
  const min = Number(filters.priceMin);
  if (!Number.isFinite(min) || total == null || total < min) return false;
 }
 if (filters.priceMax) {
  const max = Number(filters.priceMax);
  if (!Number.isFinite(max) || total == null || total > max) return false;
 }
 if (filters.status === "published" && !product.isPublished) return false;
 if (filters.status === "draft" && product.isPublished) return false;
 if (filters.status === "featured" && !product.isFeatured) return false;
 if (
  filters.searchQuery &&
  !product.name.toLocaleLowerCase("tr").includes(filters.searchQuery.toLocaleLowerCase("tr"))
 ) {
  return false;
 }

 return true;
}

export function ProductsTable({ products }) {
 const [sort, setSort] = useState({ key: null, dir: "asc" });
 const [filters, setFilters] = useState(EMPTY_FILTERS);
 const [searchInput, setSearchInput] = useState("");

 const filterOptions = useMemo(() => buildFilterOptions(products), [products]);

 const filteredProducts = useMemo(
  () => products.filter((product) => matchesFilters(product, filters)),
  [products, filters]
 );

 const sortedProducts = useMemo(() => {
  const column = SORT_COLUMNS[sort.key];
  if (!column) return filteredProducts;

  return sortRows(filteredProducts, column.getValue, sort.dir);
 }, [filteredProducts, sort]);

 const hasActiveFilters =
  Object.entries(filters).some(([key, value]) => key !== "searchQuery" && Boolean(value)) ||
  Boolean(filters.searchQuery);

 const {
  pageItems,
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  setPage,
  resetPage,
 } = useAdminTablePagination(sortedProducts);

 function handleSort(key) {
  resetPage();
  setSort((current) =>
   current.key === key
    ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" }
  );
 }

 function updateFilter(key, value) {
  resetPage();
  setFilters((current) => ({ ...current, [key]: value }));
 }

 function applySearch() {
  resetPage();
  setFilters((current) => ({ ...current, searchQuery: searchInput.trim() }));
 }

 function clearFilters() {
  resetPage();
  setSearchInput("");
  setFilters(EMPTY_FILTERS);
 }

 const filterLabelClass = "text-xs font-medium text-muted-foreground";

 return (
  <div>
   <div className="space-y-4 border-b border-border/60 bg-muted/10 px-4 py-4 sm:px-5">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
     <div className="flex min-w-0 flex-1 items-center gap-2">
      <Input
       type="search"
       placeholder="Ürün adı ara..."
       value={searchInput}
       onChange={(event) => setSearchInput(event.target.value)}
       onKeyDown={(event) => {
        if (event.key === "Enter") applySearch();
       }}
       className="h-10 min-w-0 flex-1 bg-background"
       aria-label="Ürün adı ara"
      />
      <Button
       type="button"
       className="h-10 shrink-0 cursor-pointer gap-1.5 px-4"
       onClick={applySearch}
      >
       <MdSearch className="size-4" aria-hidden />
       Ara
      </Button>
     </div>

     <div className="flex items-center gap-2 sm:shrink-0">
      <p className="text-sm text-muted-foreground">
       {hasActiveFilters
        ? `${filteredProducts.length} / ${products.length} ürün`
        : `${products.length} ürün`}
      </p>
      {hasActiveFilters ? (
       <Button
        type="button"
        variant="outline"
        size="sm"
        className="cursor-pointer"
        onClick={clearFilters}
       >
        Temizle
       </Button>
      ) : null}
     </div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.75fr)]">
     <div className="space-y-1.5">
      <Label className={filterLabelClass}>Kategori</Label>
      <AdminFormSelect
       allowEmpty
       emptyLabel="Tümü"
       placeholder="Tümü"
       value={filters.categoryGroupId}
       onValueChange={(value) => updateFilter("categoryGroupId", value)}
       options={filterOptions.categories}
       className="w-full"
      />
     </div>

     <div className="space-y-1.5">
      <Label className={filterLabelClass}>Durum</Label>
      <AdminFormSelect
       allowEmpty
       emptyLabel="Tümü"
       placeholder="Tümü"
       value={filters.status}
       onValueChange={(value) => updateFilter("status", value)}
       options={filterOptions.status}
       className="w-full"
      />
     </div>

     <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
      <Label className={filterLabelClass}>Fiyat (TL)</Label>
      <div className="flex h-10 items-center gap-2">
       <Input
        type="number"
        min="0"
        inputMode="numeric"
        placeholder={
         filterOptions.priceBounds
          ? filterOptions.priceBounds.min.toLocaleString("tr-TR")
          : "Min"
        }
        value={filters.priceMin}
        onChange={(event) => updateFilter("priceMin", event.target.value)}
        className="h-10 min-w-0 flex-1 bg-background px-2 tabular-nums"
        aria-label="Minimum fiyat"
       />
       <span className="shrink-0 text-sm text-muted-foreground" aria-hidden>
        –
       </span>
       <Input
        type="number"
        min="0"
        inputMode="numeric"
        placeholder={
         filterOptions.priceBounds
          ? filterOptions.priceBounds.max.toLocaleString("tr-TR")
          : "Max"
        }
        value={filters.priceMax}
        onChange={(event) => updateFilter("priceMax", event.target.value)}
        className="h-10 min-w-0 flex-1 bg-background px-2 tabular-nums"
        aria-label="Maksimum fiyat"
       />
      </div>
     </div>
    </div>
   </div>

   <AdminMobileList>
    {pageItems.length === 0 ? (
     <p className="px-4 py-10 text-center text-sm text-muted-foreground">
      Filtrelere uygun ürün bulunamadı.
     </p>
    ) : (
     pageItems.map((product) => {
      const total = getProductPriceTotal(product);
      const priceLabel = total != null ? `${total.toLocaleString("tr-TR")} TL` : null;

      return (
       <AdminMobileListItem
        key={product.id}
        title={product.name}
        meta={
         <>
          {product.categoryGroup?.name ? (
           <span className="text-sm text-muted-foreground">{product.categoryGroup.name}</span>
          ) : null}
          {priceLabel ? (
           <span className="text-sm font-medium tabular-nums">{priceLabel}</span>
          ) : null}
          <Badge variant={product.isPublished ? "default" : "secondary"}>
           {product.isPublished ? "Yayında" : "Taslak"}
          </Badge>
          {product.isFeatured ? (
           <FeaturedOrderControl
            productId={product.id}
            featuredOrder={product.featuredOrder}
           />
          ) : null}
         </>
        }
        actions={
         <>
          <DeleteButton
           href={`/api/admin/products/${product.id}`}
           confirmTitle="Ürünü sil?"
           confirmDescription="Bu ürün kalıcı olarak silinir."
          />
          <EditButton href={`/admin/products/${product.id}`} />
         </>
        }
       />
      );
     })
    )}
   </AdminMobileList>

   <div className="hidden md:block">
    <Table className="table-fixed">
     <TableHeader>
      <TableRow className="bg-muted/20 hover:bg-muted/20">
       {Object.entries(SORT_COLUMNS).map(([key, column]) => (
        <TableHead
         key={key}
         className={cn(
          "px-4 py-3 sm:px-5",
          key === "category" && "w-36",
          key === "price" && "w-32",
          key === "status" && "w-44"
         )}
        >
         <SortableTableHead
          label={column.label}
          columnKey={key}
          sortKey={sort.key}
          sortDir={sort.dir}
          onSort={handleSort}
         />
        </TableHead>
       ))}
       <TableHead className="w-28 px-4 py-3 text-center sm:px-5">İşlem</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {pageItems.length === 0 ? (
       <TableRow className="hover:bg-transparent">
        <TableCell colSpan={5} className="px-4 py-12 text-center text-muted-foreground sm:px-5">
         Filtrelere uygun ürün bulunamadı.
        </TableCell>
       </TableRow>
      ) : (
       pageItems.map((product) => {
        const total = getProductPriceTotal(product);
        const priceLabel = total != null ? total.toLocaleString("tr-TR") : null;

        return (
         <TableRow key={product.id}>
          <TableCell className="px-4 py-3 font-medium sm:px-5">
           {product.name}
          </TableCell>
          <TableCell
           className="px-4 py-3 sm:px-5"
           title={product.categoryGroup?.name ?? undefined}
          >
           {truncateTableText(product.categoryGroup?.name) ?? "-"}
          </TableCell>
          <TableCell
           className="px-4 py-3 tabular-nums sm:px-5"
           title={priceLabel ?? undefined}
          >
           {truncateTableText(priceLabel) ?? "-"}
          </TableCell>
          <TableCell className="px-4 py-3 sm:px-5">
           <div className="flex flex-wrap items-center gap-1">
            <Badge variant={product.isPublished ? "default" : "secondary"}>
             {product.isPublished ? "Yayında" : "Taslak"}
            </Badge>
            {product.isFeatured ? (
             <FeaturedOrderControl
              productId={product.id}
              featuredOrder={product.featuredOrder}
             />
            ) : null}
           </div>
          </TableCell>
          <TableCell className="px-4 py-3 sm:px-5">
           <div className="flex items-center justify-center gap-2">
            <DeleteButton
             href={`/api/admin/products/${product.id}`}
             confirmTitle="Ürünü sil?"
             confirmDescription="Bu ürün kalıcı olarak silinir."
            />
            <EditButton href={`/admin/products/${product.id}`} />
           </div>
          </TableCell>
         </TableRow>
        );
       })
      )}
     </TableBody>
    </Table>
   </div>

   <AdminTablePagination
    page={page}
    totalPages={totalPages}
    totalItems={totalItems}
    rangeStart={rangeStart}
    rangeEnd={rangeEnd}
    onPageChange={setPage}
   />
  </div>
 );
}