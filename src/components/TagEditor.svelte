<script lang="ts">
  import Plus from '../icons/Plus.svelte'
  import Tag from './Tag.svelte'
  import TagWrapper from './TagWrapper.svelte'
  export let tags = ['test1', 'test2']

  let isCreating = false

  function handleRemoveTag() {}
</script>

<div class="bg-slate-100 rounded-lg p-2 pb-0 mt-2">
  {#each tags as tag}
    <Tag label={tag} onRemove={handleRemoveTag} />
  {/each}

  {#if isCreating}
    <TagWrapper class="w-20">
      <input class="outline-none w-full leading-none inline-block" />
    </TagWrapper>
  {:else}
    <button
      on:click={() => (isCreating = true)}
      class="inline-block bg-slate-50 text-slate-400 rounded-full p-1 hover:bg-white 
      mb-2 mr-2 leading-none"
    >
      <Plus class="w-6 h-6 inline-block" />
    </button>
  {/if}
</div>
