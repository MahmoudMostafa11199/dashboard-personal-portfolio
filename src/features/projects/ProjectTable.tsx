import ProjectRow from './ProjectRow';
import SpinnerMini from '../../ui/SpinnerMini';

import Pagination from '../../ui/Pagination';
import Empty from '../../ui/Empty';
import { useProjectPagination } from './useProjectPagination';
import { PAGE_SIZE } from '../../utils/constants';

function ProjectTable() {
  const {
    projects,
    isLoading,
    count,
    pageCount,
    currentPage,
    handleNext,
    handlePrev,
  } = useProjectPagination();

  const startIndex = (currentPage - 1) * PAGE_SIZE;

  return (
    <>
      <div className="border border-gray-300 dark:border-0">
        {/* Table header — hidden on mobile since cards don't need column headers */}
        <div className="hidden sm:grid w-full bg-stone-200 font-semibold grid-cols-[60px_1fr_120px_220px] gap-4 p-3 items-center dark:bg-gray-950">
          <h4>#</h4>
          <h4>Title</h4>
          <h4>Status</h4>
          <h4>Action</h4>
        </div>

        <section className="dark:bg-gray-900">
          {isLoading && (
            <div className="place-items-center py-2">
              <SpinnerMini />
            </div>
          )}

          {!isLoading && !count && (
            <div className="text-center py-3">
              <Empty resourceName="project" />
            </div>
          )}

          {!isLoading &&
            projects.length > 0 &&
            projects?.map((project, i) => (
              <ProjectRow
                key={project.id}
                project={project}
                i={startIndex + i}
              />
            ))}
        </section>
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

export default ProjectTable;
