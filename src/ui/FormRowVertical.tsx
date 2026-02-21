type Props = {
  label?: string;
  children: React.ReactElement<{ id: string }>;
};

function FormRowVertical({ label, children }: Props) {
  return (
    <div className="flex flex-col gap-2 py-3">
      {label && (
        <label htmlFor={children.props.id} className="font-medium capitalize">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export default FormRowVertical;
