import { Suspense } from 'react'

import { AnalyticsChartsWrapper } from '@/widgets/admin/analytics'
import { ChartSkeleton, SummaryCards, SummaryCardSkeleton, TableSkeleton } from '@/widgets/admin/dashboard'
import { VisitsTableWrapper } from '@/widgets/admin/visits-table'

export default async function AdminDashboardPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>

      <Suspense fallback={<SummaryCardSkeleton />}>
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
