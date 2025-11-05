import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

import { robotoMono, robotoSlab } from '@/lib/fonts'
import '../../../lib/fontawesome'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Arbuz Tanya | Frontend Engineer',
  description: 'Hi! This is my live resume and a demonstration of my development skills. The project is built on Next.js and includes custom analytics.',
}

export default async function RootLayout({
   children,
   params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={`${robotoSlab.variable} ${robotoMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
