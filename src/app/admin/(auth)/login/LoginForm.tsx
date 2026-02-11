'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

type LoginFormProps = {
  initialEmail?: string
  initialPassword?: string
  message?: string
  demoEnabled?: boolean
}

export default function LoginForm({
                                    initialEmail = '',
                                    initialPassword = '',
                                    message,
                                    demoEnabled = false,
                                  }: LoginFormProps) {
  const router = useRouter()
  const [email, setEmail] = useState(initialEmail)
  const [password, setPassword] = useState(initialPassword)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Incorrect email address or password.')
        setIsLoading(false)
        return
      }

      router.push('/admin')
    } catch {
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  const inputClass =
    'block w-full px-4 py-4 rounded-md border border-gray-300 ' +
    'text-gray-900 placeholder-gray-400 ' +
    'focus:border-[#F67769] focus:ring-2 focus:ring-[#F67769] focus:outline-none'

  const buttonClass =
    'mx-auto block px-15 py-3 rounded-[4px] ' +
    'text-white font-semibold w-[230px]  ' +
    'bg-accent hover:bg-opacity-90 ' +
    'focus:outline-none focus:ring-2 focus:ring-[#F67769] focus:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:bg-gray-400'


  return (
    <main className="h-screen w-screen bg-brand flex items-center justify-center p-4">
      <div className="relative w-full max-w-[450px] bg-white rounded-[4px] shadow-lg p-6">
        <h1 className="text-2xl font-[Inter] font-bold text-center mb-10 text-brand">
          Admin Panel Login
        </h1>
        {
          message && (
            <p className="mb-4 rounded-md bg-orange-50 px-3 py-2 text-sm text-orange-800">
              {message}
            </p>
          )
        }
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="demo@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={buttonClass}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
