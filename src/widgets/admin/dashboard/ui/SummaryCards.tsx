'use client'

import { StatCard } from '@/widgets/admin/dashboard/ui/StatCard'
import { useAnalyticsDashboard } from '@/widgets/admin/analytics'

export function SummaryCards() {
  const { summary } = useAnalyticsDashboard(0)

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Visits" value={summary?.totalVisits} />
      <StatCard title="Unique Visitors" value={summary?.uniqueVisitors} />
      <StatCard title="Avg. Duration" value={`${summary?.avgDuration.toFixed(1)}s`} />
    </section>
  )
}