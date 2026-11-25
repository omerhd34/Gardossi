import {
 buildInstagramProfileUrl,
 normalizeInstagramHandle,
} from "@/lib/instagram-handle";

export function normalizePhoneAdminInput(value) {
 const digits = value?.replace(/\D/g, "") ?? "";
 if (!digits) return "";

 if (digits.startsWith("90") && digits.length >= 11) {
  return `0${digits.slice(2, 12)}`;
 }

 if (!digits.startsWith("0") && digits.length === 10) {
  return `0${digits}`;
 }

 if (digits.startsWith("0") && digits.length === 11) {
  return digits;
 }

 return digits;
}

export function normalizePhoneForStorage(value) {
 return normalizePhoneAdminInput(value);
}

function toInternationalDigits(digits) {
 if (!digits) return "";

 if (digits.startsWith("90")) return digits;
 if (digits.startsWith("0")) return `90${digits.slice(1)}`;
 if (digits.length === 10) return `90${digits}`;

 return digits;
}

export function formatSitePhone(value) {
 if (!value) return "";

 const digits = value.replace(/\D/g, "");
 if (!digits) return value.trim();

 let local = digits;
 if (local.startsWith("90") && local.length >= 11) {
  local = `0${local.slice(2)}`;
 } else if (!local.startsWith("0") && local.length === 10) {
  local = `0${local}`;
 }

 if (local.length === 11 && local.startsWith("0")) {
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7, 9)} ${local.slice(9, 11)}`;
 }

 return value.trim();
}

export function buildSitePhoneHref(value) {
 const digits = value?.replace(/\D/g, "") ?? "";
 if (!digits) return undefined;

 const international = toInternationalDigits(digits);
 return international ? `tel:+${international}` : undefined;
}

export function buildWhatsAppHref(phoneRaw, whatsappRaw) {
 const raw = whatsappRaw?.trim() || phoneRaw?.trim() || "";
 const digits = raw.replace(/\D/g, "");
 const international = toInternationalDigits(digits);
 if (!international) return null;

 return `https://wa.me/${international}`;
}

export function buildSocialLinks(instagramHandle) {
 const href = buildInstagramProfileUrl(instagramHandle);
 return href ? [{ label: "Instagram", href }] : [];
}

export function buildSiteContactFromFields({ phone, email, instagramHandle, whatsappNumber }) {
 const phoneRaw = normalizePhoneForStorage(phone);
 const emailValue = email?.trim() ?? "";
 const handle = normalizeInstagramHandle(instagramHandle);
 const instagramUrl = buildInstagramProfileUrl(handle);
 const whatsappRaw = whatsappNumber?.trim()
  ? normalizePhoneForStorage(whatsappNumber)
  : "";

 return {
  phoneRaw,
  phone: formatSitePhone(phoneRaw) || phoneRaw,
  phoneHref: buildSitePhoneHref(phoneRaw),
  email: emailValue || undefined,
  instagramHandle: handle || undefined,
  instagramUrl,
  whatsappHref: buildWhatsAppHref(phoneRaw, whatsappRaw),
  socialLinks: buildSocialLinks(handle),
 };
}

export const EMPTY_SITE_CONTACT = buildSiteContactFromFields({
 phone: "",
 email: "",
 instagramHandle: "",
 whatsappNumber: "",
});