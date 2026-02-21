import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import type { DocumentSnapshot } from 'firebase/firestore';
import { useProjects } from './useProjects';
import { PAGE_SIZE } from '../../utils/constants';

export function useProjectPagination() {
  const [pagination, setPagination] = useState<{
    direction: 'next' | 'prev' | 'first';
    cursor: DocumentSnapshot | null;
  }>({ direction: 'first', cursor: null });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  //
  const { projects, isLoading, count, lastDoc, firstDoc } = useProjects({
    pagination,
  });

  const filter = searchParams.get('status');
  const sort = searchParams.get('sortBy');

  useEffect(() => {
    setPagination({ direction: 'first', cursor: null });
    setCurrentPage(1);
  }, [filter, sort]);

  const pageCount = Math.ceil(count / PAGE_SIZE) || 1;

  // Handle next button
  const handleNext = () => {
    if (lastDoc && currentPage < pageCount) {
      setPagination({ direction: 'next', cursor: lastDoc });
      setCurrentPage((p) => p + 1);
    }
  };

  // Handle previous button
  const handlePrev = () => {
    if (firstDoc && currentPage > 1) {
      setPagination({ direction: 'prev', cursor: firstDoc });
      setCurrentPage((p) => p - 1);
    }
  };

  return {
    projects,
    isLoading,
    count,
    pageCount,
    currentPage,
    handleNext,
    handlePrev,
  };
}
