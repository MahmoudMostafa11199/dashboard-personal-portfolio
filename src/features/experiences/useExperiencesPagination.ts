import type { DocumentSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PAGE_SIZE } from '../../utils/constants';
import { useExperiences } from './useExperiences';

export function useExperiencePagination() {
  const [pagination, setPagination] = useState<{
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
    page: number;
  }>({ direction: 'first', cursor: null, page: 1 });

  const [searchParams] = useSearchParams();

  const { experiencesData, isLoading, count, firstDoc, lastDoc } =
    useExperiences({
      pagination,
    });

  const filter = searchParams.get('experience-type');
  const search = searchParams.get('search');

  useEffect(() => {
    setPagination({ direction: 'first', cursor: null, page: 1 });
  }, [filter, search]);

  const pageCount = Math.ceil(count / PAGE_SIZE) || 1;
  const currentPage = pagination.page;

  const handleNext = () => {
    if (currentPage < pageCount) {
      setPagination((prev) => ({
        direction: 'next',
        cursor: lastDoc,
        page: prev.page - 1,
      }));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setPagination((prev) => ({
        direction: 'prev',
        cursor: firstDoc,
        page: prev.page + 1,
      }));
    }
  };

  return {
    experiencesData,
    isLoading,
    count,
    pageCount,
    currentPage,
    handleNext,
    handlePrev,
  };
}
