'use client'

import { Visit } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { format } from 'date-fns'

import TablePagination from '@/components/admin/TablePagination'

type VisitsTableProps = {
  visits: Visit[]
  pageSize?: number
}

// formatting duration
const formatDuration = (ms: number | null) => {
  if (ms === null) return 'N/A'
  return `${(ms / 1000).toFixed(1)}s`
}

const formatDateTime = (value: Date | string) => {
  const date = value instanceof Date ? value : new Date(value)
  return format(date, 'dd MMM yyyy, HH:mm')
}

export default function VisitsTable({ visits, pageSize = 15 }: VisitsTableProps) {
  const [page, setPage] = useState(1)

  const total = visits.length
  const totalPagesRaw = Math.ceil(total / pageSize)
  const totalPages = Math.max(1, totalPagesRaw)

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const { pageItems } = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(startIndex + pageSize, total)

    return {
      pageItems: visits.slice(startIndex, endIndex),
    }
  }, [page, pageSize, total, visits])

  return (
    <section className="flex flex-col mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Actively visited sections</h3>

        {total === 0 ? (
          <div className="flex h-52 items-center justify-center text-sm text-gray-500">
            No visits recorded yet.
          </div>
        ) : (
          <>
            <div className="mt-4 max-h-[420px] overflow-y-auto rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="sticky top-0 z-10 bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 bg-white">
                {pageItems.map((visit) => (
                  <tr key={visit.id} className="transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                      {visit.sectionId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                      {visit.city}, {visit.country}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                      {formatDuration(visit.duration)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                      {formatDateTime(visit.createdAt)}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>

            <TablePagination
              page={page}
              total={total}
              pageSize={pageSize}
              onPageChange={setPage}
            />

          </>
        )}

      </div>
    </section>
  )
}
