'use client'

import { Fragment, ReactNode } from 'react'
import { Transition, Dialog } from '@headlessui/react'

interface ShellProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  panelClass?: string
}

export default function MobileMenuShell({ isOpen, onClose, children, panelClass = '' }: ShellProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[100]">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className={`fixed top-0 right-0 flex flex-col w-full h-full max-w-xs shadow-2xl ${panelClass}`}>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}