import type { VisitData } from '@/entities/analytics'

export interface IMetricsRepository {
  save(data: VisitData): Promise<void>
  getAll(): Promise<VisitData[]>
}