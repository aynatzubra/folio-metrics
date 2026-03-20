import Link from 'next/link'

export const Logo = ({ className = '' }) => (
  <Link
    href="/" aria-label="Go to homepage"
    className={`group flex items-center hover:opacity-70 ${className}`}>
    <span className="header-title text-xl font-bold text-white">
      arbuz
    </span>
  </Link>
)