import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbuz Tanya | Frontend Engineer',
  description: 'Hi! This is my live resume and a demonstration of my development skills. The project is built on Next.js and includes custom analytics.',
}

export default async function SiteRootLayout({ children, params }: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
