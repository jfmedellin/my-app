---
name: nextauth-auth
description: "NextAuth.js v5 authentication skill for Next.js 16. Actions: implement, configure, secure, test auth flows. Features: session management, credentials provider, OAuth providers, middleware protection, role-based access. Testing: login/logout flows, protected routes, session persistence, error handling."
---

# NextAuth.js v5 Authentication Skill

Authentication implementation guide for Next.js 16 applications using NextAuth.js v5 (Auth.js).

## When to Apply

- Implementing login/logout functionality
- Setting up protected routes
- Configuring authentication providers
- Testing authentication flows
- Managing user sessions

## Tech Stack (This Project)
- **Next.js:** 16.1.6
- **NextAuth:** v5 (beta.30)
- **Provider:** Credentials

## Core Configuration

### 1. Auth Config Location
```
src/
├── auth/
│   ├── auth.config.ts    # Auth options
│   ├── auth.ts           # Auth instance
│   └── routes.ts         # Public/protected routes
├── middleware.ts         # Route protection
└── app/
    └── api/auth/[...nextauth]/
        └── route.ts      # Auth API route
```

### 2. Credentials Provider Pattern
```typescript
Credentials({
  name: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" }
  },
  async authorize(credentials) {
    // Validate credentials
    // Return user object or null
  }
})
```

### 3. Session Access
```typescript
// Server Component
import { auth } from "@/auth/auth"
const session = await auth()

// Client Component
import { useSession } from "next-auth/react"
const { data: session } = useSession()
```

### 4. Protected Routes (Middleware)
```typescript
export { auth as middleware } from "@/auth/auth"

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
}
```

## Testing Authentication

### Login Flow Tests
- Successful login with valid credentials
- Failed login with invalid credentials
- Error message display
- Session persistence after login
- Redirect after successful login

### Protected Route Tests
- Redirect unauthenticated users to login
- Allow authenticated users access
- Session persistence across page reloads

### Logout Flow Tests
- Clear session on logout
- Redirect to home/login page
- Prevent access to protected routes after logout

## Demo Credentials
- **Email:** admin@example.com
- **Password:** 1234

## Security Best Practices

1. **Never expose passwords** in logs or responses
2. **Use HTTPS** in production
3. **Implement rate limiting** for login attempts
4. **Validate input** on both client and server
5. **Use secure cookies** in production
6. **Implement CSRF protection** (built-in with NextAuth)

## Common Patterns

### Sign In Button
```typescript
import { signIn } from "next-auth/react"

<button onClick={() => signIn("credentials", { 
  email, 
  password,
  redirect: true,
  callbackUrl: "/dashboard"
})}>
  Sign In
</button>
```

### Sign Out Button
```typescript
import { signOut } from "next-auth/react"

<button onClick={() => signOut({ callbackUrl: "/" })}>
  Sign Out
</button>
```

### Protected Server Component
```typescript
import { auth } from "@/auth/auth"
import { redirect } from "next/navigation"

export default async function ProtectedPage() {
  const session = await auth()
  if (!session) redirect("/login")
  
  return <div>Protected Content</div>
}
```

## Data Test IDs for Testing

Use consistent data-testid attributes:
- `login-email-input` - Email input field
- `login-password-input` - Password input field
- `login-submit-button` - Submit button
- `login-error-message` - Error message container
- `login-success-modal` - Success modal
