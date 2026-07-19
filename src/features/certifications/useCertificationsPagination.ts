import type { DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useCertifications } from './useCertifications';
import { PAGE_SIZE } from '../../utils/constants';

export const useCertificationsPagination = () => {
  const [pagination, setPagination] = useState<{
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page: number;
  }>({ direction: 'first', cursor: null, page: 1 });

  const [searchParams] = useSearchParams();

  const { certifications, isLoading, count, firstDoc, lastDoc } =
    useCertifications({ pagination });

  const filter = searchParams.get('issuer');
  const search = searchParams.get('query');

  useEffect(() => {
    setPagination({ direction: 'first', cursor: null, page: 1 });
  }, [filter, search]);

  const pageCount = Math.ceil(count / PAGE_SIZE) || 1;
  const currentPage = pagination.page;

  const handlePrev = () => {
    if (currentPage > 1) {
      setPagination((prev) => ({
        direction: 'prev',
        cursor: firstDoc,
        page: prev.page - 1,
      }));
    }
  };

  const handleNext = () => {
    if (currentPage < pageCount) {
      setPagination((prev) => ({
        direction: 'next',
        cursor: lastDoc,
        page: prev.page + 1,
      }));
    }
  };

  return {
    certifications,
    count,
    isLoading,
    pageCount,
    currentPage,
    handlePrev,
    handleNext,
  };
};
