'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import clsx from 'clsx'

import { locales } from '@/i18n/config'

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const nextLocale =
    locales.find((locale) => locale !== currentLocale) || currentLocale

  const handleSwitch = (newLocale: string) => {
    if (newLocale === currentLocale) return

    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')

    router.push(newPath)
  }

  return (
    <button
      type="button"
      onClick={() => handleSwitch(nextLocale)}
      className={clsx(
        'inline-flex h-9 items-center justify-center rounded-sm px-4 text-xs font-semibold uppercase tracking-[0.12em]',
        'bg-[#F67769] text-white shadow-sm transition-colors hover:bg-[#e1594f]',
      )}
    >
      {nextLocale.toUpperCase()}
    </button>
  )
}
