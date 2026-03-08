'use client'

import { useState } from 'react'

import {
  DailyVisitsChart,
  RangeOptionValue,
  SectionsChart,
  useAnalyticsDashboard,
} from '@/widgets/admin/analytics'
import { AnalyticsRangeFilter } from '@/features/admin/analitics-filters'
import { DashboardLoader } from '@/shared/ui/DashboardLoader'
import { DataPlaceholder } from '@/widgets/admin/dashboard'
import { AnalyticsChartsProps } from '@/widgets/admin/analytics/model'

export function AnalyticsCharts({
                                  initialRange = 30,
                                  initialDaily = [],
                                  initialSections = [],
                                }: AnalyticsChartsProps) {
  const [range, setRange] = useState<RangeOptionValue>(initialRange)

  const { daily, sections, isLoading, error } = useAnalyticsDashboard(range, {
    range: initialRange,
    data: {
      dailyActivity: initialDaily,
      sectionStats: initialSections,
    },
  })

  const resolvedDaily = daily ?? []
  const resolvedSections = sections ?? []

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Traffic Overview</h2>
        <AnalyticsRangeFilter value={range} onChange={setRange} />
      </div>
      {isLoading && (
        <div className="flex h-[380px] items-center justify-center rounded-lg border border-slate-100 bg-white">
          <DashboardLoader title="Loading charts..." />
        </div>
      )}
      {!isLoading && error && (
        <DataPlaceholder
          type="error"
          message="Failed to load analytics charts."
        />
      )}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DailyVisitsChart data={resolvedDaily} range={range} />
          <SectionsChart data={resolvedSections} range={range} />
        </div>
      )}
    </section>
  )
}