import { VisitsTable } from '@/widgets/admin/visits-table/ui/VisitsTable'
import { prisma } from '@/shared/db/prisma'

export async function VisitsTableWrapper() {
  if (!prisma) return

  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <VisitsTable visits={visits} />
}