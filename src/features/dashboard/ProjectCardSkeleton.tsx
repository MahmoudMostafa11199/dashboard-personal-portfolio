function ProjectCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-750 rounded-md p-5 animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="h-9 w-full bg-gray-300 dark:bg-gray-700 rounded mt-4" />
    </div>
  );
}

export default ProjectCardSkeleton;
