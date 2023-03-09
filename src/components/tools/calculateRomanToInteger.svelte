<script>
  // A svelte component that uses the romanToIntegers function in path: ../../utils/romanToIntegers.ts
  // the component contains a string input and a calculate button
  // the result will be displayed at the bottom
  // styling should be done with tailwindcss


  import { romanToIntegers } from '../../utils/romanToIntegers';

  let numeral = null;
  let result = '';
</script>

<div class='flex text-base text-zinc-700 dark:text-zinc-400 gap-2'>

  <input
    class='bg-white px-2 rounded-md w-80 border border-neutral-500 ring-0 dark:bg-transparent'
    type='tel'
    bind:value={numeral}
    placeholder='Type in a roman numeral'
  />

  <button
    class='px-4 py-2 bg-blue-500 text-white rounded-md'
    on:click={() => {
      if (!numeral) return
      result = romanToIntegers(numeral.toUpperCase());
    }}>To Integer
  </button>

  {#if result}
    <div class='flex items-center border px-3 rounded-md'>
      <span class='text-2xl'>{result}</span>
    </div>
  {/if}
</div>