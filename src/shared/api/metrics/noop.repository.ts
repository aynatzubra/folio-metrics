import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

/**
 * IMetricsRepository implementation that does nothing.
 * Used on the server / SSR to avoid touching browser-only APIs.
 */

export class NoopMetricsRepository implements IMetricsRepository {
  async save(_data: VisitData): Promise<void> {
    // dont save anything on the server
    return Promise.resolve()
  }

  async getAll(): Promise<VisitData[]> {
    // server-empty arr
    return Promise.resolve([])
  }
}