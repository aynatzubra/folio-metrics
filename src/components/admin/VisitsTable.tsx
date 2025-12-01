'use client'

import { Visit } from '@prisma/client'
import { useState } from 'react'

import TablePagination from '@/components/admin/TablePagination'

type VisitsTableProps = {
  visits: Visit[]
  isLoading: boolean
}

// formatting duration
const formatDuration = (ms: number | null) => {
  if (ms === null) return 'N/A'
  return `${(ms / 1000).toFixed(1)}s`
}

const PAGE_SIZE = 15

export default function VisitsTable({ visits, isLoading }: VisitsTableProps) {
  const [page, setPage] = useState(1)

  const total = visits.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  if (page > totalPages && totalPages > 0) {
    setPage(totalPages)
  }

  const startIndex = (page - 1) * PAGE_SIZE
  const pageItems = visits.slice(startIndex, startIndex + PAGE_SIZE)

  return (
    <section className="flex flex-col mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Last 50 Visits</h3>

        <div className="mt-4">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center text-sm text-gray-500">
              Loading visits...
            </div>
          ) : total === 0 ? (
            <div className="flex h-64 items-center justify-center text-sm text-gray-500">
              No visits recorded yet.
            </div>
          ) : (
            <>
              <div className="max-h-[420px] overflow-y-auto rounded-md border border-gray-200">
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
                    <tr
                      key={visit.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
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
                        {new Date(visit.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <TablePagination
                page={page}
                pageSize={PAGE_SIZE}
                total={total}
                onPageChangeAction={setPage}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
