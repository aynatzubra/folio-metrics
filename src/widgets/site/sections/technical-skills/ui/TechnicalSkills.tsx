'use client'

import { useTranslations } from 'next-intl'

import { SplitSection, SectionHeader } from '../../../section-ui'
import { skillsData } from '../model/skills-data'

import { SkillsColumn } from './SkillsColumn'

function splitInHalf<T>(arr: T[]) {
  const mid = Math.ceil(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)] as const
}

export function TechnicalSkills() {
  const t = useTranslations('TechnicalSkills')

  const [leftCategories, rightCategories] = splitInHalf(skillsData)

  return (
    <SplitSection
      className="text-gray-700"
      maxW={1276}
      leftPercent={30}
      leftBg="#F5F6F4"
      rightBg="#fff9f5"
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
          <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
            <SkillsColumn categories={leftCategories} t={t} />
            <SkillsColumn categories={rightCategories} t={t} />
          </div>
        </div>
      }
    />
  )
}
