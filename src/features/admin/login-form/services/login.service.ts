import { signIn } from 'next-auth/react'

export async function loginService(email: string, password: string) {
  const result = await signIn('credentials', {
    redirect: false,
    email,
    password,
  })

  if (result?.error) {
    throw new Error('Incorrect email address or password.')
  }

  return result
}