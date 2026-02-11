import { getAnalyticsSummary } from '@/lib/analytics/tracker'
import AnalyticsChartsLoader from '@/components/admin/AnalyticsChartsLoader'
import StatCard from '@/components/admin/StatCard'
import VisitsTable from '@/components/admin/VisitsTable'

export default async function AdminDashboardPage() {
  const { summary, visits } = await getAnalyticsSummary()

  return (
    <>
      <header className="mb-6">
        <h1 className="text-lg font-bold uppercase tracking-wide text-gray-900">
          Dashboard
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Visits" value={summary.totalVisits} />
        <StatCard title="Unique Visitors" value={summary.uniqueVisitors} />
        <StatCard
          title="Avg. Session Duration"
          value={`${(summary.avgDuration / 1000).toFixed(1)}s`}
        />
      </section>

      <AnalyticsChartsLoader />

      <VisitsTable visits={visits} />
    </>
  )
}
