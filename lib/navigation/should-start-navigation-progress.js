export function shouldStartNavigationProgress(
 anchor,
 { pathname, searchParams, origin }
) {
 if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
  return false;
 }

 const rawHref = anchor.getAttribute("href");
 if (!rawHref) return false;
 if (
  rawHref.startsWith("#") ||
  rawHref.startsWith("mailto:") ||
  rawHref.startsWith("tel:")
 ) {
  return false;
 }

 let url;
 try {
  url = new URL(anchor.href, origin);
 } catch {
  return false;
 }

 if (url.origin !== origin) return false;

 const currentQuery = searchParams?.toString() ?? "";
 const currentKey =
  pathname + (currentQuery ? `?${currentQuery}` : "");
 const nextKey = url.pathname + (url.search || "");

 return nextKey !== currentKey;
}