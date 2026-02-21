type Props = {
  label: string;
  disabled: boolean;
  onclick: () => void;
};

function FilterButton({ label, disabled, onclick }: Props) {
  return (
    <button
      className="bg-stone-200 px-2 py-1 rounded-3xl text-sm font-medium transition-colors hover:bg-primary-600 hover:text-primary-50 disabled:bg-primary-600 disabled:text-primary-50 dark:bg-gray-900"
      disabled={disabled}
      onClick={onclick}
    >
      {label}
    </button>
  );
}

export default FilterButton;
