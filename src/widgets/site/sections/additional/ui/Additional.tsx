'use client'

import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { SplitSection, SectionHeader } from '@/widgets/site/ui'

const featureKeys = ['item1', 'item2', 'item3', 'item4'] as const

const baseButtonStyles =
  'inline-flex items-center justify-center rounded-md ' +
  'px-5 py-2.5 text-base text-white ' +
  'transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F8F8]'

export function Additional() {
  const t = useTranslations('Additional')

  const highlight = (chunks: React.ReactNode) => (
    <span className="font-semibold text-gray-900">{chunks}</span>
  )

  const router = useRouter()
  useEffect(() => {
    router.prefetch('/admin/login?demo=1')
  }, [router])

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
          <div className="max-w-3xl">
            <h3 className="mb-5 text-xl font-[Inter] font-medium tracking-wide text-accent">
              {t('projectTitle')}
            </h3>

            {/* Intro */}
            <p className="mb-6 text-base leading-relaxed text-gray-700">
              {t('intro')}
            </p>

            {/* Features */}
            <ul className="mb-8 space-y-3 text-base leading-relaxed text-gray-700">
              {featureKeys.map((key) => (
                <li key={key} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>
                    {t.rich(`projectFeatures.${key}`, { highlight })}
                  </span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/admin/login?demo=1"
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseButtonStyles} bg-accent hover:bg-accent/90 focus-visible:ring-accent/40`}
              >
                <FontAwesomeIcon icon={faEye} className="mr-2 h-4 w-4" />
                {t('buttonDemoText')}
              </Link>

              <Link
                href="https://github.com/aynatzubra/folio-metrics"
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseButtonStyles} bg-gray-900 hover:bg-gray-800 focus-visible:ring-gray-900/30`}
              >
                <FontAwesomeIcon icon={faGithub} className="mr-2 h-4 w-4" />
                {t('buttonText')}
              </Link>
            </div>
          </div>
        </div>
      }
    />
  )
}
