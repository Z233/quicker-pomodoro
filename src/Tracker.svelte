<script lang='ts'>
  import { onMount } from "svelte"
  import MiniClock from "./components/MiniClock.svelte"
  import type { AllMessage } from "./types"
    import { formatSecs } from "./utils/time";
  
  onMount(() => {
    window.chrome.webview.addEventListener('message', handleMessage)
  })
  
  let taskName = ''
  let totalSecs = 0
  let leftSecs = 0
  
  $: progress = (1 - leftSecs / totalSecs) * 100
  
  function handleMessage(e: MessageEvent<AllMessage>)  {
    if (e.data.type === 'START') {
      const payload = e.data.payload
      taskName = payload.taskName
      totalSecs = payload.totalSecs
    }
    
    if (e.data.type === 'TICK') {
      leftSecs = e.data.payload.leftSecs
    }
  }
</script>

<div 
  class="w-full h-full grid place-content-center relative select-none"
  style:-webkit-app-region={'drag'}
>
  <div class="grid items-center space-x-3 grid-cols-4 px-4">
    <div class="col-span-1">
      <MiniClock {progress} size={36} />
    </div>
    <div class="col-span-3">
      <div class="text-gray-900 truncate">{taskName}</div>
      <div class="text-xs text-gray-400 truncate">
        {formatSecs(leftSecs)}
      </div>
    </div>
  </div>
</div>