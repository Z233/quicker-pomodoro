<script lang="ts">
  import PrimaryButton from '../components/PrimaryButton.svelte'
  import TimeInput from '../components/TimeInput.svelte'

  const STEP = 15

  export let mins = 30
  export let onNext = () => {}

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

  const handleIncrease = () => {
    mins += STEP
  }

  const handleDecrease = () => {
    const tempMins = mins - STEP
    if (tempMins > 0) {
      mins = tempMins
    }
  }

  const handleChanged = (value: number) => {
    mins = value
  }
</script>

<div class="flex flex-col items-center space-y-8 w-full">
  <TimeInput
    bind:mins
    onChange={handleChanged}
    onIncrease={handleIncrease}
    onDecrease={handleDecrease}
  />
  <div>
    <div class="text-sm text-gray-800">
      从现在起，一直到 <span class="font-bold">
        {endTimeString}</span
      >。
    </div>
  </div>
  <PrimaryButton onClick={onNext}>下一步</PrimaryButton>
</div>
