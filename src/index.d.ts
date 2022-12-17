export {}

type QuickerFunctionMap = {
  getState: () => { state: 'IDLE' | 'STARTED' }
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
      name: T
    ) => Promise<ReturnType<QuickerFunctionMap[T]>>
  }
}
