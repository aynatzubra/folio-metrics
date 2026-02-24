import { HttpError } from '@/shared/api'

function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  )
}

export function toErrorMessage(error: unknown): string {
  if (error instanceof HttpError) return error.message
  if (error instanceof Error) return error.message
  return typeof error === 'string' ? error : 'An unexpected error occurred'
}

export function logError(error: unknown, context?: string): void {
  if (process.env.NODE_ENV !== 'development') {
    //TODO: integrate sentry or other log service for prod
  }

  if (isAbortError(error)) return

  const message = toErrorMessage(error)

  console.group(`Error [${context || 'General'}]`)
  console.error('Message:', message)
  console.error('Original Error:', error)
  console.trace('Stack Trace')
  console.groupEnd()
}