<script lang="ts">
  import CheckCircle from '../icons/CheckCircle.svelte'
  import type { Task } from '../types'

  export let selected = false
  export let task: Task
</script>

<div
  class="w-full bg-white rounded-lg py-2 px-4 flex space-x-2 items-center group border 
    border-slate-200 outline-red-500"
>
  <div
    class="w-4 h-4 text-sky-700  active:text-sky-700 hover:text-sky-800"
  >
    <CheckCircle checked={selected} />
  </div>
  <div class="select-none grow">{task.name}</div>
  <div
    class="hidden group-hover:block w-4 h-4 text-slate-600 relative
      before:absolute before:w-6 before:h-6 before:bg-slate-200 before:top-1/2 before:left-1/2 
      before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-md before:invisible 
      hover:before:visible"
  >
    <!-- <Edit /> -->
  </div>
</div>
