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
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error

  if (error && typeof error === 'object') {
    const obj = error as Record<string, unknown>
    if (typeof obj.message === 'string') return obj.message
    if (typeof obj.detail === 'string') return obj.detail
  }

  return 'An unexpected error occurred'
}

/**
 * Lg error in dev
 */
export function logError(error: unknown, context?: string): void {
  const isDev = process.env.NODE_ENV === 'development'
  if(!isDev) return

  if (isAbortError(error)) return

  if (isDev) {
    console.group(`Error [${context || 'General'}]`)
    console.error('Original Error:', error)
    console.trace('Stack Trace')
    console.groupEnd()
  } else {
    //todo: errors fo prod
  }
}