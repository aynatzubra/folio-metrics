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

/**
 * Do not log AbortError
 */
function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  )
}

/**
 * Every unknown error to string
 */
export function toErrorMessage(error: unknown): string {
  if (error instanceof AnalyticsError) return error.message
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : 'An unexpected error occurred'
}

/**
 * Lg error in dev
 */
export function logError(error: unknown, context?: string): void {
  const isDev = process.env.NODE_ENV === 'development'
  if(!isDev) return

  if (isAbortError(error)) return

  const message = toErrorMessage(error)
  if (isDev) {
    console.group(`Error [${context || 'General'}]`)
    console.error('Message:', message)
    console.error('Original Error:', error)
    console.trace('Stack Trace')
    console.groupEnd()
  } else {
    //todo: errors fo prod
  }
}