'use client'

type TablePaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChangeAction: (nextPage: number) => void
}

export default function TablePagination({ page, pageSize, total, onPageChangeAction }: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const canPrev = page > 1
  const canNext = page < totalPages

  const handlePrev = () => {
    if (canPrev) {
      onPageChangeAction(page - 1)
    }
  }
  const handleNext = () => {
    if (canNext) {
      onPageChangeAction(page + 1)
    }
  }

  if (total === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
      <div>
        Showing <span className="font-medium">{from}</span>–<span className="font-medium">{to}</span>{' '}
        of <span className="font-medium">{total}</span> visits
      </div>

      <div className="inline-flex items-center gap-1">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canPrev}
          className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-1 text-xs text-gray-500">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canNext}
          className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}