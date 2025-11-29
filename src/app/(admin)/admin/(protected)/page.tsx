import { auth } from '@/auth'
import { getAnalyticsSummary } from '@/lib/analytics/tracker'
import StatCard from '@/components/admin/StatCard'
import VisitsTable from '@/components/admin/VisitsTable'
import AnalyticsCharts from '@/components/admin/AnalyticsCharts'

export default async function AdminDashboardPage() {
  const session = await auth()
  //todo: Access Denied Page
  if (!session?.user) {
    return (
      <div className="h-screen w-screen bg-[#FBE1D0] flex items-center justify-center color-[#F67769] text-lg">
        {' '}
        Access Denied!!!{' '}
      </div>
    )
  }

  const { summary, visits } = await getAnalyticsSummary()

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <AnalyticsCharts />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Visits" value={summary.totalVisits}
          isLoading={false} />
        <StatCard
          title="Unique Visitors" value={summary.uniqueVisitors}
          isLoading={false} />
        <StatCard
          title="Avg. Session Duration"
          value={`${(summary.avgDuration / 1000).toFixed(1)}s`}
          isLoading={false}
        />
      </div>
      <VisitsTable visits={visits} isLoading={false} />
    </div>
  )
}
