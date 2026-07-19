export default function CertificationCardSkelton() {
  return (
    <div
      role="status"
      className="bg-white rounded-lg p-4.5 dark:bg-gray-750 flex flex-col h-full animate-pulse"
    >
      {/* Image Skeleton */}
      <div className="aspect-[16/10] mb-5 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <svg
          className="w-10 h-10 text-gray-300 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
          />
        </svg>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4 mb-2" />

        {/* Issuer Skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-2/3 mb-3.5" />

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center gap-2 text-sm mt-auto">
          {/* Date Skeleton */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24" />

          {/* Link Skeleton */}
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-28 flex items-center gap-1.5"></div>
        </div>
      </div>

      <span className="sr-only">Loading certification...</span>
    </div>
  );
}
