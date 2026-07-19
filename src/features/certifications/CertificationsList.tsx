import { HiOutlineAcademicCap } from 'react-icons/hi2';
import EmptyState from '../../ui/EmptyState';
import Pagination from '../../ui/Pagination';
import CertificationCard from './CertificationCard';
import CertificationCardSkelton from './CertificationCardSkelton';
import type { CertificationType } from './types';
import { useCertificationsPagination } from './useCertificationsPagination';

export default function CertificationsList() {
  const {
    certifications,
    count,
    currentPage,
    isLoading,
    pageCount,
    handleNext,
    handlePrev,
  } = useCertificationsPagination();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-7 py-8">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <CertificationCardSkelton key={i} />
          ))}

        {!isLoading && count === 0 && (
          <EmptyState
            icon={HiOutlineAcademicCap}
            filterKey="issuer"
            emptyTitle="No certifications yet"
            emptyMessage="Add your first certification to showcase your credentials."
          />
        )}

        {!isLoading &&
          count !== 0 &&
          certifications.map((certification, i) => (
            <CertificationCard
              key={i}
              certification={certification as CertificationType}
            />
          ))}
      </div>

      <div className="bg-stone-200  dark:bg-gray-950 mb-8">
        <Pagination
          count={count}
          currentPage={currentPage}
          pageCount={pageCount}
          prevPage={handlePrev}
          nextPage={handleNext}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
