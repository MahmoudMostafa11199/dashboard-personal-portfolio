import { isValidElement, type ReactNode } from 'react';

type FormRowProps = {
  label?: string;
  error?: string;
  children: ReactNode;
  hasButton?: boolean;
};

function FormRow({ label, error, hasButton = false, children }: FormRowProps) {
  const childId = isValidElement(children)
    ? (children.props as { id?: string }).id
    : undefined;

  return (
    <div
      className={`text-sm grid grid-cols-1 sm:grid-cols-[13rem_1.4fr_1fr] items-start sm:items-center gap-1.5 sm:gap-2.5 border-b border-gray-300 py-3 dark:border-gray-700 first:pt-4 last:pb-0 last:border-b-0 ${hasButton ? 'flex! justify-end! gap-3! flex-wrap! sm:flex-nowrap! py-3!' : ''}`}
    >
      {label && (
        <label className="font-medium" htmlFor={childId}>
          {label}
        </label>
      )}

      {children}

      {error && <span className="text-red-700 dark:text-red-500">{error}</span>}
    </div>
  );
}

export default FormRow;
