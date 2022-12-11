<script lang="ts">
  import TasksView from './views/TasksView.svelte'
  import TimeView from './views/TimeView.svelte'

  window.onscroll = function () {
    window.scrollTo(0, 0)
  }

  let mins = 30
  let task = ''
  let next = true

  let handleNext = () => {
    next = true
  }

  let handleBack = () => {
    next = false
  }

  let handleTaskSelect = (value) => {
    task = value
  }

  let handleStart = () => {
    window.start(mins, task)
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
    <TasksView />
  </div>
</div>
