import { HiOutlineBriefcase } from 'react-icons/hi2';
import EmptyState from '../../ui/EmptyState';
import Pagination from '../../ui/Pagination';
import type { SkillType } from '../skills/types';
import { useExperiencePagination } from './useExperiencesPagination';
import ExperienceTimelineItem from './ExperienceTimelineItem';
import ExperienceTimelineItemSkelton from './ExperienceTimelineItemSkelton';

function ExperiencesList({ skills }: { skills: SkillType[] }) {
  const {
    experiencesData,
    isLoading,
    count,
    pageCount,
    currentPage,
    handleNext,
    handlePrev,
  } = useExperiencePagination();

  return (
    <>
      <div
        className={`border-stone-300 min-h-10 ms-3 my-8 px-5.5 sm:px-8 dark:border-gray-700 space-y-10 ${count === 0 ? 'border-0' : 'border-s-2'}`}
      >
        {isLoading && <ExperienceTimelineItemSkelton />}

        {!isLoading && count === 0 && (
          <EmptyState
            icon={HiOutlineBriefcase}
            filterKey="experience-type"
            emptyTitle="No experiences yet"
            emptyMessage="Start building your timeline by adding your first work or training experience."
          />
        )}

        {!isLoading &&
          count !== 0 &&
          experiencesData?.map((experience) => (
            <ExperienceTimelineItem
              experience={experience}
              key={experience.id}
              skills={skills}
            />
          ))}
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

export default ExperiencesList;
