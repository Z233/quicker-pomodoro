<script lang="ts">
  import TagWrapper from './TagWrapper.svelte'
  import Cancel from '../icons/Cancel.svelte'

  export let label
  export let onRemove
</script>

<TagWrapper
  class={Boolean(onRemove) ? 'select-none pr-7' : 'select-none'}
>
  {label}
  <button
    on:click={() => onRemove(label)}
    class="absolute right-2  text-slate-400 hover:text-slate-600"
  >
    <Cancel class="w-4 inline-block ml-1" />
  </button>
</TagWrapper>
