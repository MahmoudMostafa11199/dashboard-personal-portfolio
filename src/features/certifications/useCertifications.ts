import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { DocumentSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'react-router';
import { getCertifications } from '../../services/apiCertifications';

type UseCertificationsProps = {
  pagination: {
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page: number;
  };
};

export const useCertifications = ({ pagination }: UseCertificationsProps) => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('issuer');
  const filters =
    !filterValue || filterValue === 'all'
      ? null
      : [{ field: 'issuer', value: filterValue }];

  const searchQuery = searchParams.get('query') ?? '';
  const cursorId = pagination.cursor?.id ?? null;

  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [
      'certifications',
      filters,
      searchQuery,
      pagination.direction,
      cursorId,
      pagination.page,
    ],

    queryFn: () =>
      getCertifications({
        filters,
        search: { query: searchQuery },
        pagination,
      }),

    placeholderData: keepPreviousData,
  });

  const certifications = data?.data ?? [];

  return {
    certifications,
    isLoading,
    error,
    isError,
    count: data?.count ?? 0,
    firstDoc: data?.firstDoc ?? null,
    lastDoc: data?.lastDoc ?? null,
  };
};
