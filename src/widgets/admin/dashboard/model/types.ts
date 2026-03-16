import { AnalyticsDashboard } from '@/entities/analytics'
import { RangeOptionValue } from '@/widgets/admin/analytics'

export interface DashboardInitialState {
  range: RangeOptionValue
  data: AnalyticsDashboard
}