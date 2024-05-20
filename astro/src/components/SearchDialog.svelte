<script lang="ts">
  import SearchIcon from "./icons/SearchIcon.svelte";

  let input = "";

  let results: any[] = [];
</script>

<dialog id="search" class="w-[500px] rounded">
  <div class="flex items-center gap-5">
    <SearchIcon class="w-6 h-6 stroke-color-primary" />
    <input
      bind:value={input}
      type="text"
      placeholder="Search documentation..."
      class="w-full outline-none" />
    <div class="rounded border border-color-dimmer text-color-dim-2 text-sm font-medium py-0.5 px-1.5">
      ESC
    </div>
  </div>
  <div>
    {#each results as result}
      <div>{result}</div>
    {:else}
      <div>No recent searches</div>
    {/each}
  </div>
  <div>
    Search by
  </div>
</dialog>
