<script lang="ts">
    import { onMount } from 'svelte';
  import type { AllMessage } from '../types'
    import { formatSecs } from '../utils/time';

  export let onDone: () => void

  let leftSecs: number = 0
  
  onMount(() => {
    window.chrome.webview.addEventListener('message', handleMessage)
  })

  function handleMessage(e: MessageEvent<AllMessage>) {
    if (e.data.type === 'TICK') {
      leftSecs = Math.round(e.data.payload.leftSecs)
    }

    if (e.data.type === 'DONE') {
      onDone()
    }
  }

  function handleStopClicked() {
    window.$quickerSp('setStatus', {
      status: 'IDLE',
    })
  }
  
</script>

<div
  class="w-full h-full grid place-content-center fixed inset-0 bg-sky-900"
>
  <span class="text-5xl text-slate-50 font-extrabold">
    {formatSecs(leftSecs)}
  </span>
  <div
    class="absolute top-full -translate-y-[175%] left-1/2 -translate-x-1/2"
  >
    <button
      on:click={handleStopClicked}
      class="text-slate-400 underline text-sm hover:text-white"
      >STOP</button
    >
  </div>
</div>
