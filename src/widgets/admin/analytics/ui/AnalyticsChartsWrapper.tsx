import { RangeOptionValue } from '@/widgets/admin/analytics'
import { DailyPoint, SectionPoint } from '@/entities/analytics'

import { AnalyticsChartsLoader } from './AnalyticsChartsLoader'

type Props = {
  daily: DailyPoint[]
  sections: SectionPoint[]
  initialRange?: RangeOptionValue
}

export function AnalyticsChartsWrapper({ daily, sections, initialRange = 30 }: Props) {
  return (
    <AnalyticsChartsLoader
      initialRange={initialRange}
      initialDaily={daily}
      initialSections={sections}
    />
  )
}