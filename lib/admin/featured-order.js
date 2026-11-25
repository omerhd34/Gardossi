import { parseAdminInt } from "@/lib/admin/parse-admin-int";

export const FEATURED_PRODUCT_ORDER_BY = [
 { featuredOrder: "asc" },
 { sortOrder: "asc" },
 { name: "asc" },
];

function clampFeaturedSlot(requestedOrder, slotCount) {
 const normalized = Math.max(1, parseAdminInt(requestedOrder, slotCount || 1));
 return Math.min(normalized, Math.max(slotCount, 1));
}

export async function assignFeaturedOrder(tx, productId, requestedOrder) {
 await compactFeaturedOrders(tx);

 const featured = await tx.product.findMany({
  where: { isFeatured: true },
  orderBy: FEATURED_PRODUCT_ORDER_BY,
  select: { id: true, featuredOrder: true },
 });

 const current = featured.find((item) => item.id === productId);
 if (!current) return null;

 const toSlot = clampFeaturedSlot(requestedOrder, featured.length);
 const fromSlot = current.featuredOrder;

 if (fromSlot === toSlot) return toSlot;

 const partner = featured.find((item) => item.featuredOrder === toSlot);
 if (!partner) return toSlot;

 await tx.product.update({
  where: { id: productId },
  data: { featuredOrder: toSlot },
 });
 await tx.product.update({
  where: { id: partner.id },
  data: { featuredOrder: fromSlot },
 });

 return toSlot;
}

export async function compactFeaturedOrders(tx) {
 const featured = await tx.product.findMany({
  where: { isFeatured: true },
  orderBy: FEATURED_PRODUCT_ORDER_BY,
  select: { id: true },
 });

 for (let index = 0; index < featured.length; index += 1) {
  await tx.product.update({
   where: { id: featured[index].id },
   data: { featuredOrder: index + 1 },
  });
 }
}