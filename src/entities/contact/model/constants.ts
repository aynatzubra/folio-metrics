import { ContactLink } from '@/entities/contact'

export const SOCIAL_LINKS: readonly ContactLink[] = [
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

export const PRIMARY_CONTACTS: readonly ContactLink[] = [
  ...SOCIAL_LINKS,
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