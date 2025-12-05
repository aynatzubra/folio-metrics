'use client'

import { useTranslations } from 'next-intl'

import SectionHeader from '@/components/common/SectionHeader'
import { ExperienceItem } from '@/components/ui/ExperienceItem'
import { experienceData } from '@/data/experienceData'

export default function Experience() {
  const t = useTranslations('Experience')

  return (
    <div className="flex w-full text-gray-700 relative">
      <div className="absolute top-0 left-0 w-1/2 h-full lg:bg-[#F6D8C2] z-0 md:bg-gray-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FCF8F6] z-0" />

      <div className="w-full z-10 max-w-[1276px] mx-auto flex flex-col lg:flex-row h-full">
        {/* Left Part */}
        <SectionHeader
          title={t('leftTitle')} subtitle={t('leftSubtitle')}
          theme="peach" />

        {/* Right Part */}
        <div
          className=" bg-[#FCF8F6] flex-1 flex flex-col
              pt-[1.75rem] px-[1.75rem]
              lg:pt-[4.375rem] lg:pb-[1.6625rem]
              md:pt-[1.75rem] md:pb-[1.4rem] md:px-[3.5rem]"
        >
          <div className="flex flex-col relative">
            {experienceData.map((job, index) => (
              <ExperienceItem key={index} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
