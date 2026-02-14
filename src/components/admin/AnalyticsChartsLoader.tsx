'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from 'react-error-boundary'

import { DailyPoint, RangeOptionValue, SectionPoint } from '@/lib/analytics/types'
import DataPlaceholder from '@/components/admin/DataPlaceholder'

import { ChartSkeleton } from './DashboardSkeletons'

type Props = {
  initialRange: RangeOptionValue
  initialDaily: DailyPoint[] | null
  initialSections: SectionPoint[] | null
}

const AnalyticsCharts = dynamic(
  () => import('./AnalyticsCharts'),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
)

export default function AnalyticsChartsLoader(props: Props) {
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