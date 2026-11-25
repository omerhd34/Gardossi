export function parseAdminInt(value, fallback = 0) {
 if (value === undefined) return fallback;
 if (value === null || value === "") return 0;

 const parsed = Number(value);
 return Number.isFinite(parsed) ? Math.trunc(parsed) : fallback;
}

export function parseAdminRank(value, fallback = 1) {
 const parsed = parseAdminInt(value, fallback);
 return Math.max(1, parsed || 1);
}