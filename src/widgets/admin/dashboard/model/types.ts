import { AnalyticsDashboard } from '@/entities/analytics'
import { RangeOptionValue } from '@/features/admin/analytics-filters'

export interface DashboardInitialState {
  range: RangeOptionValue
  data: AnalyticsDashboard
}