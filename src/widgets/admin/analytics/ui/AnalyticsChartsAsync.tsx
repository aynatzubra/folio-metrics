'use client'

import dynamic from 'next/dynamic'
import { ErrorBoundary } from 'react-error-boundary'

import { DataPlaceholder } from '@/shared/ui/data-placeholder'
import { ChartSkeleton } from '@/shared/ui'

import { AnalyticsChartsProps } from '../model'

const AnalyticsCharts = dynamic<AnalyticsChartsProps>(
  () => import('./AnalyticsCharts').then((m) => m.AnalyticsCharts),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
)

export function AnalyticsChartsAsync({ initialRange = 30, initialDaily, initialSections }: AnalyticsChartsProps) {
  return (
    <ErrorBoundary
      fallback={
        <DataPlaceholder
          type="error"
          message="We encountered a critical error while loading the dashboard. Please try refreshing the page."
        />
      }
    >
      <AnalyticsCharts
        initialRange={initialRange}
        initialDaily={initialDaily}
        initialSections={initialSections}
      />
    </ErrorBoundary>
  )
}