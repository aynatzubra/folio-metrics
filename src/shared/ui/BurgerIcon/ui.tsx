import { SVGProps } from 'react'

interface BurgerIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const BurgerIcon = ({ size = 24, className, ...props }: BurgerIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    width={size}
    height={size}
    className={className}
    {...props}
  >
    <path
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      strokeLinecap="round"
    />
  </svg>
)