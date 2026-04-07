import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const testUsername = process.env.AUTH_TEST_USERNAME || "qa_tester"
const testPassword = process.env.AUTH_TEST_PASSWORD || "password123"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validación para testing - usa variables de entorno
        if (credentials?.username === testUsername && credentials?.password === testPassword) {
          return {
            id: "1",
            name: "QA Tester",
            email: credentials.username
          }
        }

        // TODO: Implementar validación real con Supabase en producción
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: "/en/auth",
  },
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
})
