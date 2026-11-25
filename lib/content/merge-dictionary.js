import { normalizeAboutHeroImages } from "@/lib/content/about-hero-images";
import { normalizeBrandExperienceTitleLines } from "@/lib/content/brand-experience-title-lines";
import { buildHeroSlidesFromContent } from "@/lib/content/home-hero-slides";
import {
 normalizePageHeroImages,
 resolvePageHeroImages,
} from "@/lib/content/page-hero-images";

function pickLocaleContent(block, locale) {
 if (!block) return null;
 return locale === "en" ? block.contentEn : block.contentTr;
}

function buildFaqFromCategories(baseFaq, faqCategories, locale) {
 if (!faqCategories?.length) {
  return baseFaq;
 }

 const isEn = locale === "en";

 return {
  ...baseFaq,
  categories: faqCategories.map((category) => ({
   id: category.slug,
   title: isEn ? category.titleEn || category.titleTr : category.titleTr,
   initialVisible: category.initialVisible,
   items: category.items.map((item) => ({
    question: isEn ? item.questionEn || item.questionTr : item.questionTr,
    answer: isEn ? item.answerEn || item.answerTr : item.answerTr,
   })),
  })),
  tabs: Object.fromEntries(
   faqCategories.map((category) => [
    category.slug,
    isEn ? category.titleEn || category.titleTr : category.titleTr,
   ])
  ),
 };
}

export function mergeDictionaryWithCms(baseDictionary, locale, { blocks, faqCategories }) {
 const merged = { ...baseDictionary };
 const blockMap = blocks ?? {};

 const about = pickLocaleContent(blockMap.about, locale);
 if (about) {
  const normalizedAbout = normalizeAboutHeroImages(about);
  merged.about = {
   ...normalizedAbout,
   heroEyebrow: baseDictionary.about.heroEyebrow,
   pageTitle: baseDictionary.about.pageTitle,
   visualTitleLines: baseDictionary.about.visualTitleLines,
   visualCta: baseDictionary.about.visualCta,
  };
 }

 const missionVision = pickLocaleContent(blockMap.missionVision, locale);
 const valuesBlock = pickLocaleContent(blockMap.values, locale);
 const commitmentsBlock = pickLocaleContent(blockMap.commitments, locale);
 const normalizedMissionVision = normalizePageHeroImages(missionVision ?? {});
 const normalizedValues = normalizePageHeroImages(valuesBlock ?? {});
 const normalizedCommitments = normalizePageHeroImages(commitmentsBlock ?? {});

 if (missionVision) {
  merged.missionVision = {
   ...normalizedMissionVision,
   heroEyebrow: baseDictionary.missionVision.heroEyebrow,
   pageTitle: baseDictionary.missionVision.pageTitle,
   missionTitle: baseDictionary.missionVision.missionTitle,
   visionTitle: baseDictionary.missionVision.visionTitle,
   valuesTitle: baseDictionary.missionVision.valuesTitle,
   commitmentsTitle: baseDictionary.missionVision.commitmentsTitle,
   ctaTitle:
    normalizedMissionVision.ctaTitle ?? baseDictionary.missionVision.ctaTitle,
   ctaDescription:
    normalizedMissionVision.ctaDescription ??
    baseDictionary.missionVision.ctaDescription,
   ctaProducts:
    normalizedMissionVision.ctaProducts ?? baseDictionary.missionVision.ctaProducts,
   ctaContact:
    normalizedMissionVision.ctaContact ?? baseDictionary.missionVision.ctaContact,
   values:
    valuesBlock?.values ??
    missionVision.values ??
    baseDictionary.missionVision.values,
   commitments:
    commitmentsBlock?.commitments ??
    missionVision.commitments ??
    baseDictionary.missionVision.commitments,
  };
 }

 merged.values = {
  ...normalizedValues,
  pageTitle: baseDictionary.missionVision.valuesTitle,
  heroImageAlt: baseDictionary.missionVision.heroImageAlt,
  heroImage: valuesBlock ? normalizedValues.heroImage : normalizedMissionVision.heroImage,
  heroImages: valuesBlock ? normalizedValues.heroImages : normalizedMissionVision.heroImages,
  values:
   valuesBlock?.values ??
   missionVision?.values ??
   baseDictionary.missionVision.values,
 };

 merged.commitments = {
  ...normalizedCommitments,
  pageTitle: baseDictionary.missionVision.commitmentsTitle,
  heroImageAlt: baseDictionary.missionVision.heroImageAlt,
  heroImage: commitmentsBlock
   ? normalizedCommitments.heroImage
   : normalizedMissionVision.heroImage,
  heroImages: commitmentsBlock
   ? normalizedCommitments.heroImages
   : normalizedMissionVision.heroImages,
  commitments:
   commitmentsBlock?.commitments ??
   missionVision?.commitments ??
   baseDictionary.missionVision.commitments,
 };

 merged.missionVision = {
  ...merged.missionVision,
  values: merged.values.values,
  commitments: merged.commitments.commitments,
 };

 merged.faq = buildFaqFromCategories(merged.faq, faqCategories, locale);
 merged.faq.pageTitle = baseDictionary.faq.pageTitle;
 merged.faq.categoriesAria = baseDictionary.faq.categoriesAria;
 merged.faq.showMore = baseDictionary.faq.showMore;

 const faqSettings = pickLocaleContent(blockMap.faq, locale);
 if (faqSettings) {
  const normalizedFaqSettings = normalizePageHeroImages(faqSettings);
  merged.faq.heroImage = normalizedFaqSettings.heroImage;
  merged.faq.heroImages = normalizedFaqSettings.heroImages;
  merged.faq.intro = normalizedFaqSettings.intro ?? merged.faq.intro;
 }

 const homeBrandExperience = pickLocaleContent(blockMap.homeBrandExperience, locale);
 const normalizedHomeBrandExperience = normalizePageHeroImages(
  homeBrandExperience ?? {}
 );

 merged.home = {
  ...merged.home,
  brandExperienceTitleLines: normalizeBrandExperienceTitleLines(
   normalizedHomeBrandExperience.brandExperienceTitleLines ??
   merged.home.brandExperienceTitleLines
  ),
  brandExperienceDescription:
   normalizedHomeBrandExperience.brandExperienceDescription ??
   merged.home.brandExperienceDescription,
  brandExperienceAlt:
   normalizedHomeBrandExperience.brandExperienceAlt ?? merged.home.brandExperienceAlt,
  brandExperienceCta: baseDictionary.home.brandExperienceCta,
  brandExperienceImages: resolvePageHeroImages(
   "homeBrandExperience",
   normalizedHomeBrandExperience
  ),
 };

 const homeShowcase = pickLocaleContent(blockMap.homeShowcase, locale);
 if (homeShowcase) {
  merged.home = {
   ...merged.home,
   categoriesDescription:
    homeShowcase.categoriesDescription ?? merged.home.categoriesDescription,
   featuredDescription:
    homeShowcase.featuredDescription ?? merged.home.featuredDescription,
  };
 }

 const homeHero = pickLocaleContent(blockMap.homeHero, locale);
 merged.hero = {
  ...merged.hero,
  slidesData: buildHeroSlidesFromContent(homeHero, baseDictionary),
 };

 const contact = pickLocaleContent(blockMap.contact, locale);
 if (contact) {
  merged.contact = {
   ...merged.contact,
   seoIntro: contact.seoIntro ?? merged.contact.seoIntro,
   weekdayHours: contact.weekdayHours ?? merged.contact.weekdayHours,
   weekendHours: contact.weekendHours ?? merged.contact.weekendHours,
  };
 }

 return merged;
}
