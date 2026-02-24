import { CONTACT_ICONS } from '@/shared/ui'

type SocialLink = {
  href: string
  label: string
  icon: string
}

interface Props {
  links: SocialLink[]
  className?: string
  itemClass?: string
}

export function SocialLinksList({ links, className = '', itemClass = '' }: Props) {
  return (
    <div className={className}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer noopener"
          className={itemClass}
          aria-label={link.label}
        >
          {CONTACT_ICONS[link.icon]}
        </a>
      ))}
    </div>
  )
}