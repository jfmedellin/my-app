# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-01

### Added
- **Unit Testing**: Added Vitest for unit tests with coverage reports
  - Test files in `tests/unit/` directory
  - Run with `npm run test` or `npm run test:coverage`
- **Code Formatting**: Added Prettier integration
  - Configuration in `.prettierrc`
  - Run with `npm run format` or `npm run format:check`
- **Pre-commit Hooks**: Added Lefthook for automatic lint/format on commit
  - Runs ESLint and Prettier on staged files before commit
- **GitHub Actions CI**: Enhanced CI pipeline
  - Unit tests with coverage (`npm run test:coverage`)
  - Codecov integration for coverage reports
  - Lint → Unit Tests → Build → E2E Tests pipeline

### Changed
- **Next.js 16**: Renamed `middleware.ts` to `proxy.ts` (new convention)
- **Package.json**: Updated to use ES Modules (`"type": "module"`)
- **Zod v4**: Updated validation to use `.issues` instead of `.errors`

### Fixed
- Build error: Zod validation in `lib/actions/auth.ts` was using deprecated `.errors` property

### Dependencies Added
- `vitest` - Unit testing framework
- `@vitejs/plugin-react` - React plugin for Vitest
- `jsdom` - DOM environment for testing
- `@testing-library/react` - React testing utilities
- `@testing-library/dom` - DOM testing utilities
- `@testing-library/user-event` - User event simulation
- `@vitest/coverage-v8` - Coverage provider
- `prettier` - Code formatter
- `lefthook` - Git hooks manager

---

## Previous Versions

For earlier versions, please refer to the git history.

[Unreleased]: https://github.com/your-repo/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-repo/releases/tag/v1.0.0
