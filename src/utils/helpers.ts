import type { FirebaseTimestamp } from '../features/projects/types';

// Convert (Timestamp | undefined) To (string | undefined)
export function formatTimestampForInput(
  timestamp?: FirebaseTimestamp
): string | undefined {
  if (!timestamp) return undefined;

  // .toDate() ==> Date object
  // .toISOString() ==> "2025-10-27T00:00:00.000Z"
  // .split('T')[0] ==> "2025-10-27"
  return timestamp.toDate().toISOString().split('T')[0];
}
