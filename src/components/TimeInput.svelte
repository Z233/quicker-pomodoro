<script>
  import ArrowDown from '../icons/ArrowDown.svelte'
  import ArrowUp from '../icons/ArrowUp.svelte'
</script>

<div
  class="flex items-center h-20 border border-gray-200 rounded border-b-gray-600"
>
  <div
    class="h-full border-r border-gray-200 flex flex-col justify-center text-center px-10"
  >
    <span class="text-3xl">30 </span><span
      class="text-xs text-gray-400"
    >
      mins
    </span>
  </div>
  <div class="h-full grid">
    <button class="px-2 grid place-content-center hover:bg-gray-50">
      <ArrowUp />
    </button>
    <button
      class="px-2 border-t border-gray-200 grid place-content-center  hover:bg-gray-50"
    >
      <ArrowDown />
    </button>
  </div>
</div>
