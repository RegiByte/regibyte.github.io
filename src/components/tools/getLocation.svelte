<script>
  let currentLocation = ''

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      currentLocation = `Lat ${coords.latitude}, Long ${coords.longitude}`
    }, err => {
      alert('was not possible to determine current location')
    })
  }
</script>

<div class='text-base text-zinc-700 dark:text-zinc-400'>
  <button on:click={getCurrentLocation} class='border rounded-lg px-2 py-1'>Get Current GeoLocation here</button>

  {#if currentLocation}
    <span class='px-2'>{currentLocation}</span>
  {/if}

</div>