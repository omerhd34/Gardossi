import { t as translate } from "@/lib/i18n/translate";

export function getFavoritesSortOptions(dictionary) {
 const t = (key) => translate(dictionary, key);

 return [
  {
   value: "newest",
   label: t("catalog.sortNewest"),
  },
  {
   value: "price-asc",
   label: t("catalog.sortPriceAsc"),
  },
  {
   value: "price-desc",
   label: t("catalog.sortPriceDesc"),
  },
  {
   value: "recent",
   label: t("favorites.sortRecentlyAdded"),
  },
 ];
}

export function getSortOptions(dictionary) {
 const t = (key) => translate(dictionary, key);

 return [
  {
   value: "panel",
   label: t("catalog.sortPanelOrder"),
   triggerLabel: t("catalog.sortPanelOrder"),
  },
  {
   value: "newest",
   label: t("catalog.sortNewest"),
   triggerLabel: t("catalog.sortNewest"),
  },
  {
   value: "price-asc",
   label: t("catalog.sortPriceAsc"),
   triggerLabel: t("catalog.sortPriceAsc"),
  },
  {
   value: "price-desc",
   label: t("catalog.sortPriceDesc"),
   triggerLabel: t("catalog.sortPriceDesc"),
  },
 ];
}
