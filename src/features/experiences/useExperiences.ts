import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getExperiences } from '../../services/apiExperiences';
import type { DocumentSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'react-router';

type UseExperiencessProps = {
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page: number;
  };
};

export const useExperiences = ({ pagination }: UseExperiencessProps) => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('experience-type');
  const filters =
    !filterValue || filterValue === 'all'
      ? null
      : [{ field: 'type', value: filterValue }];

  const searchQuery = searchParams.get('query') ?? '';
  const cursorId = pagination.cursor?.id ?? null;

  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'experiences',
      filters,
      searchQuery,
      pagination.direction,
      cursorId,
      pagination.page,
    ],

    queryFn: () =>
      getExperiences({ filters, search: { query: searchQuery }, pagination }),

    placeholderData: keepPreviousData,
  });

  const experiencesData = data?.data ?? [];

  return {
    experiencesData,
    isLoading,
    isError,
    error,
    count: data?.count ?? 0,
    firstDoc: data?.firstDoc ?? null,
    lastDoc: data?.lastDoc ?? null,
  };
};
