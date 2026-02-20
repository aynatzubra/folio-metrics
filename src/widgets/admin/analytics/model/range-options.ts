export type RangeOptionValue = 7 | 14 | 30

export interface RangeOption {
  label: string
  value: RangeOptionValue
}

export const ANALYTICS_RANGE_OPTIONS: RangeOption[] = [
  { label: '7 days', value: 7 },
  { label: '14 days', value: 14 },
  { label: '30 days', value: 30 },
]