import type { CollectionEntry } from "astro:content";

export interface DocsCollection {
  title: string | null;
  slugPrefix: string;
}

export interface DocsEntry {
  collectionEntry: CollectionEntry<"docs">;
  section: string | null;
}

export const docsCollections: DocsCollection[] = [
  {
    title: null,
    slugPrefix: "intro",
  },
  {
    title: "The Guide",
    slugPrefix: "guide",
  },
  {
    title: "Reference",
    slugPrefix: "reference",
  },
  {
    title: "Standard Library",
    slugPrefix: "stdlib",
  },
];

export function sortEntries(docsEntries: CollectionEntry<"docs">[]): DocsEntry[] {
  return docsEntries.toSorted((x, y) => {
    if (x.slug.startsWith("stdlib") && y.slug.startsWith("stdlib")) {
      return Number(y.slug.includes("pervasives")) - Number(x.slug.includes("pervasives"));
    }

    return docsCollections.findIndex(coll => x.slug.startsWith(coll.slugPrefix))
      - docsCollections.findIndex(coll => y.slug.startsWith(coll.slugPrefix))
  }).map(collectionEntry => ({
    collectionEntry,
    section: docsCollections.find(coll => collectionEntry.slug.startsWith(coll.slugPrefix))!.title
  }));
}
