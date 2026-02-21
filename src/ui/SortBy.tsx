import { useSearchParams } from 'react-router';

import type { Option } from './types';
import Select from './Select';

type SortProps = {
  options: Option[];
};

function SortBy({ options }: SortProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy', e.target.value);

    setSearchParams(searchParams);
  };

  return <Select options={options} value={sortBy} onchange={handleChange} />;
}

export default SortBy;
