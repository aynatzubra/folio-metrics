import { AnalyticsChartsLoader, RangeOptionValue } from '@/widgets/admin/analytics'
import { AnalyticsRepository } from '@/entities/analytics'

import type { DailyPoint, SectionPoint } from '@/entities/analytics'

export async function AnalyticsChartsWrapper() {
  const initialRange: RangeOptionValue = 30

  try {
    const [initialDaily, initialSections] = await Promise.all([
      AnalyticsRepository.getDailyVisits(initialRange) as Promise<DailyPoint[]>,
      AnalyticsRepository.getTopSections(initialRange) as Promise<SectionPoint[]>,
    ])

    return (
      <AnalyticsChartsLoader
        initialRange={initialRange}
        initialDaily={initialDaily}
        initialSections={initialSections}
      />
    )
  } catch {
    return (
      <AnalyticsChartsLoader
        initialRange={initialRange}
        initialDaily={null}
        initialSections={null}
      />
    )
  }
}