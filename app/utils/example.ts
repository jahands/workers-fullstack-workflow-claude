// Example utility function for demonstration
export function formatGreeting(name: string, time: 'morning' | 'afternoon' | 'evening' = 'morning'): string {
  if (!name.trim()) {
    throw new Error('Name cannot be empty');
  }
  
  const greetings = {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening'
  };
  
  return `${greetings[time]}, ${name}!`;
}