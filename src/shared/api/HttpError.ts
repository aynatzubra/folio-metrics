export class AnalyticsError extends Error {
  constructor(
    message: string,
    public status?: number,
    public detail?: string,
  ) {
    super(message)
    this.name = 'AnalyticsError'
  }
}