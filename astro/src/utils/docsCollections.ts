export interface DocsCollection {
  title: string | null;
  slugPrefix: string;
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
    title: "Standard Libarary",
    slugPrefix: "stdlib",
  },
];
