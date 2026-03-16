import { StaticImageData } from 'next/image'

import { MobileMenuShell } from '@/shared/ui'

import { AdminMenuContent } from './AdminMenuContent'

type AdminMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  user: { name: string, avatar: StaticImageData | string }
}

export function AdminMobileMenu({ isOpen, onClose, onLogout, user }: AdminMobileMenuProps) {
  return (
    <MobileMenuShell
      isOpen={isOpen}
      onClose={onClose}
      panelClass="bg-[#0B1120] p-4"
    >
      <AdminMenuContent
        onClose={onClose}
        onLogoutAction={onLogout}
        user={user}
      />
    </MobileMenuShell>
  )
}