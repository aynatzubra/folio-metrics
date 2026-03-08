import { DashboardClient } from '@/widgets/admin/dashboard/ui/DashboardClient'
import { MetricsService } from '@/shared/api/metrics'
import { createServerMetricsRepository } from '@/shared/api/metrics/factory'

export default async function AdminDashboardPage() {
  const range = 30
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
