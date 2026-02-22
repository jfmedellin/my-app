---
name: ui-ux-pro-max
description: "UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 9 stacks (React, Next.js, Vue, Svelte, SwiftUI, React Native, Flutter, Tailwind, shadcn/ui). Actions: plan, build, create, design, implement, review, fix, improve, optimize, enhance, refactor, check UI/UX code. Projects: website, landing page, dashboard, admin panel, e-commerce, SaaS, portfolio, blog, mobile app, .html, .tsx, .vue, .svelte. Elements: button, modal, navbar, sidebar, card, table, form, chart. Styles: glassmorphism, claymorphism, minimalism, brutalism, neumorphism, bento grid, dark mode, responsive, skeuomorphism, flat design. Topics: color palette, accessibility, animation, layout, typography, font pairing, spacing, hover, shadow, gradient. Integrations: shadcn/ui MCP for component search and examples."
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 9 technology stacks.

## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choosing color palettes and typography
- Reviewing code for UX issues
- Building landing pages or dashboards
- Implementing accessibility requirements

## Quick Reference

### 1. Accessibility (CRITICAL)
- `color-contrast` - Minimum 4.5:1 ratio for normal text
- `focus-states` - Visible focus rings on interactive elements
- `alt-text` - Descriptive alt text for meaningful images
- `aria-labels` - aria-label for icon-only buttons
- `keyboard-nav` - Tab order matches visual order
- `form-labels` - Use label with for attribute

### 2. Touch & Interaction (CRITICAL)
- `touch-target-size` - Minimum 44x44px touch targets
- `hover-vs-tap` - Use click/tap for primary interactions
- `loading-buttons` - Disable button during async operations
- `error-feedback` - Clear error messages near problem
- `cursor-pointer` - Add cursor-pointer to clickable elements

### 3. Performance (HIGH)
- `image-optimization` - Use WebP, srcset, lazy loading
- `reduced-motion` - Check prefers-reduced-motion
- `content-jumping` - Reserve space for async content

### 4. Layout & Responsive (HIGH)
- `viewport-meta` - width=device-width initial-scale=1
- `readable-font-size` - Minimum 16px body text on mobile
- `horizontal-scroll` - Ensure content fits viewport width
- `z-index-management` - Define z-index scale (10, 20, 30, 50)

### 5. Typography & Color (MEDIUM)
- `line-height` - Use 1.5-1.75 for body text
- `line-length` - Limit to 65-75 characters per line
- `font-pairing` - Match heading/body font personalities

## Tech Stack (This Project)
- **Framework:** Next.js 16 + Tailwind CSS v4
- **Components:** shadcn/ui
- **Icons:** Lucide React

## Common Rules for Professional UI

### Icons & Visual Elements
- No emoji icons - Use SVG icons (Lucide)
- Consistent icon sizing - Use fixed w-6 h-6
- Stable hover states - Use color/opacity transitions

### Interaction
- Add `cursor-pointer` to all clickable elements
- Use `transition-colors duration-200` for smooth transitions
- Provide visual feedback on hover (color, shadow, border)

### Light/Dark Mode
- Light mode: Use `bg-white/80` or higher opacity for glass effects
- Text contrast: Use slate-900 (#0F172A) for text
- Muted text: Use slate-600 (#475569) minimum
- Borders: Use `border-gray-200` in light mode

## Pre-Delivery Checklist

- [ ] No emojis used as icons
- [ ] All clickable elements have `cursor-pointer`
- [ ] Light mode text has sufficient contrast (4.5:1)
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] All images have alt text
- [ ] Form inputs have labels
