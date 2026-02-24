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
          <article className="max-w-3xl">
            {/* Accent label */}
            <h3 className="text-base font-semibold uppercase tracking-widest text-accent">
              {t('educ')}
            </h3>

            {/* Title */}
            <h4 className="mt-3 text-sm leading-relaxed text-gray-800">
              {t('pathTitle')}
            </h4>

          </article>
        </div>
      }
    />
  )
}
