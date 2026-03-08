'use client'

import { AnalyticsChartsWrapper } from '@/widgets/admin/analytics'
import { DashboardInitialState, SummaryCards } from '@/widgets/admin/dashboard'
import { VisitsTableWrapper } from '@/widgets/admin/visits-table'

type Props = {
  initialState: DashboardInitialState
}

export function DashboardClient({ initialState }: Props) {
  const { data } = initialState

  return (
    <div className="space-y-8">
      <SummaryCards summary={data.summary}/>
      <AnalyticsChartsWrapper daily={data.dailyActivity} sections={data.sectionStats}/>
      <VisitsTableWrapper visits={data.recentVisits}/>
    </div>
  )
}