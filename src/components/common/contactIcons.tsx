import { ReactNode } from 'react'

export const CONTACT_ICONS: Record<string, ReactNode> = {
  telegram: (
    <svg
      viewBox="0 0 24 24" className="h-7 w-7"
      aria-hidden="true">
      <path
        fill="currentColor"
        d="M9.04 15.56 8.7 20.3c.49 0 .7-.21.95-.46l2.28-2.17 4.73 3.46c.87.48 1.49.23 1.71-.81l3.1-14.54v0c.26-1.23-.44-1.71-1.29-1.4L1.6 9.84c-1.2.47-1.18 1.14-.22 1.44l4.72 1.47L17.3 5.9c.53-.35 1.01-.16.61.19L9.04 15.56z"
      />
    </svg>
  ),
  linkedin: (
    <svg
      viewBox="0 0 24 24" className="h-7 w-7"
      aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
      />
    </svg>
  ),
}
