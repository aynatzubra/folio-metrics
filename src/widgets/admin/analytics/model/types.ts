import { RangeOptionValue } from '@/features/admin/analytics-filters'

import type { DailyPoint, SectionPoint } from '@/entities/analytics'

export type AnalyticsChartsProps = {
  initialRange?: RangeOptionValue
  initialDaily?: DailyPoint[]
  initialSections?: SectionPoint[]
}