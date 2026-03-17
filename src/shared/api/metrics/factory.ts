

// runtime: Node.js
import { PrismaMetricsRepository } from '@/shared/api/metrics/prisma.repository'
import { NoopMetricsRepository } from '@/shared/api/metrics/noop.repository'
import { HttpMetricsRepository } from '@/shared/api/metrics/http.repository'
import { LocalStorageMetricsRepository } from '@/shared/api/metrics/local-storage.repository'

export function createServerMetricsRepository() {
  const mode = process.env.ANALYTICS_MODE || 'demo'

  return mode === 'prod'
    ? new PrismaMetricsRepository()
    : new NoopMetricsRepository()
}

// runtime: Browser
export function createClientMetricsRepository() {
  const mode = process.env.NEXT_PUBLIC_ANALYTICS_MODE || 'demo'

  return mode === 'prod'
    ? new HttpMetricsRepository()
    : new LocalStorageMetricsRepository()
}