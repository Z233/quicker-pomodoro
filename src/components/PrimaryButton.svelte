<script>
  import PlayOutline from '../icons/PlayOutline.svelte'

  export let onClick = () => {}
</script>

<button
  on:click={onClick}
  class="flex bg-sky-700 text-white px-4 py-2 rounded-md hover:opacity-95 
  shadow-[0_3px] shadow-sky-900 active:translate-y-[3px] active:shadow-none 
  transition duration-75 border-b border-sky-900 drop-shadow-md"
  ><slot />
</button>
