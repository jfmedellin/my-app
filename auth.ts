import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        // Mock authentication - accepts admin@example.com with password 1234
        if (credentials?.username === "admin@example.com" && credentials?.password === "1234") {
          console.log("Validation passed");
          return {
            id: "1",
            name: "Admin User",
            email: "admin@example.com"
          }
        }
        console.log("Validation failed!");
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
    signIn: "/en/auth", // Based on internationalized routing
  },
  trustHost: true, // Needed sometimes in dev mode
  debug: true,
})
