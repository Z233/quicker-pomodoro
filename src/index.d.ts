export {}

declare global {
  interface Window {
    tasks: string[]
    start: (mins, task) => any
  }
}
