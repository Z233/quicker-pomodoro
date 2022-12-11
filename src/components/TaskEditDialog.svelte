<script lang="ts">
  import {
    Dialog,
    DialogTitle,
    DialogDescription,
    Transition,
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    TransitionChild,
  } from '@rgossiaux/svelte-headlessui'
  import { FocusMode, type Task } from '../types'
  import Cancel from '../icons/Cancel.svelte'
  import Trash from '../icons/Trash.svelte'
  import RoundButton from './RoundButton.svelte'
  import TagEditor from './TagEditor.svelte'

  export let task: Task | null
  export let open = false
  export let onClose: () => void
  export let onSave: (task: Task) => void
  export let onRemove: (task: Task) => void

  let mode

  $: name = task?.name ?? ''
  $: list = task?.config.list ?? []

  function handleSaveClicked() {
    onSave({
      ...task,
      name,
      config: {
        focusMode: mode,
        ...(mode === FocusMode.none ? {} : { list }),
      },
    })
    onClose()
  }

  const modeOptions = [
    {
      label: '不使用',
      value: FocusMode.none,
    },
    {
      label: '白名单',
      value: FocusMode.whiteList,
    },
    {
      label: '黑名单',
      value: FocusMode.blackList,
    },
  ]
</script>

<Transition show={open}>
  <Dialog {open}>
    <TransitionChild
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    </TransitionChild>

    <div class="fixed inset-0 flex items-center justify-center p-4 ">
      <TransitionChild
        class="w-full h-full"
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-75"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-75"
      >
        <div class="w-full h-full bg-white rounded-md p-6 space-y-4">
          <div class="w-full flex justify-between  text-slate-400">
            <span class="text-sm">编辑任务</span>
            <button
              on:click={() => onClose()}
              class="w-4 h-4 hover:text-slate-600"
            >
              <Cancel />
            </button>
          </div>

          <input
            tabIndex={-1}
            value={name}
            on:change={(e) => (name = e.currentTarget.value)}
            class="text-lg outline-none border-b w-full"
          />

          <div class="space-y-4">
            <div>
              <RadioGroup
                value={mode}
                on:change={(e) => (mode = e.detail)}
              >
                <RadioGroupLabel class="text-sm text-slate-600">
                  专注模式
                </RadioGroupLabel>
                <div class="mt-2">
                  <div
                    class="inline-flex bg-slate-100 rounded-lg text-sm"
                  >
                    {#each modeOptions as option}
                      <RadioGroupOption
                        let:checked
                        value={option.value}
                        class="p-1"
                      >
                        <div
                          class="px-3 py-1 rounded-lg select-none"
                          class:bg-white={checked}
                          class:hover:bg-slate-50={!checked}
                        >
                          <span>{option.label}</span>
                        </div>
                      </RadioGroupOption>
                    {/each}
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <span class="text-sm text-slate-600"> 白名单 </span>
              <TagEditor />
            </div>
          </div>
          <div
            class="pt-4 flex space-x-4 items-center justify-between"
          >
            <RoundButton onClick={handleSaveClicked}
              >保&nbsp;存</RoundButton
            >
            <button
              on:click={() => onRemove(task)}
              class="text-sm text-slate-500 hover:text-red-500"
            >
              <div class="w-4 h-4">
                <Trash />
              </div>
            </button>
          </div>
        </div>
      </TransitionChild>
    </div></Dialog
  >
</Transition>
