"use client";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { getDimensionItems } from "@/lib/product-utils";
import {
 productDetailTableCellClass,
 productDetailTableClass,
 productDetailTableHeadClass,
 productDetailTableWrapClass,
} from "@/lib/layout/product-styles";
import { cn } from "@/lib/utils";

function formatValue(value) {
 if (value == null) return "-";
 return String(value);
}

export function ProductDimensionsTable({ product, t, className }) {
 const items = getDimensionItems(product);

 if (items.length === 0) return null;

 const hasPieceNames = items.some((item) => item.name);

 return (
  <div className={cn(productDetailTableWrapClass, className)}>
   <Table className={productDetailTableClass}>
    <TableHeader>
     <TableRow className="border-charcoal/10 hover:bg-transparent">
      {hasPieceNames ? (
       <TableHead className={productDetailTableHeadClass}>
        {t("product.dimensionPiece")}
       </TableHead>
      ) : null}
      <TableHead
       className={cn(productDetailTableHeadClass, "text-center")}
      >
       {t("product.width")}
      </TableHead>
      <TableHead
       className={cn(productDetailTableHeadClass, "text-center")}
      >
       {t("product.depth")}
      </TableHead>
      <TableHead
       className={cn(productDetailTableHeadClass, "text-center")}
      >
       {t("product.height")}
      </TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {items.map((item, index) => (
      <TableRow
       key={item.name ?? `dimension-${index}`}
       className="border-charcoal/8 hover:bg-charcoal/2"
      >
       {hasPieceNames ? (
        <TableCell
         className={cn(
          productDetailTableCellClass,
          "font-medium text-charcoal/80"
         )}
        >
         {item.name?.trim() ?? "-"}
        </TableCell>
       ) : null}
       <TableCell
        className={cn(productDetailTableCellClass, "text-center tabular-nums")}
       >
        {formatValue(item.widthCm)}
       </TableCell>
       <TableCell
        className={cn(productDetailTableCellClass, "text-center tabular-nums")}
       >
        {formatValue(item.depthCm)}
       </TableCell>
       <TableCell
        className={cn(productDetailTableCellClass, "text-center tabular-nums")}
       >
        {formatValue(item.heightCm)}
       </TableCell>
      </TableRow>
     ))}
    </TableBody>
   </Table>
  </div>
 );
}
