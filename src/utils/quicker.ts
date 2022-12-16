import { FocusMode, type Task } from '../types'

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

export function start(task: Task, mins: number) {
  const taskName = task.name
  const list = task.config.list
  const whiteList =
    task.config.focusMode === FocusMode.whiteList ? list : []
  const blackList =
    task.config.focusMode === FocusMode.blackList ? list : []
  globalThis.$quickerSp('start', {
    taskName,
    mins,
    whiteList,
    blackList,
  })
}
