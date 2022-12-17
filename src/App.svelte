<script lang="ts">
  import { onMount } from 'svelte'
  import type { AllMessage, Task } from './types'
  import { start } from './utils/quicker'
  import TasksView from './views/TaskView.svelte'
  import TimerView from './views/TimerView.svelte'
  import TimeView from './views/TimeView.svelte'

  let isStarted = false
  let mins = 30
  let next = false

  const showTimer = () => {
    isStarted = true
    next = false
  }

  const handleMessage = (e: MessageEvent<AllMessage>) => {
    if (e.data.type === 'START') {
      showTimer()
    }
  }

  const handleTimerDone = () => {
    isStarted = false
  }

  window.chrome.webview.addEventListener('message', handleMessage)

  window.onscroll = function () {
    window.scrollTo(0, 0)
  }

  onMount(async () => {
    const { state } = await window.$quickerSp('getState')
    if (state === 'STARTED') {
      showTimer()
    }
  })

  let handleNext = () => {
    next = true
  }

  let handleBack = () => {
    next = false
  }

  let handleStart = (task: Task) => {
    start(task, mins)
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
    <TasksView onStart={handleStart} onBack={handleBack} />
  </div>

  {#if isStarted}
    <TimerView onDone={handleTimerDone} />
  {/if}
</div>
