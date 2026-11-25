"use client";

import { useMemo, useState } from "react";
import { AdminMobileList, AdminMobileListItem } from "@/components/admin/admin-mobile-list";
import { AdminTablePagination } from "@/components/admin/admin-table-pagination";
import { DeleteButton } from "@/components/admin/delete-button";
import { EditButton } from "@/components/admin/edit-button";
import { SortableTableHead } from "@/components/admin/sortable-table-head";
import { sortRows } from "@/lib/admin/table-sort";
import { useAdminTablePagination } from "@/lib/admin/use-admin-table-pagination";
import { Badge } from "@/components/ui/badge";
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
  getValue: (group) => group.name,
 },
 products: {
  label: "Ürün",
  getValue: (group) => group._count.products,
 },
 status: {
  label: "Durum",
  getValue: (group) => group.isPublished,
 },
};

export function CategoryGroupsTable({ groups }) {
 const [sort, setSort] = useState({ key: null, dir: "asc" });

 const sortedGroups = useMemo(() => {
  const column = SORT_COLUMNS[sort.key];
  if (!column) return groups;

  return sortRows(groups, column.getValue, sort.dir);
 }, [groups, sort]);

 const {
  pageItems,
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  setPage,
  resetPage,
 } = useAdminTablePagination(sortedGroups);

 function handleSort(key) {
  resetPage();
  setSort((current) =>
   current.key === key
    ? { key, dir: current.dir === "asc" ? "desc" : "asc" }
    : { key, dir: "asc" }
  );
 }

 return (
  <div>
   <AdminMobileList>
    {pageItems.map((group) => (
     <AdminMobileListItem
      key={group.id}
      title={group.name}
      meta={
       <>
        <span className="text-sm text-muted-foreground">{group._count.products} ürün</span>
        <Badge variant={group.isPublished ? "default" : "secondary"}>
         {group.isPublished ? "Yayında" : "Taslak"}
        </Badge>
       </>
      }
      actions={
       <>
        <DeleteButton
         href={`/api/admin/category-groups/${group.id}`}
         confirmTitle="Kategori grubunu sil?"
         confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
        />
        <EditButton href={`/admin/categories/${group.id}`} />
       </>
      }
     />
    ))}
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
          key === "name" && "w-auto",
          key === "products" && "w-24",
          key === "status" && "w-32"
         )}
        >
         <SortableTableHead
          label={column.label}
          columnKey={key}
          sortKey={sort.key}
          sortDir={sort.dir}
          onSort={handleSort}
          centered={key === "products"}
         />
        </TableHead>
       ))}
       <TableHead className="w-28 px-4 py-3 text-center sm:px-5">İşlem</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      {pageItems.map((group) => (
       <TableRow key={group.id}>
        <TableCell className="px-4 py-3 font-medium sm:px-5">{group.name}</TableCell>
        <TableCell className="px-4 py-3 text-center tabular-nums sm:px-5">
         {group._count.products}
        </TableCell>
        <TableCell className="px-4 py-3 sm:px-5">
         <Badge variant={group.isPublished ? "default" : "secondary"}>
          {group.isPublished ? "Yayında" : "Taslak"}
         </Badge>
        </TableCell>
        <TableCell className="px-4 py-3 sm:px-5">
         <div className="flex items-center justify-center gap-2">
          <DeleteButton
           href={`/api/admin/category-groups/${group.id}`}
           confirmTitle="Kategori grubunu sil?"
           confirmDescription="Bu gruba bağlı ürünlerin kategori bilgisi kaldırılır."
          />
          <EditButton href={`/admin/categories/${group.id}`} />
         </div>
        </TableCell>
       </TableRow>
      ))}
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
