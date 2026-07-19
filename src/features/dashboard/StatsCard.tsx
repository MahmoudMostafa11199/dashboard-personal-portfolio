import { FaCertificate } from 'react-icons/fa';
import {
  HiOutlineBriefcase,
  HiOutlineClipboardDocumentList,
  HiOutlineStar,
} from 'react-icons/hi2';
import { useCardStats } from './useCardStats';

const STAT_ITEMS = [
  {
    key: 'projectsCount',
    label: 'Projects',
    icon: HiOutlineClipboardDocumentList,
    color: 'text-blue-700 bg-blue-400/10 dark:text-blue-500',
  },
  {
    key: 'skillsCount',
    label: 'Skills',
    icon: HiOutlineStar,
    color: 'text-amber-700 bg-amber-400/10 dark:text-amber-500',
  },
  {
    key: 'experiencesCount',
    label: 'Experiences',
    icon: HiOutlineBriefcase,
    color: 'text-teal-700 bg-teal-400/10 dark:text-teal-500',
  },
  {
    key: 'certificationsCount',
    label: 'Certifications',
    icon: FaCertificate,
    color: 'text-purple-700 bg-purple-400/10 dark:text-purple-500',
  },
] as const;

function StatsCard() {
  const { stats, isLoading } = useCardStats();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {STAT_ITEMS.map(({ key, label, icon: Icon, color }) => (
        <div
          key={key}
          className="bg-white dark:bg-gray-750 rounded-md p-4 sm:p-5 flex items-center gap-4"
        >
          <div className={`rounded-md p-2.5 shrink-0 ${color}`}>
            <Icon size={22} />
          </div>

          <div className="min-w-0">
            {isLoading ? (
              <div className="h-7 w-10 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-1" />
            ) : (
              <p className="text-2xl font-bold">{stats[key]}</p>
            )}
            <p className="text-sm uppercase text-gray-500 dark:text-gray-400 truncate">
              {label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
