import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { DocumentSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'react-router';
import { getSkills } from '../../services/apiSkills';

type UseSkillsProps = {
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page: number;
  };
};

export function useSkills({ pagination }: UseSkillsProps) {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('category');
  const filters =
    !filterValue || filterValue === 'all'
      ? null
      : [{ field: 'categoryFilter', value: filterValue }];

  const searchQuery = searchParams.get('query') ?? '';
  const cursorId = pagination.cursor?.id ?? null;

  const queryResult = useQuery({
    queryKey: [
      'skills',
      filters,
      searchQuery,
      pagination.direction,
      cursorId,
      pagination.page,
    ],

    queryFn: () =>
      getSkills({
        filters,
        search: { query: searchQuery },
        pagination,
      }),

    placeholderData: keepPreviousData,
  });

  const { data, isPending: isLoading, isError, error } = queryResult;

  const skills = data?.data ?? [];

  return {
    skills,
    isLoading,
    isError,
    error,
    count: data?.count ?? 0,
    firstDoc: data?.firstDoc ?? null,
    lastDoc: data?.lastDoc ?? null,
  };
}
