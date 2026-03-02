import '@/shared/lib/fontawesome'
import '@/shared/styles/globals.css'
import { inter, robotoMono, robotoSlab } from '@/shared/config'
import { AnalyticsProvider } from '@/shared/api'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
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