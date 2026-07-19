import { useInProgressProjects } from '../../features/dashboard/useInProgressProjects';

function ProgressRowSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="flex justify-between">
        <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-2 w-full bg-gray-300 dark:bg-gray-700 rounded-full" />
    </div>
  );
}

function InProgressBreakdown() {
  const { projects, isLoading } = useInProgressProjects();

  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 sm:p-6">
      <h2 className="text-lg font-semibold mb-5">In-Progress Breakdown</h2>

      <div className="space-y-5">
        {isLoading &&
          Array.from({ length: 2 }).map((_, i) => (
            <ProgressRowSkeleton key={i} />
          ))}

        {!isLoading && projects.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
            No projects in progress right now.
          </p>
        )}

        {!isLoading &&
          projects.map((project) => {
            const percentage = Math.min(
              Math.max(project.completionPercentage ?? 0, 0),
              100,
            );

            return (
              <div key={project.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium truncate pe-2">
                    {project.title}
                  </span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 shrink-0">
                    {percentage}%
                  </span>
                </div>

                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default InProgressBreakdown;
