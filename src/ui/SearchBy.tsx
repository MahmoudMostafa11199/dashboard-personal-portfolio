import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useSearchParams } from 'react-router';

type SearchProps = {
  queryName: string;
  placeholder?: string;
};

function SearchBy({ queryName, placeholder }: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchBy = searchParams.get(queryName) || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set(queryName, e.target.value);

    if (!e.target.value.trim()) searchParams.delete(queryName);

    setSearchParams(searchParams);
  };

  return (
    <div className="relative w-full max-w-sm">
      <HiMagnifyingGlass className="absolute top-1/2 left-2.5 -translate-y-1/2" />

      <input
        type="search"
        placeholder={placeholder}
        className="form__input ps-9 py-2 text-sm w-full"
        name={queryName}
        id={queryName}
        value={searchBy}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBy;
