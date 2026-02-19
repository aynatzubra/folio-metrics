import { prisma } from '@/lib/db'
import { VisitsTable } from '@/widgets/admin/visits-table/VisitsTable'

export async function VisitsTableWrapper() {
  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <VisitsTable visits={visits} />
}