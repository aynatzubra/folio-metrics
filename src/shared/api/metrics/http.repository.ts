import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

export class HttpMetricsRepository implements IMetricsRepository {
  async save(_data: VisitData): Promise<void> {
    return Promise.resolve()
  }

  async getAll(): Promise<VisitData[]> {
    return []
  }
}