'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition, Dialog } from '@headlessui/react' // Используем Headless UI для доступности (accessibility)

export default function MobileMenu({ isOpen, onClose, socials, user, onLogout }) {
  const socialLinks = [
    { icon: socials.faTelegramPlane, href: 'https://t.me/tanya_arbuz', text: 'Telegram' },
    { icon: socials.faLinkedinIn, href: 'https://www.linkedin.com/in/tanya-arbuz', text: 'LinkedIn' },
    { icon: socials.faYandex, href: 'https://mail.yandex.ru/compose?to=arbuztatiana@yandex.ru', text: 'Yandex' },
  ]

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Darkening back */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        {/* Menu panel */}
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel
            className="fixed top-0 right-0 flex flex-col w-full h-full max-w-xs p-6 bg-[#111827] text-white">
            {/* Top part: close and logo */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 transition hover:text-white focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round" strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation and socials */}
            <nav className="flex flex-col flex-grow gap-4">
              <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase">Contacts</span>
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 -m-3 text-lg rounded-lg hover:bg-white/10"
                >
                  <FontAwesomeIcon icon={link.icon} className="w-6 h-6" />
                  {link.text}
                </a>
              ))}
            </nav>

            {/* Bottom part: profile and close */}
            <div className="pt-6 mt-6 border-t border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={user.avatar} alt="User Avatar"
                  width={48} height={48}
                  className="rounded-full" />
                <div>
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-400">Admin</div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-sm font-medium text-left text-red-400 rounded-lg hover:bg-red-500/20"
              >
                Logout
              </button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
