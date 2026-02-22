import { getRequestConfig } from 'next-intl/server'

import { AppLocale, defaultLocale, isValidLocale } from '@/shared/lib/i18n/config'

export default getRequestConfig(async ({ locale }) => {
  const active = isValidLocale(locale) ? (locale as AppLocale) : defaultLocale
  const messages = (await import(`../../assets/messages/${active}.json`)).default
  return { locale: active, messages }
})
