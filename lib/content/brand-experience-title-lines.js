export function normalizeBrandExperienceTitleLines(lines) {
 if (!Array.isArray(lines) || lines.length === 0) {
  return ["", ""];
 }
 if (lines.length === 1) {
  return [lines[0] ?? "", ""];
 }
 if (lines.length === 2) {
  return [lines[0] ?? "", lines[1] ?? ""];
 }
 return [
  lines[0] ?? "",
  lines
   .slice(1)
   .filter(Boolean)
   .join(" ")
   .trim(),
 ];
}