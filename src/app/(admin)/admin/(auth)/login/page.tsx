import LoginForm from '@/app/(admin)/admin/(auth)/login/LoginForm'

const DEMO_EMAIL = process.env.SECRET_DEMO_USER ?? 'demo@example.com'
const DEMO_PASSWORD = process.env.SECRET_DEMO_PASSWORD ?? 'demo123'

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>
}

export default function LoginPage({ searchParams }: PageProps) {
  const demo = searchParams?.demo === '1'

  return (
    <LoginForm
      initialEmail={demo ? DEMO_EMAIL : ''}
      initialPassword={demo ? DEMO_PASSWORD : ''}
    />
  )
}
