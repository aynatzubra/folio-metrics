'use client'

type TablePaginationProps = {
  page: number
  pageSize: number
  total: number
  onPageChangeAction: (page: number) => void
}

export function TablePagination({ page, pageSize, total, onPageChangeAction }: TablePaginationProps) {
  if (total === 0) return null

  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, total)

  const btnClass = 'px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border border-slate-200 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50'

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
      <div className="text-center sm:text-left text-xs text-slate-400">
        Showing <span className="font-bold text-slate-600">{from}</span>–
        <span className="font-bold text-slate-600">{to}</span> of{' '}
        <span className="font-bold text-slate-600">{total}</span> visits
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => onPageChangeAction(page - 1)}
          className={btnClass}
        >
          Prev
        </button>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Page {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChangeAction(page + 1)}
          className={btnClass}
        >
          Next
        </button>
      </div>
    </div>
  )
}