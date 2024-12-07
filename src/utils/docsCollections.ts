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

export function sectionAndSortEntries(docsEntries: CollectionEntry<"docs">[]): DocsEntry[] {
  return docsEntries.toSorted((x, y) => {
    if (x.id.startsWith("stdlib") && y.id.startsWith("stdlib")) {
      return Number(y.id.includes("pervasives")) - Number(x.id.includes("pervasives"));
    }

    return docsCollections.findIndex(coll => x.id.startsWith(coll.slugPrefix))
      - docsCollections.findIndex(coll => y.id.startsWith(coll.slugPrefix))
  }).map(collectionEntry => ({
    collectionEntry,
    section: docsCollections.find(coll => collectionEntry.id.startsWith(coll.slugPrefix))!.title
  }));
}
