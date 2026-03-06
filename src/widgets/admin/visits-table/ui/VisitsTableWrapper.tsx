'use client'

import { VisitsTable } from '@/widgets/admin/visits-table/ui/VisitsTable'
import { useAnalyticsDashboard } from '@/widgets/admin/analytics'

export function VisitsTableWrapper() {
  const { recent, isLoading } = useAnalyticsDashboard(0)

  return <VisitsTable visits={recent || []} isLoading={isLoading} />
}