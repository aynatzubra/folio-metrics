import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const DEMO_EMAIL = process.env.SECRET_DEMO_USER ?? 'demo@example.com'
const DEMO_PASSWORD = process.env.SECRET_DEMO_PASSWORD ?? 'demo123'
const DEMO_USER_ID = process.env.DEMO_USER_ID ?? 'demo'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = (credentials ?? {}) as Record<string, string>

        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          return { id: DEMO_USER_ID, email: DEMO_EMAIL, name: 'Demo' }
        }
        return null
      },
    }),
  ],

  callbacks: {
    //callback for token extension
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
})
