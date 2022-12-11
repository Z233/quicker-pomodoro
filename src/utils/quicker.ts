import { swr } from '@svelte-drama/swr'
import { nanoid } from 'nanoid'
import { useSWR } from 'sswr'
import { type Task, FocusMode } from '../types'

const exampleTasks: Task[] = [
  {
    id: nanoid(),
    name: 'SuperMemo',
    config: {
      focusMode: FocusMode['whiteList'],
      list: ['sm18', 'spotify'],
    },
  },
  {
    id: nanoid(),
    name: 'Coding',
    config: {
      focusMode: FocusMode['blackList'],
      list: ['qq'],
    },
  },
  {
    id: nanoid(),
    name: 'Free Learning',
    config: {
      focusMode: FocusMode['none'],
    },
  },
]

export async function getTasks() {
  const { tasksData } = await globalThis.$quickerSp('getTasks')
  const tasks: Task[] = JSON.parse(tasksData)
  return tasks
}

export async function saveTasks(tasks: Task[]) {
  await globalThis.$quickerSp('saveTasks', {
    tasksData: JSON.stringify(tasks),
  })
  return tasks
}
