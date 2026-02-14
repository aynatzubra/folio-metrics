import AnalyticsChartsLoader from '@/components/admin/AnalyticsChartsLoader'
import { DailyPoint, RangeOptionValue, SectionPoint } from '@/lib/analytics/types'
import { AnalyticsService } from '@/lib/analytics/service'

export default async function AnalyticsChartWrapper() {
  const initialRange: RangeOptionValue = 30

  try {
    const [initialDaily, initialSections] = await Promise.all([
      AnalyticsService.getDailyVisits(initialRange) as Promise<DailyPoint[]>,
      AnalyticsService.getTopSections(initialRange) as Promise<SectionPoint[]>,
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