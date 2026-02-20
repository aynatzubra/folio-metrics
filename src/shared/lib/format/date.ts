import { format } from 'date-fns'

export const formatDuration = (ms: number | null) => {
  if (ms === null) return 'N/A'
  return `${(ms / 1000).toFixed(1)}s`
}

export const formatDateTime = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value)
  return format(date, 'dd MMM yyyy, HH:mm')
}