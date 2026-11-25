export function normalizeInstagramHandle(value) {
 if (!value?.trim()) return "";

 const trimmed = value.trim();
 const urlMatch = trimmed.match(/instagram\.com\/([^/?#]+)/i);
 if (urlMatch?.[1]) {
  return urlMatch[1].replace(/^@/, "");
 }

 return trimmed.replace(/^@/, "").replace(/\/$/, "");
}

export function buildInstagramProfileUrl(handle) {
 const normalized = normalizeInstagramHandle(handle);
 if (!normalized) return undefined;

 return `https://www.instagram.com/${normalized}/`;
}