import { StatCard } from '@/widgets/admin/dashboard/StatCard'
import { getAnalyticsSummary } from '@/features/admin/analytics-summary'

export async function SummaryCards() {
  const { summary } = await getAnalyticsSummary()

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Visits" value={summary.totalVisits} />
      <StatCard title="Unique Visitors" value={summary.uniqueVisitors} />
      <StatCard title="Avg. Duration" value={`${(summary.avgDuration / 1000).toFixed(1)}s`} />
    </section>
  )
}