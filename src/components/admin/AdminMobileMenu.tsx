import { StaticImageData } from 'next/image'

import MobileMenuShell from '@/components/common/MobileMenuShell'
import AdminMenuContent from '@/components/admin/AdminMenuContent'

type AdminMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
  user: { name: string, avatar: StaticImageData | string }}

export default function AdminMobileMenu({ isOpen, onClose, onLogout, user }: AdminMobileMenuProps) {
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