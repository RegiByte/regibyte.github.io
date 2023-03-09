<script>
  // A svelte component that uses the integersToRomans function in path: ../../utils/integersToRomans.ts
  // the component contains an integer input and a calculate button
  // the result will be displayed at the bottom
  // styling should be done with tailwindcss
  import { integersToRomans } from '../../utils/integersToRomans';

  let integer = null;
  let result = null;
</script>

<div class='flex text-base text-zinc-700 dark:text-zinc-400 gap-2'>

  <input
    class='bg-white px-2 rounded-md w-80 border border-neutral-500 ring-0 dark:bg-transparent'
    min='1'
    type='number'
    bind:value={integer} placeholder='Type in an integer number'
  />

  <button
    class='px-4 py-2 bg-blue-500 text-white rounded-md'
    on:click={() => {
      if (integer && integer > 0) {
        result = integersToRomans(integer);
      }
    }}>To Roman Numeral
  </button>

  {#if result}
    <div class='flex items-center border px-3 rounded-md'>
      <span class='text-2xl'>{result}</span>
    </div>
  {/if}
</div>