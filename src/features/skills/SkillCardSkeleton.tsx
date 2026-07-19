function SkillCardSkeleton() {
  return (
    <div className="px-5 py-6 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse">
      {/* Icon and Actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="size-9 rounded-md bg-gray-400 dark:bg-gray-600" />
        <div className="flex items-center gap-4">
          <div className="size-4 rounded bg-gray-400 dark:bg-gray-600" />
          <div className="size-4 rounded bg-gray-400 dark:bg-gray-600" />
        </div>
      </div>

      {/* Skill Name */}
      <div className="h-5 w-2/3 rounded bg-gray-400 dark:bg-gray-600 mb-2" />
      <div className="h-3 w-1/3 rounded bg-gray-400 dark:bg-gray-600 mb-4" />

      {/* Proficiency */}
      <div className="flex justify-between items-center mb-1">
        <div className="h-3 w-16 rounded bg-gray-400 dark:bg-gray-600" />
        <div className="h-3 w-8 rounded bg-gray-400 dark:bg-gray-600" />
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 w-full rounded-full bg-gray-400 dark:bg-gray-600 mb-4" />

      {/* Tags */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-12 rounded-lg bg-gray-400 dark:bg-gray-600" />
        <div className="h-5 w-16 rounded-lg bg-gray-400 dark:bg-gray-600" />
        <div className="h-5 w-10 rounded-lg bg-gray-400 dark:bg-gray-600" />
      </div>
    </div>
  );
}

export default SkillCardSkeleton;
