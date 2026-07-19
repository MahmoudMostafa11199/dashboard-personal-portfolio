import { Link } from 'react-router';
import { STATUS_STYLES } from '../../utils/constants';
import { formatTimestamp, generateArray } from '../../utils/helpers';
import ProjectCardSkeleton from './ProjectCardSkeleton';
import { useRecentProjects } from './useRecentProjects';

function RecentProjects() {
  const { projects, isLoading } = useRecentProjects();

  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 sm:p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold">Recent Projects</h2>
        <Link
          to="/projects"
          className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading &&
          generateArray(4).map((_, i) => <ProjectCardSkeleton key={i} />)}

        {!isLoading && projects.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 col-span-full text-center py-8">
            No projects yet — add your first one to see it here.
          </p>
        )}

        {!isLoading &&
          projects.map((project) => (
            <div
              key={project.id}
              className="bg-stone-100 dark:bg-gray-800 rounded-md p-4 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`text-xs font-semibold uppercase px-2.5 py-0.5 rounded ${
                    STATUS_STYLES[project.status] ?? STATUS_STYLES.completed
                  }`}
                >
                  {project.status.replace('-', ' ')}
                </span>
                {project.startDate && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(project.startDate)}
                  </span>
                )}
              </div>

              <h3 className="font-semibold mb-1 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                {project.description}
              </p>

              <Link
                to={`/projects/${project.id}`}
                className="mt-auto text-center text-sm font-medium py-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentProjects;
