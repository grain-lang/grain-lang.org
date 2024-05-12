import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeContentIntroTextTransformer from './src/rehype/rehype-content-intro-text-transformer';
import rehypeAutolinkHeadingsConfig from './src/rehype/rehype-autolink-headings-config';

const grainLang = JSON.parse(fs.readFileSync("./grain.json"));
const theme = JSON.parse(fs.readFileSync("./themes/github-dark-modified.json"));

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  redirects: {
    "/docs": "/docs/intro",
    "/docs/guide": "/docs/guide/basics"
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        rehypeAutolinkHeadingsConfig,
      ],
      rehypeContentIntroTextTransformer
    ],
    shikiConfig: {
      theme: theme,
      transformers: [
        {
          code(node) {
            node.properties["data-block"] = "true";
          }
        }
      ],
      langs: [{...grainLang, name: "grain"}]
    }
  }
});