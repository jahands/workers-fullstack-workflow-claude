import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Mock the SVG imports
vi.mock('./logo-dark.svg', () => ({ default: 'logo-dark.svg' }));
vi.mock('./logo-light.svg', () => ({ default: 'logo-light.svg' }));

// Import after mocking
import { Welcome } from './welcome';

describe('Welcome Component', () => {
  const testMessage = 'Hello from Cloudflare!';

  it('renders the custom message', () => {
    render(<Welcome message={testMessage} />);
    
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('renders the React Router logo', () => {
    render(<Welcome message={testMessage} />);
    
    const logos = screen.getAllByAltText('React Router');
    expect(logos).toHaveLength(2); // Light and dark theme logos
  });

  it('includes documentation link', () => {
    render(<Welcome message={testMessage} />);
    
    const docsLink = screen.getByRole('link', { name: /React Router Docs/i });
    expect(docsLink).toHaveAttribute('href', 'https://reactrouter.com/docs');
    expect(docsLink).toHaveAttribute('target', '_blank');
  });

  it('includes Discord link', () => {
    render(<Welcome message={testMessage} />);
    
    const discordLink = screen.getByRole('link', { name: /Join Discord/i });
    expect(discordLink).toHaveAttribute('href', 'https://rmx.as/discord');
    expect(discordLink).toHaveAttribute('target', '_blank');
  });
});