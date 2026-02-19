'use client'

import MobileMenuShell from '@/components/common/MobileMenuShell'
import { SaitMenuContent } from '@/widgets/site/layout/SaitMenuContent'

type SiteMobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export function SiteMobileMenu({ isOpen, onClose }: SiteMobileMenuProps) {
  return (
    <MobileMenuShell
      isOpen={isOpen}
      onClose={onClose}
      panelClass="bg-[#0B1120] p-4"
    >
      <SaitMenuContent
        onClose={onClose}
      />
    </MobileMenuShell>
  )
}
