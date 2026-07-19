import type { User } from 'firebase/auth';
import { HiCalendarDays } from 'react-icons/hi2';

function AccountLongevity({ user }: { user: User }) {
  const createdAt = user.metadata.creationTime;
  const days = createdAt
    ? Math.floor(
        (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  const createdYear = createdAt ? new Date(createdAt).getFullYear() : '';

  return (
    <div className="bg-white shadow-xs py-5 px-4 sm:py-7 sm:px-6 rounded-md dark:bg-gray-700">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 mb-5">
        <HiCalendarDays size={20} />
        <span>Account Longevity</span>
      </div>

      <div className="flex items-end gap-2 mb-6">
        <span className="text-5xl sm:text-6xl font-bold">{days}</span>
        <span className="text-gray-600 mb-1 dark:text-gray-300">Days</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        You've been curating your professional legacy with us since{' '}
        <span className="font-medium text-gray-700 dark:text-gray-50">
          {createdYear}
        </span>
        .
      </p>
    </div>
  );
}

export default AccountLongevity;
