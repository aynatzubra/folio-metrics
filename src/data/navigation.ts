
export type NavLink = {
  href: string
  labelKey: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '#intro', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#adds', labelKey: 'nav.projects' },
]

export type ContactIcon = 'github' | 'telegram' | 'linkedin' | 'email'

export type ContactLink = {
  href: string
  labelKey: string
  icon: ContactIcon
}

export const HEADER_CONTACTS: readonly ContactLink[] = [
  {
    href: 'https://www.linkedin.com/in/tatiana-arbuz-7756743a6',
    labelKey: 'social.linkedin',
    icon: 'linkedin',
  },
  {
    href: 'https://t.me/tanya_arbuz',
    labelKey: 'social.telegram',
    icon: 'telegram',
  },
] as const

export const CONTACT_LINKS: readonly ContactLink[] = [
  ...HEADER_CONTACTS,
  {
    href: 'https://github.com/aynatzubra',
    labelKey: 'social.github',
    icon: 'github',
  },
  {
    href: 'mailto:work.arbuz@gmail.com',
    labelKey: 'social.sendMail',
    icon: 'email',
  },
] as const

