import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { PAGE_SIZE } from '../utils/constants';

type Props = {
  count: number;
  currentPage: number;
  pageCount: number;
  prevPage: () => void;
  nextPage: () => void;
  isLoading: boolean;
};

function Pagination({
  count,
  currentPage,
  pageCount,
  prevPage,
  nextPage,
  isLoading,
}: Props) {
  if (count <= PAGE_SIZE) return null;

  //
  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = currentPage === pageCount ? count : currentPage * PAGE_SIZE;

  //
  return (
    <div className="text-sm flex items-center justify-between px-6 py-3 mt-4 dark:bg-gray-930">
      <p>
        Showing {from} to {to} of {count} results
      </p>

      <div className="flex gap-6">
        <button
          className="px-2.5 pe-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors hover:bg-primary-600 disabled:bg-inherit"
          onClick={prevPage}
          disabled={currentPage === 1 || isLoading}
        >
          <BsChevronLeft />
          <span>Prev</span>
        </button>

        <button
          className="px-2.5 ps-3.5 py-1.5 rounded flex items-center gap-1.5 transition-colors hover:bg-primary-600 disabled:bg-inherit"
          onClick={nextPage}
          disabled={currentPage === pageCount || isLoading}
        >
          <span>Next</span>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
