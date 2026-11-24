"use client";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { getCornerStandardSize } from "@/lib/product-utils";
import {
 productDetailBodyTextClass,
 productDetailTableCellClass,
 productDetailTableClass,
 productDetailTableHeadClass,
 productDetailTableWrapClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

export function ProductCornerStandardTable({ product, t, className }) {
 const size = getCornerStandardSize(product);

 if (!size) return null;

 return (
  <div className={cn("space-y-2 ultra:space-y-3 tv:space-y-4", className)}>
   <p className="text-xs font-semibold tracking-[0.12em] text-charcoal/55 uppercase ultra:text-sm tv:text-base">
    {t("product.standardConfig")}
   </p>
   <div className={productDetailTableWrapClass}>
    <Table className={productDetailTableClass}>
     <TableHeader>
      <TableRow className="border-charcoal/10 hover:bg-transparent">
       <TableHead className={productDetailTableHeadClass} />
       <TableHead
        className={cn(productDetailTableHeadClass, "text-center")}
       >
        {t("product.cornerStandardSideA")}
       </TableHead>
       <TableHead
        className={cn(productDetailTableHeadClass, "text-center")}
       >
        {t("product.cornerStandardSideB")}
       </TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      <TableRow className="border-charcoal/8 hover:bg-charcoal/2">
       <TableCell
        className={cn(
         productDetailTableCellClass,
         "font-medium text-charcoal/80"
        )}
       >
        {t("product.cornerStandardSize")}
       </TableCell>
       <TableCell
        className={cn(
         productDetailTableCellClass,
         "text-center font-medium tabular-nums text-charcoal/85"
        )}
       >
        {size.sideA}
       </TableCell>
       <TableCell
        className={cn(
         productDetailTableCellClass,
         "text-center font-medium tabular-nums text-charcoal/85"
        )}
       >
        {size.sideB}
       </TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </div>
   <p className={productDetailBodyTextClass}>{t("product.cornerStandardNote")}</p>
  </div>
 );
}
