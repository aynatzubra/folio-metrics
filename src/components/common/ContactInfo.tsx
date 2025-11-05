'use client'

import { useTranslations } from 'next-intl'

export default function ContactInfo() {
  const t = useTranslations('Common')
  return (
    <div
      className="
      grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2
      gap-8 leading-[1.75]
      text-center sm:text-left
    "
    >
      <div>
        <h4 className="font-semibold text-[#F67769]">{t('telegram')}</h4>
        <p className="text-gray-800 font-normal">@tanya_arbuz</p>
      </div>
      <div>
        <h4 className="font-semibold text-[#F67769]">{t('mail')}</h4>
        <a
          href="mailto:work.arbuz@gmail.com"
          target="_blank"
          className="text-gray-800 font-normal hover:text-[#D45E56] transition-colors duration-200"
        >
          work.arbuz@gmail.com
        </a>
      </div>
    </div>
  )
}
