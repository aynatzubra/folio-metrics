'use client'

import { StatCard } from '@/widgets/admin/dashboard/ui/StatCard'
import { useAnalyticsDashboard } from '@/widgets/admin/analytics'
import { SummaryCardSkeleton } from '@/widgets/admin/dashboard'

export function SummaryCards() {
  const { summary, isLoading } = useAnalyticsDashboard(0)

  if (isLoading) return <SummaryCardSkeleton />

  const {
    totalVisits = 0,
    uniqueVisitors = 0,
    avgDuration = 0,
  } = summary || {}

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