import type { DailyPoint, SectionPoint } from '@/entities/analytics'
import type { RangeOptionValue } from './range-options'

export type AnalyticsChartsProps = {
  initialRange?: RangeOptionValue
  initialDaily?: DailyPoint[]
  initialSections?: SectionPoint[]
}