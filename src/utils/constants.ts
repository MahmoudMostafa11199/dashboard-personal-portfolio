import { FaBriefcase, FaGraduationCap, FaStar, FaUsers } from 'react-icons/fa';

export const PAGE_SIZE: number = 10;
export const IMAGE_URL: string =
  'https://github.com/MahmoudMostafa11199/portfolio-assets/blob/main';

export const STATUS_STYLES = {
  pending: 'bg-yellow-500 text-yellow-100',
  'in-progress': 'bg-blue-500 text-blue-100',
  completed: 'bg-green-800 text-green-200',
};

export const EXPERIENCE_TYPE_STYLES = {
  work: {
    label: 'Work',
    icon: FaBriefcase,
    className:
      'text-primary-700 bg-primary-100/70 dark:text-primary-300 dark:bg-primary-500/10',
    iconStyle:
      'border-primary-300 text-primary-700 dark:border-primary-800 dark:text-primary-300',
  },
  training: {
    label: 'Training',
    icon: FaUsers,
    className:
      'text-purple-700 bg-purple-100/70 dark:text-purple-300 dark:bg-purple-500/10',
    iconStyle:
      'border-purple-300 text-purple-700 dark:border-purple-800 dark:text-purple-300',
  },
  internship: {
    label: 'Internship',
    icon: FaGraduationCap,
    className:
      'text-emerald-700 bg-emerald-100/70 dark:text-emerald-300 dark:bg-emerald-500/10',
    iconStyle:
      'border-emerald-300 text-emerald-700 dark:border-emerald-800 dark:text-emerald-300',
  },
  other: {
    label: 'Other',
    icon: FaStar,
    className:
      'text-amber-700 bg-amber-100/70 dark:text-amber-300 dark:bg-amber-500/10',
    iconStyle:
      'border-amber-300 text-amber-700 dark:border-amber-800 dark:text-amber-300',
  },
};