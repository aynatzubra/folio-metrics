import { VisitsTable } from '@/widgets/admin/visits-table/VisitsTable'
import { prisma } from '@/shared/db/prisma'

export async function VisitsTableWrapper() {
  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <VisitsTable visits={visits} />
}