'use client'

import { useActionState, useEffect, useState } from 'react'
import clsx from 'clsx'

import { loginAction } from '@/features/admin/login-form'

import { LoginActionState, LoginFormProps } from './../model/login.types'

const baseInputClass =
  'block w-full px-4 py-4 rounded-md border border-gray-300 ' +
  'text-gray-900 placeholder-gray-400 ' +
  'focus:border-[#F67769] focus:ring-2 focus:ring-[#F67769] focus:outline-none'

const buttonClass =
  'mx-auto block px-15 py-3 rounded-[4px] ' +
  'text-white font-semibold w-[230px]  ' +
  'bg-accent hover:bg-opacity-90 ' +
  'focus:outline-none focus:ring-2 focus:ring-[#F67769] focus:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:bg-gray-400'

export function LoginForm({
                            initialEmail,
                            initialPassword,
                            message,
                          }: LoginFormProps) {

  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  } as LoginActionState)

  const [localErrors, setLocalErrors] = useState(state.errors)

  useEffect(() => {
    setLocalErrors(state.errors)
  }, [state.errors])

  const handleInput = (fieldName: keyof NonNullable<LoginActionState['errors']>) => {
    if (localErrors?.[fieldName]) {
      setLocalErrors(prev => ({ ...prev, [fieldName]: undefined }))
    }
  }

  return (
    <main className="h-screen w-screen bg-brand flex items-center justify-center p-4">
      <div className="relative w-full max-w-[450px] bg-white rounded-[4px] shadow-lg p-6">
        <h1 className="text-2xl font-[Inter] font-bold text-center mb-10 text-brand">
          Admin Panel Login
        </h1>

        <form action={formAction} className="space-y-5">

          {(state.error || message) && (
            <div className="p-3 text-sm text-center text-red-600 bg-red-50 border border-red-100 rounded">
              {state.error || message}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={initialEmail} // Только начальное значение
              onInput={() => handleInput('email')}
              className={clsx(baseInputClass, localErrors?.email && 'border-red-500')}
              placeholder="Email address"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              defaultValue={initialPassword}
              onInput={() => handleInput('password')}
              className={clsx(baseInputClass, localErrors?.password && 'border-red-500')}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={buttonClass}
          >
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
