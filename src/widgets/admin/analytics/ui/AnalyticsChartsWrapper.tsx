import { AnalyticsChartsLoader, RangeOptionValue } from '@/widgets/admin/analytics'
import { AnalyticsService, DailyPoint, SectionPoint } from '@/entities/analytics'

export async function AnalyticsChartsWrapper() {
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