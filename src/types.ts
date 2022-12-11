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
