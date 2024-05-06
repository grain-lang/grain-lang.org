import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import svelte from "@astrojs/svelte";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { h } from "hastscript";
import { fromHtml } from "hast-util-from-html";
import rehypeDocsIntroTextTransformer from './src/rehype-docs-intro-text-transformer';

// const grainLang = JSON.parse(fs.readFileSync("../grain-language-server/editor-extensions/vscode/syntaxes/grain.json"));
const grainLang = JSON.parse(fs.readFileSync("./grain.json"));
const theme = JSON.parse(fs.readFileSync("./themes/github-dark-modified.json"));
const anchorLinkSvg = fs.readFileSync("./src/images/anchor-link.svg");

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), svelte()],
  redirects: {
    "/docs": "/docs/intro",
    "/docs/guide": "/docs/guide/basics"
  },
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutoLinkHeadings,
        {
          behavior: "after",
          group: h("div", { class: "relative group" }),
          properties: { class: "absolute top-2 -left-8 pr-2 opacity-0 group-hover:opacity-100" },
          content: h("span", fromHtml(anchorLinkSvg))
        }
      ],
      rehypeDocsIntroTextTransformer
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