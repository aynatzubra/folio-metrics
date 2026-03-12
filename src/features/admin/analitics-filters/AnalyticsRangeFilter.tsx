'use client'

import clsx from 'clsx'

import { ANALYTICS_RANGE_OPTIONS, RangeOptionValue } from '@/widgets/admin/analytics'

type Props = {
  value: RangeOptionValue
  onChangeAction: (value: RangeOptionValue) => void
}

export function AnalyticsRangeFilter({ value, onChangeAction }: Props) {
  return (
    <div className="mt-3 sm:mt-0 flex items-center gap-2 text-sm text-gray-600">
      <div className="inline-flex items-center gap-2 overflow-hidden">
        {ANALYTICS_RANGE_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeAction(option.value)}
            className={clsx(
              'cursor-pointer rounded-[0.2rem] px-3 py-2 text-xs font-medium transition',
              option.value === value
                ? 'bg-[#5070DD] text-white hover:opacity-90'
                : 'bg-[#C7D3FF] text-[#5070DD] hover:bg-[#5070DD] hover:text-white',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}