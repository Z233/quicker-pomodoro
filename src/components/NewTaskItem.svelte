<script lang="ts">
  import { onMount } from 'svelte'

  export let onCreated: (task: string) => any

  let taskName = ''
  let inputEl: HTMLInputElement

  onMount(() => {
    inputEl.focus()
  })

  const triggerCreated = () => {
    onCreated(taskName)
  }

  const handleBlur = () => {
    triggerCreated()
  }

  const handleKeyDown = (
    e: KeyboardEvent & { currentTarget: HTMLInputElement }
  ) => {
    if (e.key === 'Enter') {
      triggerCreated()
    }

    if (e.key === 'Escape') {
      e.currentTarget.blur()
    }
  }
</script>

<div
  class="w-full bg-white rounded-lg py-2 px-4 flex space-x-2 items-center group 
    border border-slate-200"
>
  <div
    class="text-sky-700 active:text-sky-700 hover:text-sky-800 
      w-4 h-4 border border-current rounded-full grid place-content-center"
  />
  <div class="select-none grow">
    <input
      bind:this={inputEl}
      class="outline-none"
      on:change={(e) => (taskName = e.currentTarget.value)}
      on:blur={handleBlur}
      on:keydown={handleKeyDown}
    />
  </div>
</div>
