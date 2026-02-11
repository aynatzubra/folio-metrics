'use client'

type TablePaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export default function TablePagination({ page, pageSize, total, onPageChange }: TablePaginationProps) {
  if (total === 0) return null

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const canPrev = page > 1
  const canNext = page < totalPages

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(1, next), totalPages)
    if (clamped !== page) onPageChange(clamped)
  }

  if (total === 0) return null

  const goToClass =
    'rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 ' +
    'hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className="mt-4 flex flex-col gap-2 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
      <div className="inline-flex items-center justify-center gap-1 sm:order-2">
        <button
          type="button"
          onClick={() => goTo(page - 1)}
          disabled={!canPrev}
          className={goToClass}
        >
          Prev
        </button>
        <span className="px-1 text-xs text-gray-500">
      Page {page} of {totalPages}
    </span>
        <button
          type="button"
          onClick={() => goTo(page + 1)}
          disabled={!canNext}
          className={goToClass}
        >
          Next
        </button>
      </div>

      <div className="text-center sm:order-1 sm:text-left">
        Showing <span className="font-medium">{from}</span>–
        <span className="font-medium">{to}</span> of{' '}
        <span className="font-medium">{total}</span> visits
      </div>
    </div>
  )
}