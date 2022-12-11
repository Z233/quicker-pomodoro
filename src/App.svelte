<script lang="ts">
  import { FocusMode, type Task } from './types'
  import TasksView from './views/TasksView.svelte'
  import TimeView from './views/TimeView.svelte'

  window.onscroll = function () {
    window.scrollTo(0, 0)
  }

  let mins = 30
  let next = true

  let handleNext = () => {
    next = true
  }

  let handleBack = () => {
    next = false
  }

  let handleStart = (task: Task) => {
    const list = task.config.list ?? []
    window.start(
      mins,
      task.name,
      task.config.focusMode === FocusMode.whiteList ? list : [],
      task.config.focusMode === FocusMode.blackList ? list : []
    )
  }
</script>

<div
  class="h-full w-full relative transition duration-300 bg-slate-100"
  class:-translate-x-full={next}
>
  <div class="grid place-content-center h-full w-full">
    <TimeView bind:mins onNext={handleNext} />
  </div>
  <div class="absolute left-full w-full h-full top-0">
    <TasksView onStart={handleStart} />
  </div>
</div>
