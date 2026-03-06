import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

export class LocalStorageMetricsRepository implements IMetricsRepository {
  private readonly STORAGE_KEY = 'folio_metrics_demo'

  private isClient(): boolean {
    return typeof window !== 'undefined'
  }

  async save(data: VisitData): Promise<void> {
    if (!this.isClient()) return

    await navigator.locks.request('folio_metrics_lock', async () => {
      const history = await this.getAll()

      const isDuplicate = history.some(v =>
        v.timestamp === data.timestamp && v.sectionId === data.sectionId,
      )

      if (isDuplicate) return

      history.push(data)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(-1000)))
    })
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