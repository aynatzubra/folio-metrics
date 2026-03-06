import { AnalyticsChartsWrapper } from '@/widgets/admin/analytics'
import { SummaryCards } from '@/widgets/admin/dashboard'
import { VisitsTableWrapper } from '@/widgets/admin/visits-table'

export default async function AdminDashboardPage() {
  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>

      <SummaryCards />
      <AnalyticsChartsWrapper />
      <VisitsTableWrapper />
    </>
  )
}
