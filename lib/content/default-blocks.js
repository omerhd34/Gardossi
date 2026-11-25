import tr from "../i18n/dictionaries/tr.js";
import en from "../i18n/dictionaries/en.js";

import { EMPTY_PAGE_HERO_IMAGES } from "./page-hero-images.js";
import { getDefaultHomeHeroSlides } from "./home-hero-slides.js";

export function getDefaultContentBlocks() {
 return {
  about: {
   contentTr: { ...tr.about, heroImage: "", heroImages: { ...EMPTY_PAGE_HERO_IMAGES } },
   contentEn: { ...en.about, heroImage: "", heroImages: { ...EMPTY_PAGE_HERO_IMAGES } },
  },
  missionVision: {
   contentTr: { ...tr.missionVision, heroImage: "", heroImages: { ...EMPTY_PAGE_HERO_IMAGES } },
   contentEn: { ...en.missionVision, heroImage: "", heroImages: { ...EMPTY_PAGE_HERO_IMAGES } },
  },
  values: {
   contentTr: {
    values: tr.missionVision.values.map((value) => ({ ...value })),
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
   contentEn: {
    values: en.missionVision.values.map((value) => ({ ...value })),
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
  },
  commitments: {
   contentTr: {
    commitments: [...tr.missionVision.commitments],
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
   contentEn: {
    commitments: [...en.missionVision.commitments],
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
  },
  faq: {
   contentTr: {
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
    intro: tr.faq.intro,
   },
   contentEn: {
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
    intro: en.faq.intro,
   },
  },
  homeBrandExperience: {
   contentTr: {
    brandExperienceAlt: tr.home.brandExperienceAlt,
    brandExperienceTitleLines: [...tr.home.brandExperienceTitleLines],
    brandExperienceDescription: tr.home.brandExperienceDescription,
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
   contentEn: {
    brandExperienceAlt: en.home.brandExperienceAlt,
    brandExperienceTitleLines: [...en.home.brandExperienceTitleLines],
    brandExperienceDescription: en.home.brandExperienceDescription,
    heroImage: "",
    heroImages: { ...EMPTY_PAGE_HERO_IMAGES },
   },
  },
  homeShowcase: {
   contentTr: {
    categoriesDescription: tr.home.categoriesDescription,
    featuredDescription: tr.home.featuredDescription,
   },
   contentEn: {
    categoriesDescription: en.home.categoriesDescription,
    featuredDescription: en.home.featuredDescription,
   },
  },
  homeHero: {
   contentTr: { slides: getDefaultHomeHeroSlides(tr) },
   contentEn: { slides: getDefaultHomeHeroSlides(en) },
  },
  contact: {
   contentTr: {
    seoIntro: tr.contact.seoIntro,
    weekdayHours: tr.contact.weekdayHours,
    weekendHours: tr.contact.weekendHours,
    phone: "05437451916",
    email: "gardossigarden@gmail.com",
    instagramHandle: "gardossi",
    whatsappNumber: "",
   },
   contentEn: {
    seoIntro: en.contact.seoIntro,
    weekdayHours: en.contact.weekdayHours,
    weekendHours: en.contact.weekendHours,
    phone: "05437451916",
    email: "gardossigarden@gmail.com",
    instagramHandle: "gardossi",
    whatsappNumber: "",
   },
  },
 };
}

export function getDefaultFaqCategories() {
 return tr.faq.categories.map((category, index) => {
  const enCategory = en.faq.categories.find((item) => item.id === category.id);

  return {
   slug: category.id,
   titleTr: category.title,
   titleEn: enCategory?.title ?? category.title,
   sortOrder: index,
   initialVisible: category.initialVisible,
   items: category.items.map((item, itemIndex) => {
    const enItem = enCategory?.items[itemIndex];

    return {
     questionTr: item.question,
     questionEn: enItem?.question ?? item.question,
     answerTr: item.answer,
     answerEn: enItem?.answer ?? item.answer,
     sortOrder: itemIndex,
    };
   }),
  };
 });
}
