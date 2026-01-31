import './../styles/globals.css'
import { robotoMono, robotoSlab, inter } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth">
    <body className={`${robotoSlab.variable} ${robotoMono.variable} ${inter.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}