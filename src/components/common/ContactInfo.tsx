import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { CONTACT_LINKS } from '@/data/navigation'

export default function ContactInfo() {
  const t = useTranslations('Hero')
  const tCommon = useTranslations('Common')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`

  const baseButton =
    'inline-flex items-center justify-center rounded-[4px] px-8 py-4 text-sm font-bold tracking-widest w-full lg:w-64 outline-none border-2 ' +
    'transition-[box-shadow,background-color,color] duration-200 ease-out ' +
    'focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F6F4]'

  const primaryButton = `
    ${baseButton}
      bg-brand text-white border-brand
      hover:shadow-[0_10px_10px_-8px_rgba(11,54,61,0.45)]
      active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]
   `
  const outlineButton = `
    ${baseButton}
    bg-transparent text-brand border-brand
    hover:bg-brand/5
  `

  return (
    <div className="flex flex-col gap-4 mt-6 mb-4 justify-center lg:justify-start gap-3">
      {/* Download CV */}
      <Link
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className={primaryButton}
      >
        {t('buttons.cv')}
      </Link>

      {CONTACT_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={outlineButton}
        >
          {tCommon(link.labelKey)}
        </a>
      ))}
    </div>
  )
}
