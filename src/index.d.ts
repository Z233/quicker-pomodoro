export {}

declare global {
  interface Window {
    tasks: string[]
    start: (
      mins,
      task,
      whiteList: string[],
      blackList: string[]
    ) => any
  }
}
