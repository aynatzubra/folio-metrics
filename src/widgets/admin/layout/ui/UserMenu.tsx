'use client'

import { Fragment } from 'react'
import { Menu, MenuItem, Transition, MenuItems, MenuButton } from '@headlessui/react'
import { Tooltip } from 'react-tooltip'
import Image, { StaticImageData } from 'next/image'

interface UserMenuProps {
  avatar: StaticImageData | string
  onLogout: () => void
  isLoading: boolean
}

const menuButton =
  'flex items-center justify-center p-1 rounded-full ' +
  'bg-brand ring-2 ring-accent ' +
  'transition hover:ring-[#F67769] ' +
  'focus:outline-none'

export const UserMenu = ({ avatar, onLogout }: UserMenuProps) => {
  return (
    <div className="relative">
      <Menu as="div">
        <MenuButton
          data-tooltip-id="avatar-tooltip"
          className={menuButton}
          aria-label="User menu"
        >
          <Image
            src={avatar}
            alt="User"
            width={35}
            height={35}
            className="rounded-full"
            priority
          />
        </MenuButton>

        <Tooltip
          id="avatar-tooltip" place="bottom"
          content="Settings" />

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className="absolute right-0 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                <span className="block px-4 py-2 text-sm text-gray-500 cursor-not-allowed">Profile</span>
              </MenuItem>
              <div className="border-t border-gray-200 my-1" />
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={onLogout}
                    className={`${active ? 'bg-red-100 text-red-600' : 'text-red-500'} block w-full px-4 py-2 text-sm text-left`}
                  >
                    Logout
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}