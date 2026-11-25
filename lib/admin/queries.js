import { prisma } from "@/lib/prisma";

function toNumber(value) {
 return value != null ? Number(value) : null;
}

function serializeAdminProduct(product) {
 return {
  ...product,
  widthCm: toNumber(product.widthCm),
  heightCm: toNumber(product.heightCm),
  depthCm: toNumber(product.depthCm),
  cornerStandardSideACm: toNumber(product.cornerStandardSideACm),
  cornerStandardSideBCm: toNumber(product.cornerStandardSideBCm),
  priceTotal: toNumber(product.priceTotal),
  dimensionItems: Array.isArray(product.dimensionItems)
   ? product.dimensionItems.map((item) => ({
    ...item,
    widthCm: toNumber(item.widthCm),
    depthCm: toNumber(item.depthCm),
    heightCm: toNumber(item.heightCm),
    amount: toNumber(item.amount),
    quantity: toNumber(item.quantity),
   }))
   : [],
 };
}

const productAdminInclude = {
 categoryGroup: { select: { id: true, name: true, slug: true } },
 images: { orderBy: { sortOrder: "asc" } },
};

export async function getAdminStats() {
 const [categoryGroups, products, images] = await Promise.all([
  prisma.productCategoryGroup.count(),
  prisma.product.count(),
  prisma.image.count(),
 ]);

 return { categoryGroups, products, images };
}

export async function getAdminCategoryGroups() {
 return prisma.productCategoryGroup.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  include: { _count: { select: { products: true } } },
 });
}

export async function getAdminCategoryGroup(id) {
 return prisma.productCategoryGroup.findUnique({
  where: { id },
  include: {
   products: {
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    select: {
     id: true,
     name: true,
     slug: true,
     isPublished: true,
     images: {
      orderBy: { sortOrder: "asc" },
      take: 1,
      where: { isPrimary: true },
      select: { url: true },
     },
    },
   },
  },
 });
}

export async function getAdminProducts() {
 const products = await prisma.product.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  include: {
   categoryGroup: { select: { id: true, name: true, slug: true } },
  },
 });

 return products.map(serializeAdminProduct);
}

export async function getAdminProduct(id) {
 const product = await prisma.product.findUnique({
  where: { id },
  include: productAdminInclude,
 });

 if (!product) return null;

 return serializeAdminProduct(product);
}

export async function getCategoryGroupOptions() {
 return prisma.productCategoryGroup.findMany({
  orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  select: { id: true, name: true, slug: true },
 });
}
