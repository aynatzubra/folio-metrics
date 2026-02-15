'use client'

import MobileMenuShell from '@/components/common/MobileMenuShell'
import SiteMenuContent from '@/components/layout/SaitMenuContent'

type SiteMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SiteMobileMenu({ isOpen, onClose }: SiteMobileMenuProps) {
  return (
    <MobileMenuShell
      isOpen={isOpen}
      onClose={onClose}
      panelClass="bg-[#0B1120] p-4"
    >
      <SiteMenuContent
        onClose={onClose}
      />
    </MobileMenuShell>
  )
}
