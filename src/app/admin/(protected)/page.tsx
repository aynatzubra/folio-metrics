import { DashboardClient } from '@/widgets/admin/dashboard'
import { RangeOptionValue } from '@/features/admin/analytics-filters'
import { createServerMetricsRepository, MetricsService } from '@/shared/api/metrics'

export default async function AdminDashboardPage() {
  const range: RangeOptionValue = 30
  const repo = createServerMetricsRepository()
  const metricsService = new MetricsService(repo)
  const dashboard = await metricsService.getDashboardData(range)

  const initialState = { range, data: dashboard }

  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>
      <DashboardClient initialState={initialState} />
    </>
  )
}