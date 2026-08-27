import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import path from "node:path";
import { createRequire } from "node:module";
import * as fs from "node:fs";
import rehypeContentIntroTextTransformer from "./src/rehype/rehype-content-intro-text-transformer";
import rehypeAutolinkHeadingsConfig from "./src/rehype/rehype-autolink-headings-config";
import rehypeTableWrapper from "./src/rehype/rehype-table-wrapper";

const require = createRequire(import.meta.url);

const grainLang = JSON.parse(
  fs.readFileSync(
    "./grain-language-server/editor-extensions/vscode/syntaxes/grain.json",
  ),
);
const theme = JSON.parse(
  fs.readFileSync("./themes/github-dark-modified-lighter.json"),
);

// https://astro.build/config
export default defineConfig({
  site: "https://grain-lang.org",
  vite: {
    // We want to include wasm files as raw data and then we glob for their urls
    assetsInclude: ["**/*.wasm", "**/*.gro"],
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
    build: {
      target: "esnext",
    },
  },

  integrations: [tailwind(), svelte()],

  redirects: {
    "/docs": "/docs/intro",
    "/docs/guide": "/docs/guide/basics",
  },

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsConfig],
      rehypeContentIntroTextTransformer,
      rehypeTableWrapper,
    ],
    shikiConfig: {
      theme: theme,
      transformers: [
        {
          code(node) {
            // Hack to distinguish block code from inline code in tailwind-typography
            node.properties["data-block"] = "true";
          },
        },
      ],
      langs: [{ ...grainLang, name: "grain" }],
    },
  },
});
