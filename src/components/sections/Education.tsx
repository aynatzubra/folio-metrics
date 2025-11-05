'use client'

import { useTranslations } from 'next-intl'

import SectionHeader from '@/components/common/SectionHeader'

export default function Education() {
  const t = useTranslations('Education')

  return (
    <section className="flex w-full text-gray-700 relative">
      <div className="absolute top-0 left-0 w-1/2 h-full lg:bg-[#FBE1D0] z-0 md:bg-gray-50" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFFFFF] z-0" />

      <div className="w-full z-10 max-w-[1276px] mx-auto flex flex-col lg:flex-row h-full">
        {/* Left Part */}
        <SectionHeader
          title={t('leftTitle')} subtitle={t('leftSubtitle')}
          theme="cream" />

        {/* Right Part */}
        <div
          className="
          bg-[#FFFFFF]
          flex-1 flex flex-col
          pt-[1.75rem] px-[1.75rem]
          lg:pt-[4.375rem] lg:pb-[1.6625rem]
          md:pt-[1.75rem] md:pb-[1.4rem] md:px-[3.5rem]"
        >
          <div className="flex mb-12 relative pl-8">
            <div className="flex w-full gap-4 items-start">
              <div className="flex flex-col">
                <h3 className="text-base font-bold uppercase text-[#F67769] mb-2">{t('educ')}</h3>
                <hr className="w-full h-[3px] bg-[#F67769] border-none rounded-full my-2"></hr>
                <div>
                  <h3 className="text-base mb-3">{t('pathTitle')}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
