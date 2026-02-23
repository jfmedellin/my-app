# AGENTS.md - Agentic Coding Guidelines

This file provides guidelines and commands for agentic coding agents operating in this repository.

## Project Overview

- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Testing**: Playwright
- **Authentication**: NextAuth.js v5

---

## Commands

### Development

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build production application
npm run start        # Start production server
```

### Testing

```bash
npm run test                    # Run all Playwright tests
npm run test:headed             # Run tests with browser visible
npm run test:ui                 # Run tests with Playwright UI
npm run test:debug              # Run tests in debug mode
npm run test:install            # Install Playwright browsers
npm run test:report             # Show Playwright test report
```

#### Running a Single Test

```bash
# By test name (grep)
npx playwright test --grep "test-name"

# By file
npx playwright test tests/forms/basic-form.spec.ts

# By file and line
npx playwright test tests/forms/basic-form.spec.ts:44

# With reporter
npx playwright test --grep "ESC01" --reporter=list
```

### Linting & Type Checking

```bash
npm run lint         # Run ESLint
```

---

## Code Style Guidelines

### TypeScript

- **Strict mode enabled**: All TypeScript strict checks are on
- Use explicit types for function parameters and return values when not obvious
- Prefer `interface` over `type` for object shapes
- Use `unknown` instead of `any`, then narrow with type guards

### Imports

- Use path aliases: `@/*` maps to project root
- Order imports: external libraries → internal modules → relative imports
- Group imports with blank lines between groups

```typescript
// 1. React/Next imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. External libraries
import { z } from 'zod';
import { clsx } from 'clsx';

// 3. Internal imports
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

// 4. Relative imports
import { Header } from './header';
import { Footer } from '../components/footer';
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`, `LoginForm`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`, `useUserData`)
- **Utils/Constants**: camelCase (e.g., `formatDate`, `API_URL`)
- **Files**: kebab-case for non-component files (e.g., `api-handler.ts`)
- **Test files**: `.spec.ts` suffix (e.g., `login.spec.ts`)

### React Components

- Use functional components with arrow functions or `function` keyword consistently
- Define prop types using interfaces
- Extract reusable logic into custom hooks
- Keep components focused (single responsibility)

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant = 'primary', onClick, children }: ButtonProps) {
  return (
    <button className={variant} onClick={onClick}>
      {children}
    </button>
  );
}
```

### Error Handling

- Use try-catch for async operations with proper error typing
- Display user-friendly error messages
- Log errors for debugging (use console appropriately)
- Validate inputs with Zod schemas

```typescript
try {
  const data = await fetchUser(id);
  return data;
} catch (error) {
  if (error instanceof FetchError) {
    throw new UserError('Failed to fetch user', error);
  }
  throw error;
}
```

### Tailwind CSS

- Use utility classes directly in components
- Extract repeated class patterns into components or cn() utility
- Follow mobile-first responsive design
- Use semantic color tokens when available

### Testing (Playwright)

- Test files go in `tests/` directory
- Use descriptive test names with ID prefix (e.g., `ESC01: Happy Path`)
- Use `test.describe` to group related tests
- Use `page.locator()` for element selection over `page.$()`
- Always wait for elements to be visible/attached before interacting

```typescript
test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should login successfully', async ({ page }) => {
    await page.fill('#email', 'test@example.com');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Next.js Specific

- Use Server Components by default, add `'use client'` only when needed
- Place API routes in `app/api/` directory
- Use NextAuth.js for authentication
- Use next-intl for internationalization

### File Organization

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   └── [locale]/          # Localized routes
├── components/
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript type definitions
```

---

## Common Patterns

### Form Handling

- Use controlled components with useState
- Validate on submit and show inline errors
- Disable submit button while submitting

### Data Fetching

- Use React Server Components for initial data
- Use SWR/TanStack Query for client-side fetching
- Handle loading and error states

### Component Props

- Make props optional with defaults when sensible
- Use union types for limited options
- Document complex props with JSDoc when needed

---

## Notes for Agents

- Always verify tests pass before submitting changes
- Run `npm run lint` before committing
- Use type-safe approaches (avoid `as` assertions when possible)
- Keep components small and focused
- Write meaningful commit messages when asked to commit
