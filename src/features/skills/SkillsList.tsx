import { HiOutlineSparkles } from 'react-icons/hi2';
import Pagination from '../../ui/Pagination';
import SkillCard from './SkillCard';
import SkillCardSkeleton from './SkillCardSkeleton';
import { useSkillPagination } from './useSkillPagination';
import EmptyState from '../../ui/EmptyState';

function SkillsList() {
  const {
    skills,
    isLoading,
    count,
    pageCount,
    currentPage,
    handleNext,
    handlePrev,
  } = useSkillPagination();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <SkillCardSkeleton key={index} />
          ))}

        {!isLoading && count === 0 && (
          <EmptyState
            icon={HiOutlineSparkles}
            filterKey="category"
            emptyTitle="No skills yet"
            emptyMessage="Add your first skill to showcase your expertise."
          />
        )}

        {!isLoading &&
          count !== 0 &&
          skills?.map((skill) => <SkillCard key={skill.id} skill={skill} />)}
      </div>

      <div className="bg-stone-200  dark:bg-gray-950">
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

export default SkillsList;
