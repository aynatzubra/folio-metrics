export const IS_DEMO_MODE =
  process.env.DEMO_MODE === 'true' ||
  process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export const HAS_DATABASE_URL = Boolean(process.env.DATABASE_URL)