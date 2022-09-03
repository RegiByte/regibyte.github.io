<script>

    let count = 0
</script>

<div>Current Count: {count}</div>
<button on:click={() => count++}>increment</button>
<button on:click={() => count--}>decrement</button>