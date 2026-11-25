export const DEFAULT_CATEGORY_DESCRIPTIONS_TR = {
 "oturma-gruplari": "Bahçe oturma grupları ve dış mekan koltuk takımları",
 "kose-gruplari":
  "Bahçe köşe takımları, ve modüler dış mekan oturma çözümleri",
 masalar:
  "Bahçe, balkon ve teraslar için şık masa takımları, Dayanıklı dış mekan yemek masaları ve sandalyeleri",
 "masa-gruplari":
  "Bahçe, balkon ve teraslar için şık masa takımları, Dayanıklı dış mekan yemek masaları ve sandalyeleri",
 salincak: "Bahçe salıncakları ve dış mekan salıncak modelleri",
 salincaklar: "Bahçe salıncakları ve dış mekan salıncak modelleri",
 sezlong: "Bahçe ve havuz başı şezlongları",
 sandalyeler: "Bahçe ve balkonlar için dayanıklı dış mekan sandalyeleri",
};

export const DEFAULT_CATEGORY_DESCRIPTIONS_EN = {
 "oturma-gruplari": "Garden seating sets and outdoor sofa collections",
 "kose-gruplari": "Garden corner sets and modular outdoor seating solutions",
 masalar:
  "Elegant table sets for gardens, balconies and terraces. Durable outdoor dining tables and chairs",
 "masa-gruplari":
  "Elegant table sets for gardens, balconies and terraces. Durable outdoor dining tables and chairs",
 salincak: "Garden swings and outdoor swing models",
 salincaklar: "Garden swings and outdoor swing models",
 sezlong: "Garden and poolside sun loungers",
 sandalyeler: "Durable outdoor chairs for gardens and balconies",
};

export function getDefaultCategoryDescription(slug, locale = "tr") {
 if (!slug) return null;
 const map =
  locale === "en"
   ? DEFAULT_CATEGORY_DESCRIPTIONS_EN
   : DEFAULT_CATEGORY_DESCRIPTIONS_TR;
 return map[slug] ?? null;
}

export function getResolvedCategoryDescription(group, locale = "tr") {
 if (!group) return null;

 return locale === "en"
  ? group.descriptionEn?.trim() || group.description?.trim() || null
  : group.description?.trim() || group.descriptionEn?.trim() || null;
}