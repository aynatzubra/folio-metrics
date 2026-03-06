'use client'

import { useEffect, useMemo, useState } from 'react'

import { formatDateTime, formatDuration } from '@/shared/lib/format'
import { TablePagination } from '@/widgets/admin/visits-table/ui/TablePagination'
import { TableSkeleton } from '@/widgets/admin/dashboard'

import type { VisitData } from '@/entities/analytics'

type VisitsTableProps = {
  visits: VisitData[]
  pageSize?: number
  isLoading: boolean
}

export function VisitsTable({ visits, isLoading, pageSize = 15 }: VisitsTableProps) {
  const [page, setPage] = useState(1)

  const total = visits.length
  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  const pageItems = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return visits.slice(startIndex, startIndex + pageSize)
  }, [page, pageSize, visits])

  if (isLoading) return <TableSkeleton />

  return (
    <section className="flex flex-col mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Actively visited sections</h3>

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
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
            {pageItems.map((visit, index) => (
              <tr key={`${visit.visitorId}-${visit.timestamp}`} className="transition-colors hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900">
                  {visit.sectionId}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                  {visit.city}, {visit.country}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                  {formatDuration(visit.duration)}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm">
                  {/* Предполагаем, что VisitData теперь включает isMock, как мы делали в сервисе */}
                  {'isMock' in visit && visit.isMock ? (
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Mock</span>
                  ) : (
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Live</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-600">
                  {formatDateTime(new Date(visit.timestamp))}
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
          onPageChangeAction={setPage}
        />

      </div>
    </section>
  )
}
