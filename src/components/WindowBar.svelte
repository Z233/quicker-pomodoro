<script lang='ts'>
  import Cancel from "../icons/Cancel.svelte";
</script>

<div
  class='relative w-full bg-sky-900 flex justify-end' 
>
  <div
    class='absolute inset-0 z-0'
    style='-webkit-app-region: drag'
  />
  <div 
    class='relative z-10 w-8 h-7 p-1 grid place-content-center transition duration-75 hover:bg-red-400 text-white'
    style='-webkit-app-region: no-drag'
  >
    <Cancel class='h-4' />
  </div>
</div>