'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'

import { LoginActionState, LoginSchema } from './login.types'

export async function loginAction(
  prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const rawData = Object.fromEntries(formData.entries())

  const validatedFields = LoginSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Please fill in all fields correctly.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/admin',
    })
    return { success: true, error: null }

  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: 'Invalid email or password.' }
    }
    throw error
  }
}