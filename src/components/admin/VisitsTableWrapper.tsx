import { prisma } from '@/lib/db'

import VisitsTable from './VisitsTable'

export default async function VisitsTableWrapper() {
  const visits = await prisma.visit.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return <VisitsTable visits={visits} />
}