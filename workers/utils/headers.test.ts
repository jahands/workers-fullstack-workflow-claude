import { describe, it, expect } from 'vitest';
import { parseAuthHeader, getCorsHeaders } from './headers';

describe('parseAuthHeader', () => {
  it('parses valid Bearer token', () => {
    const result = parseAuthHeader('Bearer abc123xyz');
    expect(result).toEqual({
      type: 'Bearer',
      credentials: 'abc123xyz'
    });
  });

  it('parses valid Basic auth', () => {
    const result = parseAuthHeader('Basic dXNlcjpwYXNz');
    expect(result).toEqual({
      type: 'Basic',
      credentials: 'dXNlcjpwYXNz'
    });
  });

  it('returns null for empty header', () => {
    expect(parseAuthHeader(null)).toBeNull();
    expect(parseAuthHeader('')).toBeNull();
  });

  it('returns null for invalid format', () => {
    expect(parseAuthHeader('InvalidFormat')).toBeNull();
    expect(parseAuthHeader('Bearer')).toBeNull();
    expect(parseAuthHeader('Bearer token extra')).toBeNull();
  });
});

describe('getCorsHeaders', () => {
  it('returns headers for allowed localhost origin', () => {
    const headers = getCorsHeaders('http://localhost:5173');
    expect(headers).toEqual({
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
  });

  it('returns headers for allowed production origin', () => {
    const headers = getCorsHeaders('https://example.com');
    expect(headers).toEqual({
      'Access-Control-Allow-Origin': 'https://example.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    });
  });

  it('returns empty object for disallowed origins', () => {
    expect(getCorsHeaders('https://malicious.com')).toEqual({});
    expect(getCorsHeaders('http://localhost:3000')).toEqual({});
  });
});