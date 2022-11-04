<script>
  import StartButton from './components/StartButton.svelte'
  import TimeInput from './components/TimeInput.svelte'

  const STEP = 15

  let mins = 30
  $: endTimeString = getEndTimeString(mins)

  function getEndTimeString(mins) {
    const endTimestamp = Date.now() + mins * 60 * 1000
    const date = new Date(endTimestamp)
    const endHours = date.getHours()
    const endMins = date.getMinutes()
    return `${formatTime(endHours)}:${formatTime(endMins)}`
  }

  function formatTime(value) {
    return value < 10 ? `0${value}` : value
  }

  let handleIncrese = () => {
    mins += STEP
  }

  let handleDecrese = () => {
    const tempMins = mins - STEP
    if (tempMins > 0) {
      mins = tempMins
    }
  }

  let handleStart = () => {
    // @ts-ignore
    window.start(mins)
  }
</script>

<main class="grid place-content-center h-screen w-screen">
  <div class="flex flex-col items-center space-y-8">
    <TimeInput
      bind:mins
      bind:onIncrease={handleIncrese}
      bind:onDecrease={handleDecrese}
    />
    <div class="text-sm text-gray-800">
      从现在起，一直到 <span class="font-bold"> {endTimeString}</span>。
    </div>
    <StartButton bind:onStart={handleStart} />
  </div>
</main>
