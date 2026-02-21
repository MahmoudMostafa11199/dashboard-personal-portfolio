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

    setSearchParams(searchParams);
  };

  return (
    <div className="bg-stone-50 flex gap-1 p-2 rounded-4xl shadow-sm dark:bg-gray-900">
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
