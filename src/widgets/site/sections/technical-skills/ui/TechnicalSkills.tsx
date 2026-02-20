'use client'

import { useTranslations } from 'next-intl'

import { skillsData } from '@/widgets/site/sections/technical-skills/model/skills-data'
import { SkillCategory } from '@/lib/resume/types'
import { SplitSection } from '@/widgets/site/ui'

import SectionHeader from '../../SectionHeader'

function splitInHalf<T>(arr: T[]) {
  const mid = Math.ceil(arr.length / 2)
  return [arr.slice(0, mid), arr.slice(mid)] as const
}

function SkillsColumn({
                        categories,
                        t,
                      }: {
  categories: SkillCategory[]
  t: ReturnType<typeof useTranslations>
}) {
  return (
    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category.category}>
          <h3 className="mb-4 text-md font-[Inter] font-semibold uppercase tracking-widest text-accent">
            {t(category.category)}
          </h3>

          <div className="divide-y divide-black/5">
            {category.groups.map((group) => (
              <div key={group.groupName} className="py-4 first:pt-0 last:pb-0">
                <div className="text-sm font-semibold text-brand">{group.groupName}</div>
                <div className="mt-1 text-sm leading-relaxed text-gray-600">
                  {group.skills.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
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
