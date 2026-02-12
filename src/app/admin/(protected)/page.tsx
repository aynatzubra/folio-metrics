import { Suspense } from 'react'

import AnalyticsChartsLoader from '@/components/admin/AnalyticsChartsLoader'
import SummaryCards from '@/components/admin/SummaryCards'
import VisitsTableWrapper from '@/components/admin/VisitsTableWrapper'

export default async function AdminDashboardPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>

      <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded-lg" />}>
        <SummaryCards/>
      </Suspense>

      <AnalyticsChartsLoader />

      <Suspense fallback={<p>Loading table...</p>}>
        <VisitsTableWrapper />
      </Suspense>
    </>
  )
}
