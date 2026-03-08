import { StatCard } from '@/widgets/admin/dashboard/ui/StatCard'
import { SummaryStats } from '@/entities/analytics'

type SummaryCardsProps = {
  summary: SummaryStats
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const { totalVisits, uniqueVisitors, avgDuration } = summary

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Visits"
        value={totalVisits.toLocaleString()}
      />
      <StatCard
        title="Unique Visitors"
        value={uniqueVisitors.toLocaleString()}
      />
      <StatCard
        title="Avg. Duration"
        value={`${avgDuration.toFixed(1)}s`}
      />
    </section>
  )
}