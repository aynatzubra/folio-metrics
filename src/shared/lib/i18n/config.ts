export const locales = ['en', 'ru'] as const
export type AppLocale = (typeof locales)[number]

export const defaultLocale: AppLocale = 'en'

export function isValidLocale(l: string | undefined): l is AppLocale {
  return typeof l === 'string' && (locales as readonly string[]).includes(l as AppLocale)
}
