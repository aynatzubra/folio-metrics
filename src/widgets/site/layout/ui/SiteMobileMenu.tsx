'use client'

import { MobileMenuShell } from '@/shared/ui'

import { SaitMenuContent } from './SaitMenuContent'

type SiteMobileMenuProps = {
  isOpen: boolean
  onCloseAction: () => void
}

export function SiteMobileMenu({ isOpen, onCloseAction }: SiteMobileMenuProps) {
  return (
    <MobileMenuShell
      isOpen={isOpen}
      onClose={onCloseAction}
      panelClass="bg-[#0B1120] p-4"
    >
      <SaitMenuContent
        onCloseAction={onCloseAction}
      />
    </MobileMenuShell>
  )
}
