import '@/shared/lib/fontawesome'
import '@/shared/styles/globals.css'
import { Metadata } from 'next'

import { inter, robotoMono, robotoSlab } from '@/shared/config'
import { AnalyticsProvider } from '@/shared/api/analytics'

export const metadata: Metadata = {
  title: 'Tatiana Arbuz | Frontend Engineer',
  description: 'Frontend-oriented full-stack engineer building scalable React and Next.js applications.',
  metadataBase: new URL('https://www.arbuz.buzz'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
    <body className={`${robotoSlab.variable} ${robotoMono.variable} ${inter.variable} antialiased`}>
    <AnalyticsProvider>
      {children}
    </AnalyticsProvider>
    </body>
    </html>
  )
}