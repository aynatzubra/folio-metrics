import clsx from 'clsx'

import { CONTAINER_MAX_W, LEFT_COL_PERCENT, SECTION_Y_PADDING } from '@/lib/ui/tokens'

import type { ReactNode } from 'react'

type SplitSectionProps = {
  maxW?: number // default 1276
  leftPercent?: number // default 30

  leftBg: string
  rightBg: string

  mobileBgClass?: string // default 'bg-gray-50'

  className?: string

  left: ReactNode
  right: ReactNode
}

function roundPx(n: number) {
  return Math.round(n)
}

export function SplitSection({
                                       maxW = CONTAINER_MAX_W,
                                       leftPercent = LEFT_COL_PERCENT,
                                       leftBg,
                                       rightBg,
                                       mobileBgClass = 'bg-gray-50',
                                       className,
                                       left,
                                       right,
                                     }: SplitSectionProps) {
  const leftPx = roundPx((maxW * leftPercent) / 100)
  const rightPx = maxW - leftPx

  // Full-bleed split widths aligned to centered container
  const leftW = `calc((100% - ${maxW}px) / 2 + ${leftPx}px)`
  const rightW = `calc((100% - ${maxW}px) / 2 + ${rightPx}px)`

  return (
    <section className={clsx('relative isolate w-full', SECTION_Y_PADDING, className)}>
      {/* Mobile/tablet background (single tone) */}
      <div
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute inset-0 z-0 lg:hidden',
          mobileBgClass,
        )}
      />

      {/* Desktop background (aligned split) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden lg:block"
        style={{ width: leftW, background: leftBg }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden lg:block"
        style={{ width: rightW, background: rightBg }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex w-full flex-col lg:flex-row"
        style={{ maxWidth: maxW }}
      >
        {left}
        {right}
      </div>
    </section>
  )
}
