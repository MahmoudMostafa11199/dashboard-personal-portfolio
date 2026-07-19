import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { Link } from 'react-router';

const ACTIONS = [
  { label: 'Add Project', to: '/projects?action=add' },
  { label: 'Add Skill', to: '/skills?action=add' },
  { label: 'Add Experience', to: '/experiences?action=add' },
  { label: 'Add Certification', to: '/certifications?action=add' },
];

function QuickActions() {
  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 sm:p-6 mb-8">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="flex flex-wrap gap-3">
        {ACTIONS.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-stone-100 dark:bg-gray-800 hover:bg-stone-200 dark:hover:bg-gray-700 transition-colors"
          >
            <HiOutlinePlusCircle
              size={16}
              className="text-primary-600 dark:text-primary-400"
            />
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
