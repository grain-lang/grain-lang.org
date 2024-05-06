<script lang="ts">
  import { onMount } from "svelte";
  import { selectedTheme, type Theme } from "../store";
  import SunIcon from "./icons/SunIcon.svelte";
  import MoonIcon from "./icons/MoonIcon.svelte";
  import DesktopIcon from "./icons/DesktopIcon.svelte";

  let open = false;
  let theme = selectedTheme.get();
  let prefersDark = false;

  onMount(() => {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  })

  $: isDarkTheme = theme === "dark" || (theme === "system" && prefersDark);

  function applyTheme(newTheme: Theme) {
    open = false;
    theme = newTheme;

    if (["light", "dark"].includes(newTheme)) {
      localStorage.setItem("theme", newTheme);
      selectedTheme.set(newTheme);
    } else {
      localStorage.removeItem("theme");
      selectedTheme.set(prefersDark ? "dark" : "light");
    }

  }
</script>

<div>
  <a role="button" on:click={() => open = !open}>
    {#if isDarkTheme}
      <MoonIcon
        class={`w-6 h-6 lg:w-5 lg:h-5 stroke-gray-30 dark:stroke-gray-50 hover:stroke-gray-40 ${
          theme !== "system"
            ? "stroke-purple-50 dark:stroke-purple-30 hover:stroke-purple-50 dark:hover:stroke-purple-20"
            : ""
        }`}
      />
    {:else}
      <SunIcon
        class={`w-6 h-6 lg:w-5 lg:h-5 stroke-gray-30 dark:stroke-gray-50 hover:stroke-gray-40 ${
          theme !== "system"
            ? "stroke-purple-50 dark:stroke-purple-30 hover:stroke-purple-50 dark:hover:stroke-purple-20"
            : ""
        }`}
      />
    {/if}
  </a>
  <div
    class={`${
      open ? "absolute" : "hidden"
    } w-36 -right-4 top-12 p-2 shadow rounded border border-gray-20 dark:border-purple-70 bg-white dark:bg-purple-90 z-50`}
  >
    <ul>
      <li>
        <a
          role="button"
          on:click={() => applyTheme("light")}
          class={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
            theme === "light"
              ? "text-purple-50 dark:text-purple-30"
              : "text-gray-60 dark:text-gray-50"
          }`}
        >
          <SunIcon
            class={`h-5 w-5 stroke-gray-50 ${
              theme === "light"
                ? "stroke-purple-50 dark:stroke-purple-30"
                : ""
            } mr-3`}
          />{" "}
          Light
        </a>
      </li>
      <li>
        <a
          role="button"
          on:click={() => applyTheme("dark")}
          class={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
            theme === "dark"
              ? "text-purple-50 dark:text-purple-30"
              : "text-gray-60 dark:text-gray-50"
          }`}
        >
          <MoonIcon
            class={`h-5 w-5 stroke-gray-50 ${
              theme === "dark"
                ? "stroke-purple-50 dark:stroke-purple-30"
                : ""
            } mr-3`}
          />{" "}
          Dark
        </a>
      </li>
      <li>
        <a
          role="button"
          on:click={() => applyTheme("system")}
          class={`flex items-center font-medium hover:bg-gray-10 dark:hover:bg-purple-80 p-2 rounded ${
            theme === "system"
              ? "text-purple-50 dark:text-purple-30"
              : "text-gray-60 dark:text-gray-50"
          }`}
        >
          <DesktopIcon
            class={`h-5 w-5 stroke-gray-50 ${
              theme === "system"
                ? "stroke-purple-50 dark:stroke-purple-30"
                : ""
            } mr-3`}
          />{" "}
          System
        </a>
      </li>
    </ul>
  </div>
</div>
