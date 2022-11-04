<script>
  import ArrowDown from '../icons/ArrowDown.svelte'
  import ArrowUp from '../icons/ArrowUp.svelte'

  export let mins
  export let onIncrease = () => {}
  export let onDecrease = () => {}
</script>

<div
  class="flex items-center h-20 border border-gray-200 rounded border-b-gray-600"
>
  <div
    class="h-full border-r border-gray-200 flex flex-col justify-center text-center px-10"
  >
    <div class="text-3xl w-12">{mins}</div>
    <span class="text-xs text-gray-400"> 分钟 </span>
  </div>
  <div class="h-full grid">
    <button
      on:click={onIncrease}
      class="px-2 grid place-content-center 
      hover:bg-gray-100 hover:bg-opacity-50 active:bg-opacity-100"
    >
      <ArrowUp />
    </button>
    <button
      on:click={onDecrease}
      class="px-2 border-t border-gray-200 grid place-content-center  
      hover:bg-gray-100 hover:bg-opacity-50 active:bg-opacity-100"
    >
      <ArrowDown />
    </button>
  </div>
</div>
