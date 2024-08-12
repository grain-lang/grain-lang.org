import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeContentIntroTextTransformer from "./src/rehype/rehype-content-intro-text-transformer";
import rehypeAutolinkHeadingsConfig from "./src/rehype/rehype-autolink-headings-config";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const grainLang = JSON.parse(fs.readFileSync("./grain.json"));
const theme = JSON.parse(fs.readFileSync("./themes/github-dark-modified.json"));

// https://astro.build/config
export default defineConfig({
  vite: {
    // We want to include wasm files as raw data and then we glob for their urls
    assetsInclude: ["**/*.wasm"],
    resolve: {
      dedupe: ["buffer"],
      alias: {
        path: require.resolve("path-browserify"),
        stream: require.resolve("readable-stream/lib/ours/browser.js"),
        // This tricks the import into allowing us to use globs with `import.meta.glob`
        "@grain/stdlib": path.dirname(require.resolve("@grain/stdlib")),
      },
    },
    define: {
      "process.platform": JSON.stringify("posix"),
      "process.env.NODE_DEBUG": "false",
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        define: {
          global: "globalThis",
          process: JSON.stringify({}),
          "process.env": JSON.stringify({}),
          "process.platform": JSON.stringify("posix"),
          "process.env.NODE_DEBUG": "false",
        },
      },
    },
  },
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