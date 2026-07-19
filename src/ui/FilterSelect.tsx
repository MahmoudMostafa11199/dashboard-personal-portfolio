import { useSearchParams } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import type { Option } from './types';
import { FiChevronDown } from 'react-icons/fi';

type FilterProps = {
  filterField: string;
  options: Option[];
};

function FilterSelect({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentValue = searchParams.get(filterField) || 'all';

  const handleSelect = (value: string, label: string) => {
    if (value === 'all') {
      searchParams.delete(filterField);
    } else {
      searchParams.set(filterField, value);
    }
    setSearchParams(searchParams);
    setSelectedLabel(label);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update selected label when URL params change
  useEffect(() => {
    const current = options.find((opt) => opt.value === currentValue);
    if (current) setSelectedLabel(current.label);
    else setSelectedLabel('All');
  }, [currentValue, options]);

  return (
    <div className="relative w-full max-w-sm" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 bg-stone-50 py-2 px-4 text-sm border border-stone-200 shadow-sm font-medium rounded-md dark:bg-gray-900 dark:border-gray-700 w-full"
      >
        <span>{selectedLabel}</span>
        <FiChevronDown
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 border border-stone-200 dark:border-gray-700 rounded-md shadow-lg w-full max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
              className={`px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 cursor-pointer transition-colors ${
                currentValue === option.value
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                  : ''
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterSelect;

/*
import { useSearchParams } from 'react-router';
import type { Option } from './types';

type FilterProps = {
  filterField: string;
  options: Option[];
};

function FilterSelect({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);

    if (value === 'all') searchParams.delete(filterField);

    setSearchParams(searchParams);
  };

  return (
    <select
      name={filterField}
      id={filterField}
      onChange={(e) => handleClick(e.target.value)}
      className="bg-stone-50 py-2 px-4 text-sm border-1 border-stone-200 shadow-sm font-medium rounded-md dark:bg-gray-900"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default FilterSelect;
*/
