function ExperienceTimelineItemSkelton() {
  return (
    <div className="bg-white p-6 rounded-md dark:bg-gray-750 relative animate-pulse">
      {/* Timeline icon placeholder */}
      <div className="p-2.5 bg-stone-150 flex items-center justify-center rounded-full absolute -left-12.5 top-2 dark:bg-gray-800 border border-transparent w-9 h-9" />

      <div className="flex justify-between items-start mb-4">
        <div className="w-full">
          {/* Badge + dates */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="h-5 w-16 bg-gray-300 rounded-md dark:bg-gray-700" />
            <div className="h-3 w-20 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-3 w-3 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-3 w-20 bg-gray-300 rounded dark:bg-gray-700" />
          </div>

          {/* Title */}
          <div className="h-6 w-56 bg-gray-300 rounded mb-2 dark:bg-gray-700" />

          {/* Company info */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-32 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-4 w-4 bg-gray-300 rounded-full dark:bg-gray-700" />
            <div className="h-4 w-24 bg-gray-300 rounded dark:bg-gray-700" />
            <div className="h-4 w-4 bg-gray-300 rounded-full dark:bg-gray-700" />
            <div className="h-4 w-16 bg-gray-300 rounded dark:bg-gray-700" />
          </div>
        </div>

        {/* Edit / delete icons */}
        <div className="flex items-center gap-4 pe-4">
          <div className="h-5 w-5 bg-gray-300 rounded dark:bg-gray-700" />
          <div className="h-5 w-5 bg-gray-300 rounded dark:bg-gray-700" />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-300 rounded dark:bg-gray-700" />
        <div className="h-3 w-full bg-gray-300 rounded dark:bg-gray-700" />
        <div className="h-3 w-2/3 bg-gray-300 rounded dark:bg-gray-700" />
      </div>

      {/* Skill tags */}
      <div className="flex items-center gap-2">
        <div className="h-6 w-16 bg-gray-300 rounded-md dark:bg-gray-700" />
        <div className="h-6 w-20 bg-gray-300 rounded-md dark:bg-gray-700" />
        <div className="h-6 w-24 bg-gray-300 rounded-md dark:bg-gray-700" />
      </div>
    </div>
  );
}

export default ExperienceTimelineItemSkelton;
