import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import type { ExperienceItemType } from './../model/types'


type ExperienceItemProps = {
  job: ExperienceItemType
  className?: string
}

export const ExperienceItem = ({ job, className }: ExperienceItemProps) => {
  const t = useTranslations('Experience')
  const tCommon = useTranslations('Common')

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
            <h4 className="text-lg font-[Inter] font-semibold tracking-wide text-accent">
              {job.role}
            </h4>
          </div>

          <p className="mt-2 text-sm font-bold text-gray-800">{job.company}</p>
          <p className="mt-1 text-sm text-gray-500">
            ({t(job.about)})
          </p>
          <span className="text-sm text-gray-500">{job.period}</span>
        </header>

        {/* Right content */}
        <div className="w-full md:w-8/12 space-y-5">

          {/* Stack chips */}
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-600">
              {tCommon('stack')}:
            </span>{' '}
            {job.stack.join(', ')}
          </div>


          {/* Description + result */}
          <div className="space-y-3 text-sm leading-relaxed text-gray-600">
            <p>{t(job.description)}</p>

            <p>
              <span className="font-semibold text-gray-800">
                {tCommon('result')}:
              </span>{' '}
              {t(job.result)}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
