'use client'

import { useTranslations } from 'next-intl'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

import SectionHeader from '@/components/common/SectionHeader'

const STATIC_DEMO_EMAIL = 'demo@example.com'
const STATIC_DEMO_PASSWORD = 'demo123'

export default function Additional() {
  const t = useTranslations('Additional')

  const featureKeys = ['item1', 'item2', 'item3', 'item4', 'item5']

  return (
    <section className="flex w-full text-gray-700 relative">
      <div className="absolute top-0 left-0 w-1/2 h-full lg:bg-[#F6D8C2] z-0 md:bg-gray-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FCF8F6] z-0" />

      <div className="w-full z-10 max-w-[1276px] mx-auto flex flex-col lg:flex-row h-full">
        {/* Левая часть */}
        <SectionHeader
          title={t('leftTitle')} subtitle={t('leftSubtitle')}
          theme="peach" />

        {/* Right Part */}
        <div
          className="bg-[#FCF8F6] flex-1 flex flex-col
        pt-[1.75rem]
                  px-[1.75rem]

                  lg:pt-[4.375rem]
                  lg:pb-[1.6625rem]

                  md:pt-[1.75rem]
                  md:pb-[1.4rem]
                  md:px-[3.5rem]"
        >
          <div className="flex flex-col">
            {/* Intro */}
            <p className="text-base mb-4 text-gray-700">{t('intro')}</p>

            {/* Project Name */}
            <h3 className="text-lg font-bold uppercase text-[#F67769] mb-4">{t('projectTitle')}</h3>

            {/* Fetches */}
            <ul className="space-y-2 text-sm text-gray-800 mb-6">
              {featureKeys.map((key) => (
                <li key={key} className="flex items-center pt-1">
                  <span className="text-[#F67769] mr-2">◆</span>
                  <span>
                    {t.rich(`projectFeatures.${key}`, {
                      highlight: (chunks) => <span className="font-semibold">{chunks}</span>,
                    })}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <a
                href={`/admin/login?email=${STATIC_DEMO_EMAIL}&password=${STATIC_DEMO_PASSWORD}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
        inline-flex items-center justify-center px-6 py-3
        max-w-xs bg-[#F67769] text-white font-semibold rounded-lg
        hover:bg-gray-700 transition-colors duration-300
      "
              >
                <FontAwesomeIcon icon={faEye} className="mr-3" />
                {t('buttonDemoText')}
              </a>

              <a
                href="https://github.com/devforthewin/folio-metrics"
                target="_blank"
                rel="noopener noreferrer"
                className="
        inline-flex items-center justify-center px-6 py-3
        max-w-xs bg-gray-800 text-white font-semibold rounded-lg
        hover:bg-gray-700 transition-colors duration-300
      "
              >
                <FontAwesomeIcon icon={faGithub} className="mr-3" />
                {t('buttonText')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
