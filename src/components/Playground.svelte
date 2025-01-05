<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import CompilerWorker from "../playground/compiler?worker";
  import lzString from "lz-string";
  import { createGrainEditor } from "../playground/editor";
  import * as store from "../store";
  import { codeExamples } from "../examples";
  import ButtonLink from "./ButtonLink.svelte";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import Tooltip from "./Tooltip.svelte";
  import * as monaco from "monaco-editor";

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  type State = "initializing" | "compiling" | "compiledSuccessfully" | "compiledWithErrors";

  function getLoadingState(state: State): string | null {
    switch (state) {
      case "initializing":
        return "Initializing";
      case "compiling":
        return "Compiling";
      default:
        return null;
    }
  }

  let output = "";
  let state: State = "initializing";
  $: loadingState = getLoadingState(state);

  let themeChangeUnsub: () => void;
  let worker: Worker;
  let editor: monaco.editor.IStandaloneCodeEditor;

  function compile() {
    state = "compiling";

    worker.postMessage({
      content: editor.getValue(),
    });

    worker.onmessage = ({ data }) => {
      if (data?.stderr) {
        state = "compiledWithErrors";
        output = data.stderr;
      } else {
        state = "compiledSuccessfully"
        if (data?.stdout) {
          output = data.stdout;
        } else {
          output = "< no program output >";
        }
      }
    };

    worker.onerror = (err) => {
      console.error(err);
    };

    editor.layout();
  }

  let showCopiedMessage = false;
  let existingCopyMessageTimeout: NodeJS.Timeout;
  function copyCode(): void {
    navigator.clipboard.writeText(window.location.href);
    showCopiedMessage = true;
    clearTimeout(existingCopyMessageTimeout);
    existingCopyMessageTimeout = setTimeout(() => showCopiedMessage = false, 750);
  }

  const switchCodeExample = (compressedCode: string) => () => {
    window.history.pushState(null, "", "?code=" + compressedCode);
    editor.setValue(lzString.decompressFromEncodedURIComponent(compressedCode));
  }

  onMount(async () => {
    worker = new CompilerWorker();
    worker.onerror = (err) => console.error(err);

    const urlParams = new URLSearchParams(window.location.search);
    const code = lzString.decompressFromEncodedURIComponent(urlParams.get("code")!)
      || 'module Playground\n\nprint("Hello, world!")\n';
    editor = await createGrainEditor("editor", code);

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    themeChangeUnsub = store.$selectedTheme.subscribe(selectedTheme => {
      monaco.editor.setTheme(selectedTheme === "light" || (!selectedTheme && !prefersDark) ? "github-light" : "github-dark-modified");
    });

    worker.addEventListener("message", ({ data }) => {
      if (data?.initialized) {
        compile();
      }
    });

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      const compressed = lzString.compressToEncodedURIComponent(code);
      const searchParams = new URLSearchParams({
        code: compressed
      });
      window.history.pushState(null, "", "?" + searchParams.toString());
    });

    function readjustForWidth() {
      editor.layout();
      if (window.innerWidth < 640) {
        editor.updateOptions({ lineNumbers: "off" })
      } else {
        editor.updateOptions({ lineNumbers: "on" })
      }
    }

    window.addEventListener(
      "resize",
      debounce(() => {
        readjustForWidth();
      }, 100)
    );

    readjustForWidth();
  });

  onDestroy(() => {
    themeChangeUnsub();
  });

</script>

<div>
  <div class="flex text-lg justify-between items-center px-4 lg:px-16 py-4">
    <ButtonLink onClick={compile} disabled={loadingState} className="w-full justify-center md:w-fit dark:disabled:bg-gray-variant-50 disabled:bg-[#9B9B9B]">Run</ButtonLink>
    <div class="hidden md:flex gap-6">
      <div class="relative">
        <div class="peer cursor-pointer hover:text-color-accent px-6 py-2">Examples</div>
        <div class="absolute z-10 left-1/2 -translate-x-1/2 hidden hover:grid peer-hover:grid grid-cols-2 px-2 py-2 rounded border border-gray-20 dark:border-purple-70 bg-white dark:bg-purple-90 w-96">
          {#each codeExamples as example}
            <button
              on:click={switchCodeExample(lzString.compressToEncodedURIComponent(example.code))}
              class="cursor-pointer hover:bg-gray-10 dark:hover:bg-purple-80 rounded px-4 py-2 text-left"
            >
              {example.name}
            </button>
          {/each}
        </div>
      </div>
      <div class="relative">
        <button on:click={copyCode} class="peer cursor-pointer hover:text-color-accent pl-6 pr-5 py-2">Share</button>
        <Tooltip>{showCopiedMessage ? "Copied!" : "Copy URL"}</Tooltip>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 h-[calc(100vh-3.5rem-5rem)] max-h-[calc(100vh-3.5rem-5rem)]">
    <div id="editor"></div>
    <section class="overflow-auto dark:bg-[#2F254B] bg-[#EFEFEF] {state === 'compiledWithErrors' ? 'border-4 border-red-500 dark:border-[#C43550] dark:bg-[#3D222C] bg-red-200' : ''}">
      {#if loadingState}
        <div class="flex items-center justify-center w-full h-full">
          <div class="flex flex-col gap-2 items-center">
            <LoadingSpinner />
            <div class="font-semibold text-sm">{loadingState}</div>
          </div>
        </div>
      {:else}
        <pre class="m-0 p-5 grow whitespace-pre-wrap">{output}</pre>
      {/if}
    </section>
  </div>
</div>
