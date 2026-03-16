'use client'

import Image, { StaticImageData } from 'next/image'

import { SocialLinks } from './SocialLinks'

type AdminMenuContentProps = {
  onClose: () => void
  onLogoutAction: () => void
  user: { name: string, avatar: StaticImageData | string }
}

const logoutBtnClass =
  'group flex items-center justify-center w-full ' +
  'px-5 py-4 text-sm font-bold text-red-400 ' +
  'border border-red-500/20 rounded-xl hover:bg-red-500/10 ' +
  'transition-all active:scale-95'

export function AdminMenuContent({ onClose, onLogoutAction, user }: AdminMenuContentProps) {
  return (
    <div className="flex flex-col h-full min-h-[100dvh]">
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-white transition-colors focus:outline-none"
          aria-label="Close menu"
        >
          <svg
            className="w-8 h-8" fill="none"
            viewBox="0 0 24 24" stroke="currentColor"
            strokeWidth={1.5}>
            <path
              strokeLinecap="round" strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="mt-8 mb-10 px-2">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={user.avatar}
              alt="Avatar"
              width={56}
              height={56}
              priority
              className="rounded-full ring-2 ring-accent p-0.5"
            />
            <span
              className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111827] rounded-full"></span>
          </div>
          <div>
            <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Welcome back,</p>
            <h3 className="text-lg font-bold text-white leading-tight">{user.name}</h3>
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="flex-grow px-2">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-4 opacity-50">
          Quick Contacts
        </h4>
        <SocialLinks variant="buttons" />
      </div>

      {/* footer */}
      <div className="mt-auto pt-10 mb-28 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="mb-8 text-center">
          <p className="text-lg leading-snug text-gray-400 font-medium italic">
            If you need results — <br />
            <span
              className="text-white not-italic font-extrabold uppercase text-sm tracking-tighter">let’s talk.</span>
          </p>
        </div>
        <button
          onClick={onLogoutAction}
          className={logoutBtnClass}
        >
          LOGOUT
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round" strokeLinejoin="round"
              strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </button>
      </div>
    </div>
  )
}