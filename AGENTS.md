# AGENTS.md - Agentic Coding Guidelines

This file provides guidelines and commands for agentic coding agents operating in this repository.

## Project Overview

- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Authentication**: NextAuth.js v5
- **Linting**: ESLint + Prettier
- **Pre-commit hooks**: Lefthook

---

## Commands

### Development

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build production application
npm run start        # Start production server
```

### Testing

#### Unit Tests (Vitest)

```bash
npm run test              # Run all unit tests
npm run test:watch        # Run tests in watch mode (auto-reload)
npm run test:coverage     # Run tests with coverage report
```

#### Running a Single Unit Test

```bash
# Run specific test file
npx vitest run tests/unit/utils/cn.test.ts

# Run tests matching pattern
npx vitest run --grep "loginSchema"

# Run in watch mode
npx vitest tests/unit/actions/auth.test.ts
```

#### E2E Tests (Playwright)

```bash
npm run test:e2e         # Run all Playwright tests
npm run test:e2e:ui      # Run tests with Playwright UI
npm run test:report      # Show Playwright test report
```

#### Running a Single E2E Test

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

### Linting & Formatting

```bash
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint with auto-fix
npm run format          # Format all files with Prettier
npm run format:check    # Check formatting without changes
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

### Formatting (Prettier)

Prettier is configured in `.prettierrc`. Key rules:
- Single quotes for strings
- Semicolons at end of statements
- 2 space indentation
- 100 character line width
- Trailing commas in ES5 contexts

Run `npm run format` before committing to auto-format code.

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile`, `LoginForm`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth`, `useUserData`)
- **Utils/Constants**: camelCase (e.g., `formatDate`, `API_URL`)
- **Files**: kebab-case for non-component files (e.g., `api-handler.ts`)
- **Test files**: `.test.ts` for unit tests, `.spec.ts` for E2E tests

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

---

## Testing Guidelines

### Unit Tests (Vitest)

- Test files go in `tests/unit/` directory
- Use descriptive test names
- Test pure functions, utilities, and validation schemas
- Aim for 100% coverage on utilities

```typescript
import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });
});
```

### E2E Tests (Playwright)

- Test files go in `tests/` directory (not `tests/unit/`)
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

---

## Next.js Specific

- Use Server Components by default, add `'use client'` only when needed
- Place API routes in `app/api/` directory
- Use NextAuth.js for authentication
- Use next-intl for internationalization
- Middleware is now called "proxy" in Next.js 16 - use `proxy.ts`

---

## Pre-commit Hooks

Lefthook is configured to run before each commit:
- ESLint on staged `.ts`/`.tsx` files
- Prettier on staged files

To bypass hooks (not recommended): `git commit --no-verify`

---

## File Organization

```
my-app/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   └── [locale]/          # Localized routes
├── components/
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Layout components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities, actions, Supabase client
├── tests/
│   ├── unit/             # Vitest unit tests
│   │   ├── utils/
│   │   └── actions/
│   └── *.spec.ts         # Playwright E2E tests
├── proxy.ts               # Next.js middleware (formerly middleware.ts)
├── vite.config.ts         # Vitest configuration
└── .prettierrc           # Prettier configuration
```

---

## Notes for Agents

- Always verify tests pass before submitting changes: `npm run test`
- Run `npm run lint:fix` and `npm run format` before committing
- Use type-safe approaches (avoid `as` assertions when possible)
- Keep components small and focused
- Write meaningful commit messages when asked to commit
- Run `npm run build` to verify production build works
- Zod v4 uses `.issues` instead of `.errors` for validation errors
