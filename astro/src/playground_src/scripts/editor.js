// TODO: I don't know if we actually need this
// import "monaco-editor/esm/vs/editor/editor.all.js";

import { StandaloneServices } from "vscode/services";
import getMessageServiceOverride from "vscode/service-override/messages";
import getConfigurationServiceOverride from "vscode/service-override/configuration";
import getTextmateServiceOverride, {
  setGrammars,
} from "vscode/service-override/textmate";
import getThemeServiceOverride, {
  setDefaultThemes,
} from "vscode/service-override/theme";
import getLanguageConfigurationServiceOverride, {
  setLanguageConfiguration,
} from "vscode/service-override/languageConfiguration";
import getLanguagesServiceOverride, {
  setLanguages,
} from "vscode/service-override/languages";
import { createConfiguredEditor } from "vscode/monaco";
import { configurationRegistry } from "vscode/service-override/configuration";

import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import oniPath from "vscode-oniguruma/release/onig.wasm?url";

import ThemesUrl from "./themes/themes.json?url";
import DarkPlusThemeUrl from "./themes/dark_plus.json?url";
import DarkVsThemeUrl from "./themes/dark_vs.json?url";
import LightPlusThemeUrl from "./themes/light_plus.json?url";
import LightVsThemeUrl from "./themes/light_vs.json?url";

import LanguageConfigurationUrl from "../../../../grain-language-server/editor-extensions/vscode/language-configuration.json?url";
import SyntaxUrl from "../../../../grain-language-server/editor-extensions/vscode/syntaxes/grain.json?url";

import PackageJsonUrl from "../../../../grain-language-server/editor-extensions/vscode/package.json?url";

window.MonacoEnvironment = {
  getWorker(moduleId, label) {
    switch (label) {
      case "editorWorkerService":
        return new EditorWorker();
    }
    throw new Error(`Unimplemented worker ${label} (${moduleId})`);
  },
};

StandaloneServices.initialize({
  ...getMessageServiceOverride(),
  ...getConfigurationServiceOverride(),
  ...getTextmateServiceOverride(async () => {
    const response = await fetch(oniPath);
    return response.arrayBuffer();
  }),
  ...getThemeServiceOverride(),
  ...getLanguageConfigurationServiceOverride(),
  ...getLanguagesServiceOverride(),
});

async function themeLoader(theme) {
  switch (theme.path) {
    case "./themes/dark_plus.json":
      return fetch(DarkPlusThemeUrl).then((res) => res.text());
    case "./themes/dark_vs.json":
      return fetch(DarkVsThemeUrl).then((res) => res.text());
    case "./themes/light_plus.json":
      return fetch(LightPlusThemeUrl).then((res) => res.text());
    case "./themes/light_vs.json":
      return fetch(LightVsThemeUrl).then((res) => res.text());
  }
  throw new Error("theme not found");
}

async function languageConfigLoader() {
  return fetch(LanguageConfigurationUrl).then((res) => res.text());
}

async function grammarLoader(grammar) {
  switch (grammar.language) {
    case "grain":
      return fetch(SyntaxUrl).then((res) => res.text());
  }
  throw new Error("grammar not found");
}

const playgroundDefaults = [
  {
    overrides: {
      "editor.fontSize": 16,
    },
  },
];

export async function createGrainEditor(id, value) {
  const metadata = await fetch(PackageJsonUrl).then((res) => res.json());

  const themes = await fetch(ThemesUrl).then((res) => res.json());

  configurationRegistry.registerDefaultConfigurations(playgroundDefaults);

  setDefaultThemes(themes, themeLoader);

  setLanguages(metadata.contributes.languages);
  setLanguageConfiguration(
    `./language-configuration.json`,
    languageConfigLoader
  );

  setGrammars(metadata.contributes.grammars, grammarLoader);

  return createConfiguredEditor(document.getElementById(id), {
    language: "grain",
    value,
    automaticLayout: false,
    minimap: {
      enabled: false,
    },
    renderLineHighlight: "none",
    scrollBeyondLastLine: false,
  });
}
