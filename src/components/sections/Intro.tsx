'use client'

import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import SectionHeader from '@/components/common/SectionHeader'
import SplitSection from '@/components/layout/SplitSection'

import type { ReactNode } from 'react'

export default function Intro() {
  const t = useTranslations('AboutMe')

  const priorities = [
    t('description2_item1'),
    t('description2_item2'),
    t('description2_item3'),
  ]

  const highlight = (chunks: ReactNode) => (
    <span className="font-semibold text-accent">{chunks}</span>
  )

  const secondary = (chunks: ReactNode) => (
    <span className="font-semibold text-gray-800">{chunks}</span>
  )

  return (
    <SplitSection
      className="text-gray-700"
      maxW={1276}
      leftPercent={30}
      leftBg="#E0E3E3"
      rightBg="#F1F3F1"
      mobileBgClass="bg-gray-50"
      left={
        <div className="w-full lg:flex-[0_0_30%]">
          <SectionHeader
            title={t('leftTitle')}
            subtitle={t('leftSubtitle')}
          />
        </div>
      }
      right={
        <div
          className="
            flex flex-1 flex-col
            px-7 pt-7 pb-12
            md:px-14
            lg:pt-16 lg:pb-6
          "
        >
          <p className="mb-6 leading-relaxed">
            {t.rich('description1', { highlight, secondary })}
          </p>

          <div className="mb-6">
            <h3 className="mb-3 font-semibold text-gray-800">
              {t('description2_title')}
            </h3>

            <ul className="space-y-2">
              {priorities.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheck} className="h-3.5 w-3.5 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="mb-12 leading-relaxed">
            {t.rich('description2', { highlight, secondary })}
          </p>
        </div>
      }
    />
  )
}
