export type NavLink = {
  href: string
  labelKey: string
}

export const NAV_LINKS: NavLink[] = [
  { href: '#intro', labelKey: 'nav.about' },
  { href: '#skills', labelKey: 'nav.skills' },
  { href: '#experience', labelKey: 'nav.experience' },
  { href: '#adds', labelKey: 'nav.projects' },
  { href: '#contact', labelKey: 'nav.contact' },
]

export type ContactLink = {
  href: string
  labelKey: string
}

export const CONTACT_LINKS: ContactLink[] = [
  { href: 'https://github.com/aynatzubra', labelKey: 'social.github' },
  { href: 'https://t.me/tanya_arbuz', labelKey: 'social.telegram' },
  { href: 'https://www.linkedin.com/in/tanya-arbuz', labelKey: 'social.linkedin' },
  { href: 'mailto:work.arbuz@gmail.com', labelKey: 'social.sendMail' },
]
