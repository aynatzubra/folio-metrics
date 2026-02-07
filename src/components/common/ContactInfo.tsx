'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

import { CONTACT_LINKS } from '@/data/navigation'

type Variant = 'hero' | 'footer'

type ContactActionsProps = {
  variant?: Variant
  className?: string
}

export default function ContactInfo({
                                      variant = 'hero',
                                      className = '',
                                    }: ContactActionsProps) {
  const t = useTranslations('Hero')
  const tCommon = useTranslations('Common')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`

  const baseButton =
    'inline-flex items-center justify-center rounded-[4px]' +
    'font-bold tracking-widest outline-none' +
    'transition-colors duration-200 ease-out ' +
    'focus-visible:ring-2 focus-visible:ring-offset-2'

  const colorScheme =
    variant === 'footer'
      ? {
        primary:
          'bg-accent text-white border-accent hover:bg-accent/90',
        outline:
          'bg-transparent text-white border-white/70 hover:bg-accent/10',
      }
      : {
        primary:
          'bg-brand text-white border-brand ' +
          'hover:shadow-[0_10px_10px_-8px_rgba(11,54,61,0.45)]',
        outline:
          'bg-transparent text-brand border-brand hover:bg-brand/5',
      }

  const layout =
    variant === 'footer'
      ? 'flex flex-wrap justify-center gap-3'
      : 'flex flex-col gap-4'

  const size =
    variant === 'footer'
      ? 'px-3 py-2 text-xs border-1 w-auto'
      : 'px-8 py-4 text-sm border-2 w-full lg:w-64'

  return (
    <div className={`${layout} ${className}`}>
      <Link
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className={`${baseButton} ${colorScheme.primary} ${size}`}
      >
        {t('buttons.cv')}
      </Link>

      {CONTACT_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          className={`${baseButton} ${colorScheme.outline} ${size}`}
        >
          {tCommon(link.labelKey)}
        </a>
      ))}
    </div>
  )
}
