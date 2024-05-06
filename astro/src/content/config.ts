import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.date(),
    author: z.string(),
    cover: z.string(),
    coverAttribution: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
  }),
});

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
  'docs': docsCollection,
};
