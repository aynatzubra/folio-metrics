import { PrismaClient } from '@prisma/client'

import { HAS_DATABASE_URL, IS_DEMO_MODE } from '@/shared/lib/utils'

export const SHOULD_USE_PRISMA = !IS_DEMO_MODE && HAS_DATABASE_URL

//todo: global.d.ts
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient | null }

// Prisma is optional in demo mode.
// When disabled we return null and repositories handle fallback logic.
export const prisma: PrismaClient | null = (() => {
  if (!SHOULD_USE_PRISMA) {
    if (process.env.NODE_ENV === 'development') {
      console.info(
        '[Prisma] Disabled because DEMO_MODE=true or DATABASE_URL is missing',
      )
    }
    return null
  }

  const client =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
    })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client

  return client
})()