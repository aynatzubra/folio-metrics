import { AnalyticsChartsLoader, RangeOptionValue } from '@/widgets/admin/analytics'

export async function AnalyticsChartsWrapper() {
  const initialRange: RangeOptionValue = 30

  return (
    <AnalyticsChartsLoader
      initialRange={initialRange}
      initialDaily={null}
      initialSections={null}
    />
  )
}