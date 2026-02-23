export const switchLocaleService = (pathname: string, newLocale: string) => {
  if(!pathname) return '/'

  const segments = pathname.split('/')
  segments[1] = newLocale

  return segments.join('/')
}