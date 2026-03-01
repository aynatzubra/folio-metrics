'use client'
import type { VisitData } from '@/entities/analytics'

export interface IMetricsRepository {
  save(data: Omit<VisitData, 'visitorId'>): Promise<void>
  getAll(): Promise<VisitData[]>
}

export class LocalStorageRepository implements IMetricsRepository {
  private readonly STORAGE_KEY = 'folio_metrics_v1'

  private isClient = () => typeof window !== 'undefined'

  async save(data: VisitData): Promise<void> {
    if (!this.isClient()) return

    const history = await this.getAll()
    history.push(data)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(-1000)))
  }

  async getAll(): Promise<VisitData[]> {
    if (!this.isClient()) return []
    const raw = localStorage.getItem(this.STORAGE_KEY)
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw)
      return Array.isArray(parsed) ? (parsed as VisitData[]) : []
    } catch (e) {
      console.error('[Metrics Repo] Resetting corrupted storage', e)
      localStorage.removeItem(this.STORAGE_KEY)
      return []
    }
  }
}