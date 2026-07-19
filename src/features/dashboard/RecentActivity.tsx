import {
  HiOutlineClipboardDocumentList,
  HiOutlineStar,
  HiOutlineBriefcase,
} from 'react-icons/hi2';
import { FaCertificate } from 'react-icons/fa';
import { useRecentActivity } from '../../features/dashboard/useRecentActivity';
import { formatTimestamp } from '../../utils/helpers';
import ActivityRowSkeleton from './ActivityRowSkeleton';
import type { Timestamp } from 'firebase/firestore';

function RecentActivity() {
  const { project, skill, experience, certification, isLoading } =
    useRecentActivity();

  const items = [
    project && {
      icon: HiOutlineClipboardDocumentList,
      color: 'text-blue-700 bg-blue-400/10 dark:text-blue-500',
      label: 'New project added',
      title: project.title,
      date: project.createdAt,
    },
    skill && {
      icon: HiOutlineStar,
      color: 'text-amber-700 bg-amber-400/10 dark:text-amber-500',
      label: 'New skill added',
      title: skill.name,
      date: skill.createdAt,
    },
    experience && {
      icon: HiOutlineBriefcase,
      color: 'text-teal-700 bg-teal-400/10 dark:text-teal-500',
      label: 'New experience added',
      title: experience.title,
      date: experience.createdAt,
    },
    certification && {
      icon: FaCertificate,
      color: 'text-purple-700 bg-purple-400/10 dark:text-purple-500',
      label: 'New certification added',
      title: certification.title,
      date: certification.createdAt,
    },
  ].filter(Boolean) as {
    icon: typeof HiOutlineStar;
    color: string;
    label: string;
    title: string;
    date: Timestamp;
  }[];

  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 sm:p-6">
      <h2 className="text-lg font-semibold mb-5">Recent Activity</h2>

      <div className="space-y-4">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => (
            <ActivityRowSkeleton key={i} />
          ))}

        {!isLoading && items.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
            No activity yet — start adding to your dashboard.
          </p>
        )}

        {!isLoading &&
          items.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`rounded-md p-2 shrink-0 ${item.color}`}>
                <item.icon size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-sm flex flex-col">
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.label}:
                  </span>

                  <span className="font-medium truncate" title={item.title}>
                    {item.title}
                  </span>
                </p>

                <p className="text-xs mt-0.5 text-gray-400 dark:text-gray-500">
                  {formatTimestamp(item.date)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentActivity;
