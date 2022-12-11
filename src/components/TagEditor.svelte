<script lang="ts">
  import Plus from '../icons/Plus.svelte'
  import Tag from './Tag.svelte'
  import TagWrapper from './TagWrapper.svelte'

  export let tags = ['test1', 'test2']
  export let onChange: (tags: string[]) => void

  let isCreating = false
  let inputEl: HTMLInputElement

  $: isCreating && setTimeout(() => inputEl.focus(), 0)

  const tryCreate = (value: string) => {
    isCreating = false
    if (value.trim().length > 0) {
      onChange([...tags, value])
    }
  }

  function handleRemoveTag(tag: string) {
    const newTags = tags.filter((t) => t !== tag)
    onChange(newTags)
  }

  function handleInputKeyDown(
    e: KeyboardEvent & { currentTarget: HTMLInputElement }
  ) {
    switch (e.key) {
      case 'Enter':
        tryCreate(e.currentTarget.value)
        e.currentTarget.value = ''
        isCreating = true
        break

      case 'Escape':
        e.currentTarget.value = ''
        isCreating = false
        e.stopPropagation()
        break

      default:
        break
    }
  }
</script>

<div class="bg-slate-100 rounded-lg p-2 pb-0 mt-2">
  {#each tags as tag}
    <Tag label={tag} onRemove={handleRemoveTag} />
  {/each}

  {#if isCreating}
    <TagWrapper class="w-20">
      <input
        bind:this={inputEl}
        on:blur={(e) => tryCreate(e.currentTarget.value)}
        on:keydown={handleInputKeyDown}
        class="outline-none w-full leading-none inline-block"
      />
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
