export type ContactIcon = 'github' | 'telegram' | 'linkedin' | 'email'

export type ContactLink = {
  href: string
  labelKey: string
  icon: ContactIcon
}