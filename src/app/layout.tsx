import './../styles/globals.css'
import { robotoMono, robotoSlab, inter } from '@/shared/config/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
    <body className={`${robotoSlab.variable} ${robotoMono.variable} ${inter.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}