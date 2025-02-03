import type { CollectionEntry } from "astro:content";
import path from "node:path";

export interface DocEntry {
  sectionTitle: string | null;
  sectionOrder: number;
  title: string;
  slug: string;
  id: string;
  collectionEntry: CollectionEntry<"docs">;
}

export const docsCollections = (version: string): {
  title: string | null;
  slugPrefix: string;
}[] => [
  {
    title: null,
    slugPrefix: "intro"
  },
  {
    title: "The Guide",
    slugPrefix: "guide"
  },
  {
    title: "Reference",
    slugPrefix: "reference"
  },
  {
    title: "Standard Library",
    slugPrefix: `${version}/stdlib`
  },
];
export const getDocumentation = (
  version: string,
  docCollection: CollectionEntry<"docs">[]
): DocEntry[] => {
  const docs: DocEntry[] = [];
  const versionTag = version.replaceAll(".", "");
  const collections = docsCollections(versionTag);
  // Get Documentation
  for (const entry of docCollection) {
    const sectionIndex = collections.findIndex(({ slugPrefix }) => entry.id.startsWith(slugPrefix));
    if (sectionIndex == -1) continue;
    const section = collections[sectionIndex];
    if (section == null) throw new Error(`Impossible: No section found for ${entry.id}`);
    const slugParts = entry.id.split(path.sep);
    const isVersioned = slugParts[0] == versionTag;
    docs.push({
      sectionTitle: section.title,
      sectionOrder: sectionIndex,
      title: entry.id.replace(`${section.slugPrefix}/`, ""),
      slug: isVersioned ? slugParts.slice(1).join(path.sep) : entry.id,
      id: entry.id,
      collectionEntry: entry
    });
  }
  // Sort Documentation
  const sortedEntries = docs.toSorted((x, y) => {
    if (x.sectionTitle == "stdlib" && y.sectionTitle == "stdlib") {
      return Number(x.id.includes("pervasives")) - Number(y.id.includes("pervasives"));
    } else {
      return x.sectionOrder - y.sectionOrder;
    }
  })
  return sortedEntries;
};
