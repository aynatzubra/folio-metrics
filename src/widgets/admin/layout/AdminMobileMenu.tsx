import { StaticImageData } from 'next/image'

import MobileMenuShell from '@/components/common/MobileMenuShell'
import { AdminMenuContent } from '@/widgets/admin/layout/index'

type AdminMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  user: { name: string, avatar: StaticImageData | string }}

export function AdminMobileMenu({ isOpen, onClose, onLogout, user }: AdminMobileMenuProps) {
  return (
    <MobileMenuShell
      isOpen={isOpen}
      onClose={onClose}
      panelClass="bg-[#0B1120] p-4"
    >
      <AdminMenuContent
        onClose={onClose}
        onLogout={onLogout}
        user={user}
      />
    </MobileMenuShell>
  )
}