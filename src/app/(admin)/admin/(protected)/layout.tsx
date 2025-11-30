import AdminHeader from '@/components/admin/AdminHeader'
import { auth } from '@/auth'

import type { ReactNode } from 'react'


type ProtectedLayoutProps = {
  children?: ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth()

  const isDemo =
    !!session?.user &&
    (
      session.user.email === 'demo@example.com' ||
      session.user.name?.toLowerCase().includes('demo')
    )

  return (
    <div>
      <AdminHeader isDemo={isDemo} />
      {children}
    </div>
  )
}
