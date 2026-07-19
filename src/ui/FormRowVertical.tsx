type Props = {
  label?: string;
  children: React.ReactElement<{ id: string }>;
  error?: string;
};

function FormRowVertical({ label, error, children }: Props) {
  return (
    <div className="flex flex-col py-3">
      {label && (
        <label
          htmlFor={children.props.id}
          className="mb-2 text-sm font-medium capitalize"
        >
          {label}
        </label>
      )}

      {children}

      {error && (
        <span className="text-red-700 dark:text-red-500 text-sm mt-1 ms-3">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormRowVertical;
