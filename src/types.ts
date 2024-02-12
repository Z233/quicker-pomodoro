export enum FocusMode {
  none = 'NONE',
  whiteList = 'WHITE_LIST',
  blackList = 'BLACK_LIST',
}

export interface Task {
  id: string
  name: string
  config: {
    focusMode: FocusMode
    list?: string[]
  }
}

type Message = {
  type: string
  payload?: Record<string, any>
}

interface StartMessage extends Message {
  type: 'START',
  payload: {
    totalSecs: number
    taskName: string
  }
}

interface DoneMessage extends Message {
  type: 'DONE',
  payload: {
    startAt: number
    taskName: string
    durationSecs: number
  }
}

interface TickMessage extends Message {
  type: 'TICK'
  payload: {
    leftSecs: number
  }
}

export type AllMessage = StartMessage | TickMessage | DoneMessage
