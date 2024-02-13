<script lang="ts">
  import { onMount } from "svelte"
  import { fromUnixTime, addSeconds } from "date-fns"
  import type { AllMessage, Task } from "../types"
  import { start } from "../utils/quicker"
  import { setToNearestQuarter } from "../utils/time"
  import TimeView from "../views/TimeView.svelte"
  import TimerView from "../views/TimerView.svelte"
  import GoogleAccount from "../components/GoogleAccount.svelte"
  import TaskView from "../views/TaskView.svelte"
  import { gapiContext } from "../Provider"
  
  const { requestAuth } = gapiContext.get()

  let isStarted = false
  let mins = 30
  let next = false

  const showTimer = () => {
    isStarted = true
    next = false
  }

  function makeSyncFn(event: gapi.client.calendar.Event) {
    return async function syncToCalendar() {
      try {
        const response = await gapi.client.calendar.events.insert({
          calendarId: "primary",
          resource: event,
        })

        if (response.status === 200) {
          window.$quickerSp("toast", {
            type: "Success",
            content: "已同步到谷歌日历",
          })
        }
        if (response.status === 401) {
          requestAuth(() => syncToCalendar())
        } else {
          throw response
        }
      } catch {
        window.$quickerSp("toast", {
          type: "Error",
          content: `同步到谷歌日历失败`,
        })
      }
    }
  }

  async function handleMessage(e: MessageEvent<AllMessage>) {
    if (e.data.type === "START") {
      showTimer()
    }

    if (e.data.type === "DONE") {
      isStarted = false

      const { taskName, startAt, durationSecs } = e.data.payload

      const start = fromUnixTime(startAt)
      const end = addSeconds(start, durationSecs)

      const quarteredStart = setToNearestQuarter(start)
      const quarteredEnd = setToNearestQuarter(end)

      const sync = makeSyncFn({
        summary: taskName,
        start: {
          dateTime: quarteredStart.toISOString(),
        },
        end: {
          dateTime: quarteredEnd.toISOString(),
        },
      })

      sync()
    }
  }

  onMount(async () => {
    window.chrome.webview.addEventListener("message", handleMessage)

    // Disable scroll
    window.onscroll = function () {
      window.scrollTo(0, 0)
    }

    const { status } = await window.$quickerSp("getStatus")
    if (status === "ONGOING") {
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

<div class="h-full w-full flex flex-col overflow-hidden">
  <div
    class="grow relative transition duration-300 bg-slate-100"
    class:-translate-x-full={next}
  >
    <div class="grid place-content-center h-full w-full">
      <GoogleAccount class="absolute right-6 top-4" />
      <TimeView bind:mins onNext={handleNext} />
    </div>
    <div class="absolute left-full w-full h-full top-0">
      <TaskView onStart={handleStart} onBack={handleBack} />
    </div>

    {#if isStarted}
      <TimerView />
    {/if}
  </div>
</div>
