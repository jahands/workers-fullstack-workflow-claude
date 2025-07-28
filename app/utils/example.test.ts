import { describe, it, expect } from 'vitest';
import { formatGreeting } from './example';

describe('formatGreeting', () => {
  it('formats morning greeting correctly', () => {
    expect(formatGreeting('Alice', 'morning')).toBe('Good morning, Alice!');
  });

  it('formats afternoon greeting correctly', () => {
    expect(formatGreeting('Bob', 'afternoon')).toBe('Good afternoon, Bob!');
  });

  it('formats evening greeting correctly', () => {
    expect(formatGreeting('Charlie', 'evening')).toBe('Good evening, Charlie!');
  });

  it('defaults to morning greeting when time is not specified', () => {
    expect(formatGreeting('David')).toBe('Good morning, David!');
  });

  it('throws error for empty name', () => {
    expect(() => formatGreeting('')).toThrow('Name cannot be empty');
    expect(() => formatGreeting('   ')).toThrow('Name cannot be empty');
  });
});