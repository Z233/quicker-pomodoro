<script lang="ts">
  import type { AllMessage } from '../types'

  export let onDone: () => void

  let leftSecs: number = 0

  const handleMessage = (e: MessageEvent<AllMessage>) => {
    if (e.data.type === 'TICK') {
      leftSecs = Math.round(e.data.payload.leftSecs)
    }

    if (e.data.type === 'DONE') {
      onDone()
    }
  }

  const handleStopClicked = () => {
    window.$quickerSp('setState', {
      state: 'IDLE',
    })
  }

  window.chrome.webview.addEventListener('message', handleMessage)

  function formatSecs(value: number) {
    const mins = Math.floor(value / 60)

    const secsValue = value - mins * 60

    return `${paddingZero(mins)}:${paddingZero(secsValue)}`
  }

  export function paddingZero(value: number) {
    return String(value).padStart(2, '0')
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
