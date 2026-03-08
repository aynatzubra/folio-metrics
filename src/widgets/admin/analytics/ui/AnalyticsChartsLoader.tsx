'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from 'react-error-boundary'

import { ChartSkeleton, DataPlaceholder } from '@/widgets/admin/dashboard'
import { AnalyticsChartsProps } from '@/widgets/admin/analytics/model'

const AnalyticsCharts = dynamic<AnalyticsChartsProps>(
  () => import('./AnalyticsCharts').then((m) => m.AnalyticsCharts),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
)

export function AnalyticsChartsLoader(props: AnalyticsChartsProps) {
  return (
    <ErrorBoundary
      fallback={
        <DataPlaceholder
          type="error"
          message="We encountered a critical error while loading the dashboard. Please try refreshing the page."
        />
      }
    >
      <AnalyticsCharts {...props} />
    </ErrorBoundary>
  )
}