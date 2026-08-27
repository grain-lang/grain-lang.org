import * as monaco from "monaco-editor";
import metadata from "../../grain-language-server/editor-extensions/vscode/package.json";
import { loadWASM } from "onigasm";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import grainGrammar from "../../grain-language-server/editor-extensions/vscode/syntaxes/grain.json";
import darkTheme from "../../themes/github-dark-modified-converted.json";
import lightTheme from "../../themes/github-light-converted.json";
import onigasmPath from "onigasm/lib/onigasm.wasm?url";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

const languageConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  // symbols used as brackets
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  // symbols that are auto closed when typing
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: "/*", close: "*/" },
  ],
  // symbols that that can be used to surround a selection
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  // Based on https://github.com/kevb34ns/auto-comment-blocks/blob/24f8ebc584e3e77d6a116a5a03a80c55008b44a3/src/rules.ts#L7-L40
  onEnterRules: [
    {
      // e.g. /** | */
      beforeText: new RegExp("^\\s*\\/\\*\\*(?!\\/)([^\\*]|\\*(?!\\/))*$"),
      afterText: new RegExp("^\\s*\\*\\/$"),
      action: {
        indentAction: monaco.languages.IndentAction.IndentOutdent,
        appendText: " * ",
      },
    },
    {
      // e.g. /** ...|
      beforeText: new RegExp("^\\s*\\/\\*\\*(?!\\/)([^\\*]|\\*(?!\\/))*$"),
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: " * ",
      },
    },
    {
      // e.g.  * ...|
      beforeText: new RegExp("^(\\t|(\\ ))*\\ \\*(\\ ([^\\*]|\\*(?!\\/))*)?$"),
      action: {
        indentAction: monaco.languages.IndentAction.None,
        appendText: "* ",
      },
    },
    {
      // e.g.  */|
      beforeText: new RegExp("^(\\t|(\\ ))*\\ \\*\\/\\s*$"),
      action: {
        indentAction: monaco.languages.IndentAction.None,
        removeText: 1,
      },
    },
  ],
};

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case "editorWorkerService":
        return new EditorWorker();
    }
    throw new Error(`Unimplemented worker ${label} (${moduleId})`);
  },
};

await loadWASM(onigasmPath);

const registry = new Registry({
  getGrammarDefinition: async () => {
    return {
      format: "json",
      content: grainGrammar,
    };
  },
});

const grammars = new Map([["grain", "source.grain"]]);

export async function createGrainEditor(id: string, value: string) {
  for (const language of metadata.contributes.languages) {
    monaco.languages.register(
      language as any as monaco.languages.ILanguageExtensionPoint,
    );
  }

  monaco.languages.setLanguageConfiguration("grain", languageConfiguration);
  monaco.editor.defineTheme("github-dark-modified", darkTheme as any);
  monaco.editor.defineTheme("github-light", lightTheme as any);

  const editor = monaco.editor.create(document.getElementById(id)!, {
    language: "grain",
    value,
    automaticLayout: false,
    fontFamily: "League Mono",
    fontSize: 16,
    minimap: {
      enabled: false,
    },
    renderLineHighlight: "none",
    scrollBeyondLastLine: false,
    theme: "github-dark-modified",
    padding: { top: 20, bottom: 20 },
    lineNumbersMinChars: 4,
  });

  await wireTmGrammars(monaco, registry, grammars, editor);
  return editor;
}
