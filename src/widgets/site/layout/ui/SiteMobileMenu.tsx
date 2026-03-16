'use client'

import { MobileMenuShell } from '@/shared/ui'

import { SiteMenuContent } from './index'

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
      <SiteMenuContent
        onClose={onClose}
      />
    </MobileMenuShell>
  )
}
