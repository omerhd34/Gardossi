import { prisma } from "@/lib/prisma";
import { getDefaultContentBlocks, getDefaultFaqCategories } from "@/lib/content/default-blocks";
import { CONTENT_BLOCK_KEYS } from "@/lib/content/keys";
import { mergeDictionaryWithCms } from "@/lib/content/merge-dictionary";
import { normalizePageHeroImages } from "@/lib/content/page-hero-images";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const faqInclude = {
 items: { orderBy: [{ sortOrder: "asc" }, { questionTr: "asc" }] },
};

export async function getFaqCategories() {
 return prisma.faqCategory.findMany({
  orderBy: [{ sortOrder: "asc" }, { titleTr: "asc" }],
  include: faqInclude,
 });
}

export async function getContentBlocksMap() {
 const blocks = await prisma.contentBlock.findMany();
 return Object.fromEntries(blocks.map((block) => [block.key, block]));
}

export async function getCmsData() {
 const [blocks, faqCategories] = await Promise.all([
  getContentBlocksMap(),
  getFaqCategories(),
 ]);

 return { blocks, faqCategories };
}

export async function getMergedDictionary(locale) {
 const baseDictionary = getDictionary(locale);
 const { blocks, faqCategories } = await getCmsData();

 return mergeDictionaryWithCms(baseDictionary, locale, { blocks, faqCategories });
}

function normalizeContentBlock(key, block, defaults) {
 if (!defaults) return null;

 if (!block) {
  return { key, ...defaults, updatedAt: null };
 }

 return {
  ...block,
  contentTr: { ...defaults.contentTr, ...block.contentTr },
  contentEn: { ...defaults.contentEn, ...block.contentEn },
 };
}

export async function getAdminContentBlock(key) {
 const defaults = getDefaultContentBlocks()[key];
 if (!defaults) return null;

 const block = await prisma.contentBlock.findUnique({ where: { key } });
 const normalized = normalizeContentBlock(key, block, defaults);

 if ((key === "values" || key === "commitments") && !block) {
  const mission = await prisma.contentBlock.findUnique({ where: { key: "missionVision" } });
  if (!mission) return normalized;

  const listKey = key === "values" ? "values" : "commitments";
  const heroTr = normalizePageHeroImages(mission.contentTr ?? {});
  const heroEn = normalizePageHeroImages(mission.contentEn ?? {});

  return {
   ...normalized,
   contentTr: {
    ...normalized.contentTr,
    [listKey]: mission.contentTr?.[listKey] ?? normalized.contentTr[listKey],
    heroImage: heroTr.heroImage,
    heroImages: heroTr.heroImages,
   },
   contentEn: {
    ...normalized.contentEn,
    [listKey]: mission.contentEn?.[listKey] ?? normalized.contentEn[listKey],
    heroImage: heroEn.heroImage,
    heroImages: heroEn.heroImages,
   },
  };
 }

 return normalized;
}

export async function getAdminContentBlocks() {
 const stored = await getContentBlocksMap();
 const defaults = getDefaultContentBlocks();

 return CONTENT_BLOCK_KEYS.map((key) => {
  if (stored[key]) return stored[key];
  return { key, ...defaults[key], updatedAt: null };
 });
}

export async function getAdminFaqCategories() {
 const categories = await getFaqCategories();
 if (categories.length > 0) return categories;

 return getDefaultFaqCategories().map((category, index) => ({
  id: `default-${category.slug}`,
  ...category,
  items: category.items.map((item, itemIndex) => ({
   id: `default-${category.slug}-${itemIndex}`,
   categoryId: `default-${category.slug}`,
   ...item,
  })),
  _isDefault: true,
  _defaultIndex: index,
 }));
}

export async function seedContentBlocks() {
 const defaults = getDefaultContentBlocks();

 for (const [key, value] of Object.entries(defaults)) {
  await prisma.contentBlock.upsert({
   where: { key },
   create: { key, contentTr: value.contentTr, contentEn: value.contentEn },
   update: {},
  });
 }
}

export async function seedFaqCategories() {
 const existing = await prisma.faqCategory.count();
 if (existing > 0) return;

 const defaults = getDefaultFaqCategories();

 for (const category of defaults) {
  const { items, ...data } = category;

  await prisma.faqCategory.create({
   data: {
    ...data,
    items: {
     create: items,
    },
   },
  });
 }
}
