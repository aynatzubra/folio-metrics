import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import type { ExperienceItemType } from './../model/types'
import type { ReactNode } from 'react'

type ExperienceItemProps = {
  job: ExperienceItemType
  className?: string
}

export const ExperienceItem = ({ job, className }: ExperienceItemProps) => {
  const t = useTranslations('Experience')
  const tCommon = useTranslations('Common')

  const secondary = (chunks: ReactNode) => (
    <span className="font-medium text-gray-600">{chunks}</span>
  )

  return (
    <article
      className={clsx(
        `
          border-b border-black/5
          pb-10 mb-10
          last:border-b-0 last:pb-0 last:mb-0
        `,
        className,
      )}
    >
      <div className="flex w-full flex-col gap-6 md:flex-row">
        {/* Left meta */}
        <header className="w-full md:w-4/12">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-xl font-[Inter] font-medium tracking-wide text-accent">
              {job.role}
            </h3>
          </div>

          <p className="mt-1 text-sm font-medium text-brand">{job.company}</p>

          <span className="text-base text-gray-500">{job.period}</span>
        </header>

        {/* Right content */}
        <div className="w-full md:w-8/12 space-y-5 text-base leading-relaxed">

          {/* Stack chips */}
          <div className="text-brand font-light">
            <span className="font-normal">
              {tCommon('stack')}:
            </span>{' '}
            {job.stack.join(', ')}
          </div>


          {/* Description + result */}
          <div className="space-y-3 text-gray-600">
            <p>{t.rich(job.description, { secondary })}</p>
            {/*<p>{t(job.description)}</p>*/}

            {job.result && (
              <div>
                <span className="text-brand font-normal">
                  {tCommon('result')}:
                </span>{' '}
                {t(job.result)}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
