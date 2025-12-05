'use client'

import { useTranslations } from 'next-intl'

import SectionHeader from '@/components/common/SectionHeader'
import { skillsData } from '@/data/skillsData'

export default function TechnicalSkills() {
  const t = useTranslations('TechnicalSkills')

  const leftCategories = skillsData.filter((c) => c.side === 'left')
  const rightCategories = skillsData.filter((c) => c.side === 'right')

  return (
    <div className="flex w-full text-gray-700 relative">
      <div className="absolute top-0 left-0 w-1/2 h-full lg:bg-[#FBE1D0] z-0 md:bg-gray-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFFFFF] z-0" />

      <div className="w-full z-10 max-w-[1276px] mx-auto flex flex-col lg:flex-row h-full">
        {/* Left Part */}
        <SectionHeader
          title={t('leftTitle')}
          subtitle={t('leftSubtitle')}
          theme="cream"
        />

        {/* Right */}
        <div
          className="bg-[#FFFFFF] flex-1 flex flex-col pt-[1.75rem] px-[1.75rem] lg:pt-[4.375rem] lg:pb-[1.6625rem] md:pt-[1.75rem] md:pb-[1.4rem] md:px-[3.5rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
            {/* Left Column */}
            <div className="space-y-10 order-1">
              {leftCategories.map((category) => (
                <section key={category.category}>
                  <h3 className="text-md font-bold mb-4 uppercase text-[#F67769]">
                    {t(category.category)}
                  </h3>
                  <ul className="space-y-3">
                    {category.groups.map((group) => (
                      <li
                        key={group.groupName}
                        className="flex items-start text-sm text-gray-800 leading-relaxed"
                      >
                        <span className="h-2 w-2 bg-[#F67769] rounded-full mr-3 shrink-0 mt-2"></span>
                        <span className="text-gray-600">
                        <span className="font-semibold text-gray-800">{group.groupName}:</span>{' '}
                          {group.skills.join(', ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* Right Col */}
            <div className="space-y-10 order-2">
              {rightCategories.map((category) => (
                <section key={category.category}>
                  <h3 className="text-md font-bold mb-4 uppercase text-[#F67769]">
                    {t(category.category)}
                  </h3>
                  <ul className="space-y-3">
                    {category.groups.map((group) => (
                      <li
                        key={group.groupName}
                        className="flex items-start text-sm text-gray-800 leading-relaxed"
                      >
                        <span className="h-2 w-2 bg-[#F67769] rounded-full mr-3 shrink-0 mt-2"></span>
                        <span className="text-gray-600">
                        <span className="font-semibold text-gray-800">{group.groupName}:</span>{' '}
                          {group.skills.join(', ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
