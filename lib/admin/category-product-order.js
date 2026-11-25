import { parseAdminInt } from "@/lib/admin/parse-admin-int";

export const CATEGORY_PRODUCT_ORDER_BY = [
 { sortOrder: "asc" },
 { name: "asc" },
];

function clampCategorySlot(requestedOrder, slotCount) {
 const normalized = Math.max(1, parseAdminInt(requestedOrder, slotCount || 1));
 return Math.min(normalized, Math.max(slotCount, 1));
}

export async function assignCategoryProductOrder(
 tx,
 productId,
 categoryGroupId,
 requestedOrder
) {
 if (!categoryGroupId) return null;

 await compactCategoryProductOrders(tx, categoryGroupId);

 const products = await tx.product.findMany({
  where: { categoryGroupId },
  orderBy: CATEGORY_PRODUCT_ORDER_BY,
  select: { id: true, sortOrder: true },
 });

 const current = products.find((item) => item.id === productId);
 if (!current) return null;

 const toSlot = clampCategorySlot(requestedOrder, products.length);
 const fromSlot = current.sortOrder;

 if (fromSlot === toSlot) return toSlot;

 const partner = products.find((item) => item.sortOrder === toSlot);
 if (!partner) return toSlot;

 await tx.product.update({
  where: { id: productId },
  data: { sortOrder: toSlot },
 });
 await tx.product.update({
  where: { id: partner.id },
  data: { sortOrder: fromSlot },
 });

 return toSlot;
}

export async function compactCategoryProductOrders(tx, categoryGroupId) {
 if (!categoryGroupId) return;

 const products = await tx.product.findMany({
  where: { categoryGroupId },
  orderBy: CATEGORY_PRODUCT_ORDER_BY,
  select: { id: true },
 });

 for (let index = 0; index < products.length; index += 1) {
  await tx.product.update({
   where: { id: products[index].id },
   data: { sortOrder: index + 1 },
  });
 }
}