import { HiOutlineFolderOpen } from 'react-icons/hi2';

import EmptyState from '../../ui/EmptyState';
import Pagination from '../../ui/Pagination';
import { PAGE_SIZE } from '../../utils/constants';
import { generateArray } from '../../utils/helpers';
import ProjectRow from './ProjectRow';
import ProjectRowSkelton from './ProjectRowSkelton';
import { useProjectPagination } from './useProjectPagination';

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
          {isLoading &&
            generateArray(10).map((_, i) => <ProjectRowSkelton key={i} />)}

          {!isLoading && !count && (
            <EmptyState
              icon={HiOutlineFolderOpen}
              filterKey="status"
              emptyTitle="No projects yet"
              emptyMessage="Once you add a project, it'll show up here."
              filteredTitle="No matching projects"
              filteredMessage="Try a different status filter or clear it to see all projects."
            />
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
