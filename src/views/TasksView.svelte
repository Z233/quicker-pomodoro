<script lang="ts">
  import PrimaryButton from '../components/PrimaryButton.svelte'
  import TaskItem from '../components/TaskItem.svelte'
  import {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupDescription,
  } from '@rgossiaux/svelte-headlessui'
  import { FocusMode, type Task } from '../types'
  import Plus from '../icons/Plus.svelte'
  import TaskEditDialog from '../components/TaskEditDialog.svelte'

  let selectedTaskId = ''
  let isEditing = false
  let editingTask: Task | null = null

  function handleEditClicked(task: Task) {
    isEditing = true
    editingTask = task
  }

  const testTasks: Task[] = [
    {
      id: '1',
      name: 'Coding',
      config: {
        focusMode: FocusMode.none,
        list: [],
      },
    },
    {
      id: '2',
      name: 'SuperMemo',
      config: {
        focusMode: FocusMode.none,
        list: [],
      },
    },
  ]

  const tasks = testTasks
</script>

<div
  class="bg-slate-100 h-full w-full px-6 py-4 space-y-4 text-slate-900 relative 
    flex flex-col"
>
  <div class="flex items-center justify-between">
    <span>选择一个任务</span>
    <button
      class="bg-white text-slate-500 rounded p-0.5 border-slate-200 border 
          hover:opacity-80"
    >
      <div class="w-6 h-6">
        <Plus />
      </div>
    </button>
  </div>

  <div class="grow">
    <RadioGroup
      class="space-y-3"
      value={selectedTaskId}
      on:change={(e) => (selectedTaskId = e.detail)}
    >
      {#each tasks as task}
        <RadioGroupOption value={task.id} let:checked>
          <TaskItem
            selected={checked}
            {task}
            onEditClicked={handleEditClicked}
          />
        </RadioGroupOption>
      {/each}
    </RadioGroup>
  </div>

  {#if editingTask}
    <TaskEditDialog
      task={editingTask}
      open={isEditing}
      onClose={() => (isEditing = false)}
    />
  {/if}

  <div class="flex justify-between items-center">
    <span
      class="text-sm text-slate-400 cursor-pointer hover:text-slate-500"
    >
      ← 返回
    </span>
    <button
      class="flex px-4 py-1.5 rounded-full hover:opacity-95 text-sm bg-sky-800 text-white disabled:bg-white 
        disabled:text-slate-300 disabled:shadow-[inset_0_0_0_1px] shadow-slate-200 
        disabled:cursor-not-allowed">开始</button
    >
  </div>
</div>
