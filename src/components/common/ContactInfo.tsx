import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function ContactInfo() {
  const t = useTranslations('Hero')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`

  const links = [
    {
      label: 'GitHub',
      href: 'https://github.com/aynatzubra',
      external: true,
    },
    {
      label: 'Telegram',
      href: 'https://t.me/tanya_arbuz',
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tanya-arbuz',
      external: true,
    },
    {
      label: 'Send mail',
      href: 'mailto:work.arbuz@gmail.com',
      external: true,
    },
  ]

  const baseButton =
    'inline-flex items-center justify-center rounded-sm px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors'
  const primaryButton =
    baseButton + ' bg-[#F67769] text-white shadow-sm hover:bg-[#E1594F]'
  const outlineButton =
    baseButton +
    ' border border-[#F67769] text-[#F67769] hover:bg-[#FFF3EF]'

  return (
    <div className="mt-6 mb-4 flex flex-wrap gap-3">
      {/* Download CV */}
      <Link
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className={primaryButton}
      >
        {t('buttons.cv')}
      </Link>

      {/* Social / contact links */}
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noreferrer noopener' : undefined}
          className={outlineButton}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
