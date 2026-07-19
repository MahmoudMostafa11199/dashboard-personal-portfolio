import type { ComponentType } from 'react';
import { useSearchParams } from 'react-router';

type EmptyStateProps = {
  icon: ComponentType<{ size?: number; className?: string }>;
  filterKey?: string;
  emptyTitle: string;
  emptyMessage: string;
  filteredTitle?: string;
  filteredMessage?: string;
};

function EmptyState({
  icon: Icon,
  filterKey,
  emptyTitle,
  emptyMessage,
  filteredTitle = 'No matching results',
  filteredMessage = 'Try a different filter or clear it to see everything.',
}: EmptyStateProps) {
  const [searchParams] = useSearchParams();
  const filterValue = filterKey ? searchParams.get(filterKey) : null;
  const isFiltered = !!filterValue && filterValue !== 'all';

  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="p-4 bg-stone-150 rounded-full mb-4 dark:bg-gray-800">
        <Icon size={32} className="text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold mb-1">
        {isFiltered ? filteredTitle : emptyTitle}
      </h3>

      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        {isFiltered ? filteredMessage : emptyMessage}
      </p>
    </div>
  );
}

export default EmptyState;
