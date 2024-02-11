export function formatSecs(leftSecs: number) {
  const mins = Math.floor(leftSecs / 60)

  const secsValue = leftSecs - mins * 60

  return `${paddingZero(mins)}:${paddingZero(secsValue)}`
}

export function paddingZero(value: number) {
  return String(value).padStart(2, '0')
}