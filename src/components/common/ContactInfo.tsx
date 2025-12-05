import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { CONTACT_LINKS } from '@/data/navigation'

export default function ContactInfo() {
  const t = useTranslations('Hero')
  const tCommon = useTranslations('Common')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`

  const baseButton =
    'inline-flex items-center justify-center rounded-sm px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors'
  const primaryButton =
    baseButton + ' bg-[#F67769] text-white shadow-sm hover:bg-[#E1594F]'
  const outlineButton =
    baseButton +
    ' border border-[#F67769] text-[#F67769] hover:bg-[#FFF3EF]'

  return (
    <div className="mt-6 mb-4 flex flex-wrap justify-center lg:justify-start gap-3">
      {/* Download CV */}
      <Link
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className={primaryButton}
      >
        {t('buttons.cv')}
      </Link>

      {/* Social / contact links */}
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
