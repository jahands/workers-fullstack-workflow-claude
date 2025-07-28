import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock window.matchMedia for tests that might use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock SVG imports
vi.mock('*.svg', () => ({
  default: 'test-file-stub',
}));