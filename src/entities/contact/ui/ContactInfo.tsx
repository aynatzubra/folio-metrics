'use client'

import { useLocale, useTranslations } from 'next-intl'

import { PRIMARY_CONTACTS } from '@/entities/contact'

import { getContactStyles } from './ContactInfo.styles'

type Variant = 'hero' | 'footer'

type ContactActionsProps = {
  variant?: Variant
  className?: string
}

export function ContactInfo({
                              variant = 'hero',
                              className = '',
                            }: ContactActionsProps) {
  const t = useTranslations('Hero')
  const tCommon = useTranslations('Common')
  const locale = useLocale()

  const cvPath = `/assets/cv/${locale}.pdf`
  const styles = getContactStyles(variant)
  const isHero = variant !== 'footer'

  const renderLinks = (btnSize: string) => (
    <>
      <a
        href={cvPath}
        download={`CV_${locale}.pdf`}
        className={`${styles.baseButton} ${styles.colorScheme.primary} ${btnSize} text-center`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('buttons.cv')}
      </a>
      {PRIMARY_CONTACTS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : undefined}
          rel={link.href.startsWith('http') ? 'noreferrer noopener' : undefined}
          aria-label={link.labelKey}
          className={`${styles.baseButton} ${styles.colorScheme.outline} ${btnSize} text-center`}
        >
          {tCommon(link.labelKey)}
        </a>
      ))}
    </>
  )

  return (
    <div className={`${styles.layout} ${className}`}>
      {isHero ? (
        <div className={styles.heroInnerLayout}>
          {renderLinks(`${styles.size} w-full sm:max-w-[250px]`)}
        </div>
      ) : (
        // footer
        renderLinks(styles.size)
      )}
    </div>
  )
}
