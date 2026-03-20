'use client'

import { useEffect, useMemo, useState } from 'react'

import { formatDateTime, formatDuration } from '@/shared/lib/format'
import { DataPlaceholder } from '@/shared/ui'
import { decodeLocation } from '@/shared/lib/utils'

import { TablePagination } from './index'

import type { VisitData } from '@/entities/analytics'

type Props = {
  visits: VisitData[]
  pageSize?: number
}

export function VisitsTable({ visits, pageSize = 15 }: Props) {
  const [page, setPage] = useState(1)
  const [mounted, setMounted] = useState(false)

  //stable sorted array
  const sortedVisits = useMemo(() => {
    return [...visits].sort((a, b) => b.timestamp - a.timestamp)
  }, [visits])

  const total = sortedVisits.length

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), totalPages))
  }, [totalPages])

  useEffect(() => {
    setMounted(true)
  }, [])

  const pageItems = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    return sortedVisits.slice(startIndex, startIndex + pageSize)
  }, [page, pageSize, sortedVisits])

  return (
    <section className="flex flex-col mt-8">
      <h2 className="text-xl font-semibold text-gray-900">Recent Visits</h2>

      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">
          Actively visited sections
        </h3>

        {total === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <DataPlaceholder type="empty" message="No visits recorded in this period." />
          </div>
        ) : (
          <>
            <div
              className="flex-1 max-h-[420px] overflow-y-auto rounded-md border border-gray-200 overflow-x-auto rounded-md border border-slate-100">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="sticky top-0 z-10 bg-slate-50">
                <tr>
                  {['Section', 'Location', 'Duration', 'Source', 'Date'].map((head) => (
                    <th
                      key={head}
                      className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      {head}
                    </th>
                  ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                {pageItems.map((visit, index) => (
                  <tr
                    key={`${visit.visitorId}-${visit.timestamp}-${index}`}
                    className="transition-colors hover:bg-slate-50/50">
                    <td className="whitespace-nowrap px-6 py-3 text-sm font-semibold text-slate-700">
                      {visit.sectionId}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-500">
                      {decodeLocation(visit.city)}, {visit.country ?? '_'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-500 font-mono">
                      {formatDuration(visit.duration)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm">
                      {visit.isMock ? (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 uppercase">
                          Mock
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                          Live
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3 text-sm text-slate-500">
                      {mounted ? formatDateTime(new Date(visit.timestamp)) : null}
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
          </>
        )}
      </div>
    </section>
  )
}
