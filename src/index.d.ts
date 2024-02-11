export {}

type QuickerFunctionMap = {
  getStatus: () => 'IDLE' | 'ONGOING'
  setStatus: void
}

declare global {
  interface Window {
    tasks: string[]
    start: (
      mins,
      task,
      whiteList: string[],
      blackList: string[]
    ) => any
    $quickerSp: <T extends keyof QuickerFunctionMap>(
      name: T,
      ...args
    ) => Promise<ReturnType<QuickerFunctionMap[T]>>
  }
}
