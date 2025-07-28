// Example worker utility for header manipulation
export function parseAuthHeader(authHeader: string | null): { type: string; credentials: string } | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return null;
  
  return {
    type: parts[0],
    credentials: parts[1]
  };
}

export function getCorsHeaders(origin: string): Record<string, string> {
  const allowedOrigins = ['http://localhost:5173', 'https://example.com'];
  
  if (allowedOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    };
  }
  
  return {};
}