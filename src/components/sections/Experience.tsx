'use client'

import { useTranslations } from 'next-intl'

import SectionHeader from '@/components/common/SectionHeader'
import { ExperienceItem } from '@/components/ui/ExperienceItem'
import { experienceData } from '@/data/experienceData'
import SplitSection from '@/components/layout/SplitSection'

export default function Experience() {
  const t = useTranslations('Experience')

  return (
    <SplitSection
      className="text-gray-700"
      maxW={1276}
      leftPercent={30}
      leftBg="#F0F2F0"
      rightBg="#F8F8F8"
      mobileBgClass="bg-gray-50"
      left={
        <div className="w-full lg:flex-[0_0_30%]">
          <SectionHeader title={t('leftTitle')} subtitle={t('leftSubtitle')} />
        </div>
      }
      right={
        <div
          className="
            flex flex-1 flex-col
            px-7 pt-7
            md:px-14
            lg:pt-5
          "
        >
          <div className="flex flex-col">
            {experienceData.map((job) => (
              <ExperienceItem key={`${job.company}-${job.period}`} job={job} />
            ))}
          </div>
        </div>
      }
    />
  )
}
