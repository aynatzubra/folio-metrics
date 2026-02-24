import { StaticImageData } from 'next/image'

import { AdminMenuContent } from '@/widgets/admin/layout/index'
import { MobileMenuShell } from '@/shared/ui'

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
        onCloseAction={onClose}
        onLogoutAction={onLogout}
        user={user}
      />
    </MobileMenuShell>
  )
}