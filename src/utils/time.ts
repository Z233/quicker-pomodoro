import { getMinutes, setMinutes } from 'date-fns'

export function formatSecs(leftSecs: number) {
  const mins = Math.floor(leftSecs / 60)

  const secsValue = leftSecs - mins * 60

  return `${paddingZero(mins)}:${paddingZero(secsValue)}`
}

export function paddingZero(value: number) {
  return String(value).padStart(2, "0")
}

export function setToNearestQuarter(date: Date) {
  const minutes = getMinutes(date)
  const quarter = Math.round(minutes / 15) * 15
  return setMinutes(date, quarter)
}
