'use client'

import dynamic from 'next/dynamic'

import { ChartSkeleton } from './Skeletons'

const AnalyticsCharts = dynamic(
  () => import('./AnalyticsCharts'),
  {
    ssr: false,
    loading: () => <ChartSkeleton />,
  },
)

export default function AnalyticsChartsLoader() {
  return <AnalyticsCharts />
}