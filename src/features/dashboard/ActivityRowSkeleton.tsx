function ActivityRowSkeleton() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="w-9 h-9 rounded-md bg-gray-300 dark:bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

export default ActivityRowSkeleton;
