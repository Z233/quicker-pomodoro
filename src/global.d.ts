declare const __DEV__: boolean

export {}

import gapi from "gpi"
import google from "google.accounts"

type QuickerFunctionMap = {
  getStatus: () => { status: "IDLE" | "ONGOING" }
  setStatus: void
  toast: (options: {
    type: "Success" | "Info" | "Warning" | "Error"
    content: string
  }) => void
}

declare global {
  interface Window {
    tasks: string[]
    start: (mins, task, whiteList: string[], blackList: string[]) => any
    $quickerSp: <T extends keyof QuickerFunctionMap>(
      name: T,
      ...args: Parameters<QuickerFunctionMap[T]>
    ) => Promise<ReturnType<QuickerFunctionMap[T]>>
    gapi: gapi
    google: google
  }
}
