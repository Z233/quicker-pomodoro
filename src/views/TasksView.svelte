<script>
  import Divider from '../components/Divider.svelte'
  import PrimaryButton from '../components/PrimaryButton.svelte'
  import StartButton from '../components/PrimaryButton.svelte'
  import TaskRadio from '../components/TaskRadio.svelte'
  import PlayOutline from '../icons/PlayOutline.svelte'

  let tasks = window.tasks

  export let onTaskSelect = (...agrs) => {}
  export let onBack = () => {}
  export let onStart = () => {}

  let formRef

  let handleFormChanged = () => {
    const data = new FormData(formRef)
    const selectedTask = data.get('task')
    onTaskSelect(selectedTask)
  }
</script>

<div class="flex flex-col items-center space-y-8 w-full">
  <div>想要做点什么呢</div>
  <div
    class="border border-gray-200 w-60 rounded-md px-4 p-2 space-y-4"
  >
    <form on:change={handleFormChanged} bind:this={formRef}>
      <fieldset>
        {#each tasks as task, i}
          <TaskRadio bind:task />
          {#if i < tasks.length - 1}
            <Divider />
          {/if}
        {/each}
      </fieldset>
    </form>
  </div>
  <div class="text-center">
    <PrimaryButton onClick={onStart}>
      <span class="mr-1"><PlayOutline /></span> 开始
    </PrimaryButton>
    <span
      on:keypress={onBack}
      on:click={onBack}
      class="text-xs text-gray-400 underline mt-4 inline-block cursor-pointer"
      >← 返回</span
    >
  </div>
</div>
