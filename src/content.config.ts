import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog"}),
  schema: ({ image }) => z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    author: z.string(),
    cover: image(),
    coverAttribution: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
  }),
});

const docsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs"}),
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  "blog": blogCollection,
  "docs": docsCollection
};
