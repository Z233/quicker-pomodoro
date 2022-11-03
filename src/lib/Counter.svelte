<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button
  on:click={increment}
  class="rounded-lg border border-transparent px-4 py-2 bg-gray-100 hover:bg-opacity-80 
  focus:ring outline-none"
>
  count is {count}
</button>
