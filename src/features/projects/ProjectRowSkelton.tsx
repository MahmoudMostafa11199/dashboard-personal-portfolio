export default function ProjectRowSkelton() {
  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden p-3 border-b border-gray-300 dark:border-gray-800 space-y-2 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-5 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-23 rounded-4xl bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

        <div className="flex flex-wrap gap-1.5 pt-1">
          <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid project__item w-full grid-cols-[60px_1fr_120px_220px] gap-4 items-center p-3 animate-pulse">
        <div className="h-4 w-5 rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-5 w-23 rounded-4xl bg-gray-200 dark:bg-gray-700" />

        <div className="flex gap-1.5">
          <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-7 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </>
  );
}
