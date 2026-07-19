import type { FirebaseTimestamp } from '../features/projects/types';

// Convert (Timestamp | undefined) To (string | undefined)
export function formatTimestampForInput(
  timestamp?: FirebaseTimestamp,
): string | undefined {
  if (!timestamp) return undefined;

  // .toDate() ==> Date object
  // .toISOString() ==> "2025-10-27T00:00:00.000Z"
  // .split('T')[0] ==> "2025-10-27"
  return timestamp.toDate().toISOString().split('T')[0];
}

// Convert (Timestamp | undefined) To (string | undefined)
export function formatTimestamp(
  timestamp?: FirebaseTimestamp,
): string | undefined {
  if (!timestamp) return undefined;

  return timestamp
    .toDate()
    .toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getProgressGradient(value: number) {
  if (value >= 80) return 'from-emerald-400 to-emerald-600';
  if (value >= 50) return 'from-amber-400 to-amber-600';
  return 'from-[#fe3a34] to-[#ff9996]';
}

export const progressColor = (value: number) =>
  value >= 80
    ? 'text-emerald-600 dark:text-emerald-400'
    : value >= 50
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-primary-600 dark:text-primary-400';

//
export function getColorFromString(str: string): string {
  const colors = [
    'from-blue-500 to-blue-700',
    'from-purple-500 to-purple-700',
    'from-emerald-500 to-emerald-700',
    'from-orange-500 to-orange-700',
    'from-pink-500 to-pink-700',
    'from-cyan-500 to-cyan-700',
    'from-indigo-500 to-indigo-700',
    'from-rose-500 to-rose-700',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}
export function getInitials(title: string): string {
  return title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export const generateArray = (length: number) => {
  return Array.from({ length });
};
