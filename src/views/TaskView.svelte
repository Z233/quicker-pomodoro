<script lang="ts">
  import TaskItem from '../components/TaskItem.svelte'
  import NewTaskItem from '../components/NewTaskItem.svelte'
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription,
  } from '@rgossiaux/svelte-headlessui'
  import Plus from '../icons/Plus.svelte'
  import TaskEditDialog from '../components/TaskEditDialog.svelte'
  import { getTasks, saveTasks } from '../utils/quicker'
  import { useSWR } from 'sswr'
  import { FocusMode, type Task } from '../types'
  import { nanoid } from 'nanoid'

  export let onStart: (task: Task) => void
  export let onBack: () => void

  const { data, revalidate, mutate } = useSWR('TASKS', {
    fetcher: getTasks,
  })

  let tasks: Task[] | null = null

  data.subscribe((newTasks) => {
    tasks = newTasks
  })

  let selectedTaskId = ''
  let isEditing = false
  let editingTask: Task | null = null
  let isCreating = false

  $: canStart = Boolean(selectedTaskId)

  function handleEditClicked(task: Task) {
    isEditing = true
    editingTask = task
  }

  async function update(tasks: Task[]) {
    mutate(tasks, {
      revalidateOptions: {
        fetcher: () => saveTasks(tasks),
      },
    })
  }

  function handleCreated(taskName: string) {
    isCreating = false
    if (taskName.trim().length <= 0) return
    const newTasks = [
      ...tasks!,
      {
        id: nanoid(),
        name: taskName,
        config: {
          focusMode: FocusMode.none,
        },
      },
    ]
    update(newTasks)
  }

  function handleSaved(task: Task) {
    const newTasks = [...tasks!]
    const targetTask = newTasks.find((t) => t.id === task.id)!
    Object.assign(targetTask, task)
    update(newTasks)
  }

  function handleRemoved(task: Task) {
    if (task.id === selectedTaskId) selectedTaskId = ''
    const newTasks = tasks!.filter((t) => t.id !== task.id)
    update(newTasks)
    isEditing = false
  }
</script>

<div
  class="bg-slate-100 h-full w-full px-6 py-4 space-y-4 text-slate-900 relative 
    flex flex-col"
>
  <div class="flex items-center justify-between">
    <span>选择一个任务</span>
    <button
      on:click={() => (isCreating = true)}
      class="bg-white text-slate-500 rounded p-0.5 border-slate-200 border 
          hover:opacity-80"
    >
      <div class="w-6 h-6">
        <Plus />
      </div>
    </button>
  </div>

  <div class="grow">
    {#if tasks}
      <RadioGroup
        class="space-y-3"
        value={selectedTaskId}
        on:change={(e) => (selectedTaskId = e.detail)}
      >
        {#each tasks as task (task.id)}
          <RadioGroupOption value={task.id} let:checked>
            <TaskItem
              selected={checked}
              {task}
              onEditClicked={handleEditClicked}
            />
          </RadioGroupOption>
        {/each}
        {#if isCreating}
          <NewTaskItem onCreated={handleCreated} />
        {/if}
      </RadioGroup>
    {:else}
      <div class="w-full h-24 grid place-content-center">
        <span>Loading...</span>
      </div>
    {/if}
  </div>

  <TaskEditDialog
    task={editingTask}
    open={isEditing}
    onClose={() => (isEditing = false)}
    onSave={handleSaved}
    onRemove={handleRemoved}
  />

  <div class="flex justify-between items-center">
    <button
      on:click={() => onBack()}
      class="text-sm text-slate-400 cursor-pointer hover:text-slate-500"
    >
      ← 返回
    </button>
    <button
      disabled={!canStart}
      on:click={() =>
        onStart(tasks.find((t) => t.id === selectedTaskId))}
      class="flex px-4 py-1.5 rounded-full hover:opacity-95 text-sm bg-sky-800 text-white disabled:bg-white 
        disabled:text-slate-300 disabled:shadow-[inset_0_0_0_1px] shadow-slate-200 
        disabled:cursor-not-allowed">开始</button
    >
  </div>
</div>
