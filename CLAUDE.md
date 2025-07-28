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

## Development Workflow - THIS IS ALWAYS RELEVENT THROUGHOUT THIS PROJECT

### Hot Module Replacement (HMR)
- The dev server (`npm run dev`) supports HMR - NO need to restart for code changes
  - Exception: Changes to `vite.config.ts`, `wrangler.jsonc`, or `tsconfig` files may require restart
- Console.logs in worker code (`workers/app.ts`) appear in terminal, not browser console

### Adding New Routes
- Create route components in `app/routes/` directory
- Register new routes in `app/routes.ts` (this is required - routes are not automatically discovered)
- The dev server will hot-reload routes automatically after registration

### Understanding Testing Dimensions
- Testing serves different purposes and answers different questions:
  - Code correctness (typecheck, lint): "Does this compile and follow standards?"  
  - User experience (Playwright, manual testing): "Does this work as intended for someone using it?"
  - Logic verification (unit tests): "Do the functions/calculations produce expected results?"
- Choose testing approach based on what you built:
  - Interactive components benefit from seeing the actual user flow
  - Data transformations benefit from logic verification  
  - Complex integrations benefit from end-to-end testing
- When implementing interactive features, include testing in your todo list and before marking complete ask: "Does this work from the user's perspective?" Verify the user flow with Playwright
- Vitest is configured with React Testing Library for unit testing
- Run tests with `npm run test:run`

### Interactive Debugging with Playwright
- Playwright MCP is available for visual debugging and UI verification
- To test with Playwright, start dev server in background: `npm run dev &`
- Ensure dev server is running before using Playwright tools

### SSR Considerations
- Code runs in both server (Workers) and client contexts
- Use conditional checks for browser-only APIs: `if (typeof window !== 'undefined')`
- Workers runtime supports many Node.js APIs but check compatibility for specific APIs
- Server-side data loading happens in route loaders (see React Router docs)