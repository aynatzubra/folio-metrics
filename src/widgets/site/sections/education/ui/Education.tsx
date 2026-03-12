'use client'

import { useTranslations } from 'next-intl'

import { SplitSection, SectionHeader } from '@/widgets/site/ui'

export function Education() {
  const t = useTranslations('Education')

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
          <h3 className="mb-2 text-lg font-[Inter] font-medium tracking-wide text-accent">
            {t('university')} < br />
            {t('line')}
          </h3>
          <h4 className="mt-2 text-base leading-relaxed text-gray-800">
            {t('pathTitle')}
          </h4>
        </div>
      }
    />
  )
}
