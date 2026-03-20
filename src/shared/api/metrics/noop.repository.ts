import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

/**
 * IMetricsRepository implementation that does nothing.
 * Used on the server / SSR to avoid touching browser-only APIs.
 */

export class NoopMetricsRepository implements IMetricsRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async save(_data: VisitData): Promise<void> { }

  async getAll(): Promise<VisitData[]> {
    // server-empty arr
    return Promise.resolve([])
  }
}