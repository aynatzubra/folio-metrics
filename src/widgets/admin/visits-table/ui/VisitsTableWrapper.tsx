import { VisitsTable } from '@/widgets/admin/visits-table/ui/VisitsTable'
import { VisitData } from '@/entities/analytics'

type Props = {
  visits: VisitData[]
}

export function VisitsTableWrapper({ visits }: Props) {
  return <VisitsTable visits={visits} />
}