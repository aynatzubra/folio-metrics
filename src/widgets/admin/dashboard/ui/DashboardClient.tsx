'use client'

import { VisitsTable } from '@/widgets/admin/visits-table'
import { AnalyticsChartsAsync } from '@/widgets/admin/analytics'

import { DashboardInitialState } from '../model'

import { SummaryCards } from './SummaryCards'

type Props = {
  initialState: DashboardInitialState
}

export function DashboardClient({ initialState }: Props) {
  const { data, range } = initialState

  return (
    <div className="space-y-8">
      <SummaryCards summary={data.summary} />
      <AnalyticsChartsAsync
        initialRange={range}
        initialDaily={data.dailyActivity}
        initialSections={data.sectionStats}
      />
      <VisitsTable visits={data.recentVisits} />
    </div>
  )
}