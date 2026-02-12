'use client'

import { useEffect } from 'react'

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Admin Dashboard Error:', error)
  }, [error])

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-brand rounded-[4px] border border-red-100">
      <h2 className="text-xl font-bold text-red-800">Something went wrong!</h2>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-accent text-white rounded-[4px] hover:bg-accent/70 transition"
      >
        Try again
      </button>
    </div>
  )
}