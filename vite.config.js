const path = require("path");

const root = path.join(__dirname, "./playground_src");

module.exports = ({ mode }) => {
  return {
    root,
    base: mode === "development" ? "/" : "/try/",
    // Load styles and stuff from the root of the website
    publicDir: mode === "development" ? path.join(root, "..") : undefined,
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
      "process.env.NODE_DEBUG": "false",
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
        define: {
          global: "globalThis",
          process: JSON.stringify({}),
          "process.env": JSON.stringify({}),
          "process.env.NODE_DEBUG": "false",
        },
      },
    },

    build: {
      target: "es2020",
      outDir: "../try",
      emptyOutDir: true,
      assetsInlineLimit: 0,
    },
  };
};
