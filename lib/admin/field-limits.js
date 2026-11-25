export const MAX_ADMIN_NAME_LENGTH = 50;
export const MAX_ADMIN_COLLECTION_NAME_LENGTH = 25;
export const MAX_ADMIN_CATEGORY_NAME_LENGTH = 25;
export const MAX_ADMIN_PART_NAME_LENGTH = 20;
export const MAX_ADMIN_SLUG_LENGTH = 50;

function nameFieldsHint(max) {
 return `Adlar en fazla ${max} karakter olabilir.`;
}

export const ADMIN_NAME_FIELDS_HINT = nameFieldsHint(MAX_ADMIN_NAME_LENGTH);
export const ADMIN_COLLECTION_NAME_FIELDS_HINT = nameFieldsHint(
 MAX_ADMIN_COLLECTION_NAME_LENGTH
);
export const ADMIN_CATEGORY_NAME_FIELDS_HINT = nameFieldsHint(MAX_ADMIN_CATEGORY_NAME_LENGTH);
export const ADMIN_PART_FIELDS_HINT = `Parça adları en fazla ${MAX_ADMIN_PART_NAME_LENGTH} karakter olabilir. Parça fiyatı isteğe bağlıdır; takım satışı için parça fiyatlarını boş bırakıp yalnızca toplam fiyatı girin.`;

function clamp(value, max) {
 return String(value ?? "").slice(0, max);
}

function tooLongMessage(fieldLabel, max) {
 return `${fieldLabel}: en fazla ${max} karakter.`;
}

function applyNameLimits(data, max) {
 if (!data) return data;

 return {
  ...data,
  name: clamp(data.name, max),
  nameEn: clamp(data.nameEn, max),
 };
}

function validateRequiredName(value, max, fieldLabel = "Ad (TR)") {
 const trimmed = value?.trim() ?? "";

 if (!trimmed) {
  return `${fieldLabel} gereklidir.`;
 }

 if (trimmed.length > max) {
  return tooLongMessage(fieldLabel, max);
 }

 return null;
}

function validateOptionalName(value, max, fieldLabel) {
 const trimmed = value?.trim() ?? "";

 if (!trimmed || trimmed.length <= max) {
  return null;
 }

 return tooLongMessage(fieldLabel, max);
}

export const clampAdminText = (value) => clamp(value, MAX_ADMIN_NAME_LENGTH);
export const clampAdminName = clampAdminText;
export const applyAdminNameLimits = (data) => applyNameLimits(data, MAX_ADMIN_NAME_LENGTH);
export const validateAdminName = (value, fieldLabel) =>
 validateRequiredName(value, MAX_ADMIN_NAME_LENGTH, fieldLabel);
export const validateAdminNameEn = (value) => validateAdminName(value, "Ad (EN)");
export const validateAdminOptionalText = (value, fieldLabel) =>
 validateOptionalName(value, MAX_ADMIN_NAME_LENGTH, fieldLabel);

export const clampAdminCollectionName = (value) =>
 clamp(value, MAX_ADMIN_COLLECTION_NAME_LENGTH);
export const applyAdminCollectionNameLimits = (data) =>
 applyNameLimits(data, MAX_ADMIN_COLLECTION_NAME_LENGTH);
export const validateAdminCollectionName = (value, fieldLabel) =>
 validateRequiredName(value, MAX_ADMIN_COLLECTION_NAME_LENGTH, fieldLabel);
export const validateAdminCollectionNameEn = (value) =>
 validateAdminCollectionName(value, "Ad (EN)");

export const clampAdminCategoryName = (value) =>
 clamp(value, MAX_ADMIN_CATEGORY_NAME_LENGTH);
export const applyAdminCategoryNameLimits = (data) =>
 applyNameLimits(data, MAX_ADMIN_CATEGORY_NAME_LENGTH);
export const validateAdminCategoryName = (value, fieldLabel) =>
 validateRequiredName(value, MAX_ADMIN_CATEGORY_NAME_LENGTH, fieldLabel);
export const validateAdminCategoryNameEn = (value) =>
 validateAdminCategoryName(value, "Ad (EN)");

export const clampAdminPartName = (value) => clamp(value, MAX_ADMIN_PART_NAME_LENGTH);
export const validateAdminOptionalPartName = (value, fieldLabel) =>
 validateOptionalName(value, MAX_ADMIN_PART_NAME_LENGTH, fieldLabel);

export function validateDimensionItemsText(items) {
 if (!Array.isArray(items)) return null;

 for (let index = 0; index < items.length; index += 1) {
  const item = items[index];
  const trError = validateOptionalName(
   item?.name,
   MAX_ADMIN_PART_NAME_LENGTH,
   `Parça ${index + 1} (TR)`
  );
  if (trError) return trError;

  const enError = validateOptionalName(
   item?.nameEn,
   MAX_ADMIN_PART_NAME_LENGTH,
   `Parça ${index + 1} (EN)`
  );
  if (enError) return enError;
 }

 return null;
}

export function applyProductTextLimits(product) {
 if (!product) return product;

 return {
  ...applyAdminNameLimits(product),
  dimensionItems: Array.isArray(product.dimensionItems)
   ? product.dimensionItems.map((item) => ({
    ...item,
    name: clampAdminPartName(item.name),
    nameEn: clampAdminPartName(item.nameEn),
   }))
   : product.dimensionItems,
 };
}
