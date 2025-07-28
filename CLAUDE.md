# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack React application built with React Router v7 and designed to run on Cloudflare Workers. The architecture follows a modern SSR pattern with:

- **Frontend**: React 19 with React Router v7 for routing and SSR
- **Backend**: Cloudflare Workers runtime (`workers/app.ts`)
- **Styling**: TailwindCSS v4 with Vite plugin
- **Build**: Vite with React Router dev plugin and Cloudflare plugin
- **TypeScript**: Full TypeScript support with multiple tsconfig files

## Key Architecture

- `app/` - React Router application code (routes, components, styles)
- `workers/app.ts` - Cloudflare Worker entry point that handles SSR requests
- `vite.config.ts` - Vite configuration with Cloudflare, TailwindCSS, and React Router plugins
- `wrangler.jsonc` - Cloudflare Workers configuration
- `react-router.config.ts` - React Router configuration with SSR enabled

The application uses React Router's file-based routing system with routes defined in `app/routes/`.

## Essential Commands

### Development
```bash
npm run dev          # Start development server with HMR at localhost:5173
npm run preview      # Preview production build locally
```

### Building & Type Checking
```bash
npm run build        # Create production build using react-router build
npm run typecheck    # Run full type checking (includes Cloudflare types generation)
npm run cf-typegen   # Generate Cloudflare Worker types from wrangler.jsonc
```

### Deployment
```bash
npm run deploy       # Build and deploy to Cloudflare Workers
npx wrangler versions upload    # Deploy preview version
npx wrangler versions deploy    # Promote version to production
```

## Development Notes

- TypeScript types are automatically generated for Cloudflare Workers via `wrangler types`
- The app uses React Router's new data loading patterns and type-safe route modules
- Cloudflare environment variables and bindings are configured in `wrangler.jsonc`
- The Worker runtime provides access to Cloudflare's platform features through the `env` context

## Development Workflow

### Hot Module Replacement (HMR)
- The dev server (`npm run dev`) supports HMR - NO need to restart for code changes
- Exception: Changes to `vite.config.ts`, `wrangler.jsonc`, or `tsconfig` files require restart
- Console.logs in worker code (`workers/app.ts`) appear in terminal, not browser console

### Testing Strategy
- Vitest is configured with React Testing Library for unit/integration tests
- Test scripts:
  - `npm test` - Run tests in watch mode
  - `npm run test:run` - Run tests once (CI mode)
  - `npm run test:ui` - Open Vitest UI for interactive testing
- Test file conventions: `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- Example tests included for components (`app/welcome/welcome.test.tsx`) and utilities (`app/utils/example.test.ts`, `workers/utils/headers.test.ts`)
- Add tests for: complex business logic, data transformations, API handlers, user interactions
- Mock external dependencies like SVG imports when needed (see examples)

### Interactive Debugging with Playwright
The project includes Playwright MCP for visual debugging. Use it for:
- Verifying UI state after complex changes
- Testing form submissions and user interactions
- Checking responsive design and layout issues

Basic Playwright workflow:
```bash
# Terminal 1: Keep dev server running
npm run dev

# In Claude: Use Playwright to navigate and inspect
mcp__playwright__browser_navigate to http://localhost:5173
mcp__playwright__browser_snapshot to see current page state
```

### Verification Checklist
After making changes:
1. Check terminal for HMR compilation errors
2. Run `npm run typecheck` after significant type changes
3. Run `npm run test:run` to ensure tests pass
4. For UI changes: Use Playwright snapshot to verify visual state
5. For API changes: Test full request flow with Playwright

### SSR Considerations
- Code runs in both server (Workers) and client contexts
- Use conditional checks for browser-only APIs: `if (typeof window !== 'undefined')`
- Workers runtime supports many Node.js APIs but check compatibility for specific APIs
- Server-side data loading happens in route loaders (see React Router docs)