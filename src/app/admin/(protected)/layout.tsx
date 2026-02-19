import { redirect } from 'next/navigation'


import AdminHeader from '@/widgets/admin/layout/AdminHeader'
import { auth } from '@/auth'

import type { ReactNode } from 'react'

function isDemoUser(user: { email?: string | null; name?: string | null }) {
  const email = user.email ?? ''
  const name = user.name ?? ''
  return email === 'demo@example.com' || name.toLowerCase().includes('demo')
}

type ProtectedLayoutProps = {
  children?: ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login?reason=auth')

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader isDemo={isDemoUser(session.user)} />
      <main className="mx-auto w-full max-w-[1200px] p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}
