import { useSearchParams } from 'react-router';
import type { Option } from './types';

import FilterButton from './FilterButton';

type FilterProps = {
  filterField: string;
  options: Option[];
};

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);

    if (value === 'all') searchParams.delete(filterField);

    setSearchParams(searchParams);
  };

  return (
    <div className="bg-stone-50 flex flex-wrap justify-center md:justify-normal gap-1 gap-y-2 p-2 rounded-4xl shadow-sm dark:bg-gray-900">
      {options.map((option) => (
        <FilterButton
          key={option.value}
          label={option.label}
          onclick={() => handleClick(option.value)}
          disabled={currentFilter === option.value}
        />
      ))}
    </div>
  );
}

export default Filter;
