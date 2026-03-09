import { IMetricsRepository } from './repository.interface'

import type { VisitData } from '@/entities/analytics'

export class HttpMetricsRepository implements IMetricsRepository {
  private readonly endpoint = '/api/admin/analytics'

  async save(data: VisitData): Promise<void> {
    if (typeof window === 'undefined') return

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
    const success = navigator.sendBeacon(this.endpoint, blob)

    if (!success) {
      fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        keepalive: true,
      }).catch(console.error)
    }
  }

  async getAll(): Promise<VisitData[]> {
    const response = await fetch(this.endpoint)
    if (!response.ok) throw new Error('Failed to fetch analytics')
    return response.json()
  }
}