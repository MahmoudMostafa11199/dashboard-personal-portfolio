import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import type { DocumentSnapshot } from 'firebase/firestore';

import { getProjects, type FilterType } from '../../services/apiProjects';

//
type UseProjectsProps = {
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
  };
};

//
export function useProjects({ pagination }: UseProjectsProps) {
  const [serchParams] = useSearchParams();

  // Filter
  const filterValue = serchParams.get('status');
  const filters: FilterType[] | null =
    filterValue && filterValue !== 'all'
      ? [{ field: 'status', value: filterValue, method: '==' }]
      : null;

  // Sort
  const sortByRaw = serchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction };

  // Pagination
  const cursorId = pagination.cursor?.id || null;

  //
  const queryResult = useQuery({
    queryKey: ['projects', filters, sortBy, pagination.direction, cursorId],
    queryFn: () => getProjects({ filters, sortBy, pagination }),
    placeholderData: keepPreviousData,
  });

  const { data, isPending: isLoading, isError, error } = queryResult;

  const projects = data?.data ?? [];
  const count = data?.count ?? 0;

  return {
    projects,
    count,
    isLoading,
    isError,
    error,
    firstDoc: data?.firstDoc,
    lastDoc: data?.lastDoc,
  };
}
