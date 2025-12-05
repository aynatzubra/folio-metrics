import './../styles/globals.css'
import { robotoMono, robotoSlab } from '@/lib/fonts'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
    <body className={`${robotoSlab.variable} ${robotoMono.variable} antialiased`}>
    {children}
    </body>
    </html>
  )
}