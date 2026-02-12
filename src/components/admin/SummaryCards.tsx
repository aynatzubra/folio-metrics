import { getAnalyticsSummary } from '@/lib/analytics/tracker'
import StatCard from '@/components/admin/StatCard'

export default async function SummaryCards() {
  const { summary } = await getAnalyticsSummary()

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Visits" value={summary.totalVisits} />
      <StatCard title="Unique Visitors" value={summary.uniqueVisitors} />
      <StatCard title="Avg. Duration" value={`${(summary.avgDuration / 1000).toFixed(1)}s`} />
    </section>
  )
}