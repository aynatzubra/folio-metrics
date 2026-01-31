import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbuz Tanya | Frontend Engineer',
  description: '',
}

export default async function SiteRootLayout({ children, params }: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
