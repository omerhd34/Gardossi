import { PrismaClient } from "@prisma/client";
import {
 DEFAULT_CATEGORY_DESCRIPTIONS_EN,
 DEFAULT_CATEGORY_DESCRIPTIONS_TR,
} from "../lib/content/default-category-descriptions.js";

const prisma = new PrismaClient();

async function main() {
 const groups = await prisma.productCategoryGroup.findMany();
 let updated = 0;

 for (const group of groups) {
  const fallbackTr = DEFAULT_CATEGORY_DESCRIPTIONS_TR[group.slug]?.trim() || null;
  const fallbackEn = DEFAULT_CATEGORY_DESCRIPTIONS_EN[group.slug]?.trim() || null;
  const description = group.description?.trim() ? group.description : fallbackTr;
  const descriptionEn = group.descriptionEn?.trim()
   ? group.descriptionEn
   : fallbackEn;

  if (
   description === group.description &&
   descriptionEn === group.descriptionEn
  ) {
   continue;
  }

  await prisma.productCategoryGroup.update({
   where: { id: group.id },
   data: { description, descriptionEn },
  });
  updated += 1;
  console.log(`  ${group.slug}: açıklama güncellendi`);
 }

 console.log(`\nTamamlandı: ${updated} kategori grubu güncellendi.`);
}

main()
 .catch((error) => {
  console.error(error);
  process.exit(1);
 })
 .finally(() => prisma.$disconnect());