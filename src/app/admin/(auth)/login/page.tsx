import { LoginForm } from '@/features/admin/login-form'

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function getQueryString(
  value: string | string[] | undefined,
): string | undefined {
  return typeof value === 'string' ? value : undefined
}

export default async function LoginPage({ searchParams }: PageProps) {
  const searchPar = await searchParams
  const reason = getQueryString(searchPar?.reason)

  const message =
    reason === 'auth' ? 'Please sign in to access the admin panel.' : undefined

  const demo = getQueryString(searchPar?.demo) === '1'

  const demoEmail = process.env.SECRET_DEMO_USER
  const demoPassword = process.env.SECRET_DEMO_PASSWORD
  const demoEnabled = Boolean(demoEmail && demoPassword)

  return (
    <LoginForm
      initialEmail={demo && demoEnabled ? demoEmail : ''}
      initialPassword={demo && demoEnabled ? demoPassword : ''}
      message={message}
    />
  )
}
