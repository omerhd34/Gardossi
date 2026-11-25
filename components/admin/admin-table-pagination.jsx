"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function AdminTablePagination({
 page,
 totalPages,
 totalItems,
 rangeStart,
 rangeEnd,
 onPageChange,
}) {
 if (totalItems === 0) return null;

 return (
  <div className="flex flex-col gap-3 border-t border-border/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
   <p className="text-sm text-muted-foreground">
    {rangeStart}–{rangeEnd} / {totalItems} kayıt
   </p>

   <div className="flex w-full max-w-full items-center justify-center gap-1 overflow-x-auto pb-0.5 sm:w-auto sm:justify-start">
    <Button
     type="button"
     variant="outline"
     size="icon"
     className="cursor-pointer"
     disabled={page <= 1}
     aria-label="Önceki sayfa"
     onClick={() => onPageChange(page - 1)}
    >
     <ChevronLeftIcon className="size-4" />
    </Button>

    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
     <Button
      key={pageNumber}
      type="button"
      variant={pageNumber === page ? "default" : "outline"}
      size="icon"
      className={cn("cursor-pointer", pageNumber === page && "pointer-events-none")}
      aria-label={`Sayfa ${pageNumber}`}
      aria-current={pageNumber === page ? "page" : undefined}
      onClick={() => onPageChange(pageNumber)}
     >
      {pageNumber}
     </Button>
    ))}

    <Button
     type="button"
     variant="outline"
     size="icon"
     className="cursor-pointer"
     disabled={page >= totalPages}
     aria-label="Sonraki sayfa"
     onClick={() => onPageChange(page + 1)}
    >
     <ChevronRightIcon className="size-4" />
    </Button>
   </div>
  </div>
 );
}
