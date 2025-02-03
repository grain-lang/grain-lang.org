
<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import ChevronRightIcon from "./icons/ChevronRightIcon.svelte";

  export let className: string;
  export let onClick: MouseEventHandler<HTMLButtonElement>;

  const classList = `flex w-fit items-center rounded h-12 px-5 py-3 bg-gray-90 dark:bg-gray-variant-70 text-white font-semibold ${className ?? ""}`;
</script>

<button type="button" on:click={onClick} class={classList} {...$$restProps}>
  <slot />
  <ChevronRightIcon class="h-3.5 text-white ml-1.5" />
</button>
