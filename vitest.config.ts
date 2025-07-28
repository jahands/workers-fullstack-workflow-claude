import { defineConfig } from 'vitest/config';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './app/test/setup.ts',
    include: ['app/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', 'workers/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', 'build', '.react-router'],
  },
  resolve: {
    alias: {
      '~/': new URL('./app/', import.meta.url).pathname,
    },
  },
});