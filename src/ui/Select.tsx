import type { Option } from './types';

type SelectProps = {
  options: Option[];
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

function Select({ options, value, onchange }: SelectProps) {
  return (
    <select
      name="sortBy"
      id="sortBy"
      className="bg-stone-50 py-2 px-4 text-sm border-1 border-stone-200 shadow-sm font-medium rounded-md dark:bg-gray-900"
      value={value}
      onChange={(e) => onchange(e)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
