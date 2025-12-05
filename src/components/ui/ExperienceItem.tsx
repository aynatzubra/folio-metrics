import { useTranslations } from 'next-intl'

import { ExperienceItemType } from '@/lib/resume/types'

type ExperienceItemProps = {
  job: ExperienceItemType
}
export const ExperienceItem = ({ job }: ExperienceItemProps) => {
  const t = useTranslations('Experience')
  const tCommon = useTranslations('Common')

  return (
    <div className="flex mb-12 relative">
      <div className="flex w-full flex-col md:flex-row gap-6">
        <div className="w-full md:w-4/12 flex flex-col">
          <h4 className="text-base text-[#F67769] font-bold uppercase mb-1">
            {job.company} | {job.period}
          </h4>
          <p className="text-xs font-medium mb-1">{job.role}</p>
          <p className="text-xs text-gray-500 mb-1">({t(job.about)})</p>
        </div>

        <div className="w-full md:w-8/12 flex flex-col gap-4">
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex flex-wrap justify-left gap-2 items-center">
              <span className="font-semibold">{tCommon('stack')} </span>
              {job.stack.map((skill) => (
                <span key={skill} className="bg-gray-200 text-gray-800 font-medium px-3 py-1 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[0.875rem] text-gray-500 space-y-2">
            <p>{t(job.description)}</p>
            <p>
              <span className="font-semibold">🏆 {tCommon('result')} </span>
              {t(job.result)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
