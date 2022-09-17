<script>
  import {v4 as uuid} from 'uuid'
  let current = ''

  function createUuid() {
    current = uuid().toString()
  }
</script>

<div class='text-base text-zinc-700 dark:text-zinc-400'>
  <button on:click={createUuid} class='border rounded-lg px-2 py-1'>Generate a timestamped UUID here</button>

  {#if current}
    <span class='px-2'>{current}</span>
  {/if}

</div>