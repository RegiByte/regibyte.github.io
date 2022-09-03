<script>
  let count = 0

</script>

Contagem: {count}

<div>
  <button on:click={() => count++}>Incrementar</button>
  <button on:click={() => count--}>Decrementar</button>
</div>