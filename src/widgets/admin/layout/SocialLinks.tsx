import { HEADER_CONTACTS } from '@/data/navigation'
import { CONTACT_ICONS } from '@/shared/ui/ContactIcons'

interface SocialLinksProps {
  variant?: 'icons' | 'buttons'
  className?: string
}

const SocialOutlineBtnClass =
  'px-4 py-2 border-2 border-accent/40 rounded-md ' +
  'text-sm font-medium text-white ' +
  'hover:bg-accent hover:text-white ' +
  'transition-all active:scale-95'

export const SocialLinks = ({ variant = 'icons', className }: SocialLinksProps) => {
  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {HEADER_CONTACTS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer noopener"
            className={SocialOutlineBtnClass}
          >
            <span className="flex items-center gap-2">
              {CONTACT_ICONS[link.icon]}
              {link.icon.charAt(0).toUpperCase() + link.icon.slice(1)}
            </span>
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {HEADER_CONTACTS.map((link) => (
        <a
          key={link.href} href={link.href}
          target="_blank" rel="noreferrer"
          className="text-accent hover:text-[#F67769] transition-colors">
          {CONTACT_ICONS[link.icon]}
        </a>
      ))}
    </div>
  )
}