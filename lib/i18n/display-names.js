export function getLocalizedCollectionName(collection, dictionary) {
 if (!collection) return null;

 return dictionary.collectionNames?.[collection.slug] ?? collection.name ?? null;
}

export function getLocalizedMenuProductLabel(slug, dictionary, fallback) {
 const trimmedFallback = fallback?.trim();
 if (trimmedFallback) return trimmedFallback;

 if (!slug) return fallback;

 return dictionary.menuProducts?.[slug] ?? fallback;
}
