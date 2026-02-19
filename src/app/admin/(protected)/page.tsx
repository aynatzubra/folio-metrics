import { Suspense } from 'react'

import SummaryCards from '@/widgets/admin/dashboard/SummaryCards'
import VisitsTableWrapper from '@/widgets/admin/visits-table/VisitsTableWrapper'
import { ChartSkeleton, TableSkeleton } from '@/widgets/admin/dashboard/DashboardSkeletons'
import AnalyticsChartsWrapper from '@/widgets/admin/analytics/AnalyticsChartsWrapper'

export default async function AdminDashboardPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>

      <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded-lg" />}>
        <SummaryCards />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <AnalyticsChartsWrapper />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <VisitsTableWrapper />
      </Suspense>
    </>
  )
}
