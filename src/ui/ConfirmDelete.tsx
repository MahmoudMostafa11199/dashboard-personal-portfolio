type ConfirmDeleteProps = {
  resourceName: string;
  disabled?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
};

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onClose,
}: ConfirmDeleteProps) {
  //
  async function handleConfirm() {
    await onConfirm?.();
    onClose?.();
  }

  return (
    <div className="w-lg">
      <h2 className="text-xl font-semibold mb-3">Delete {resourceName}</h2>

      <p className="mb-6 text-gray-400">
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex justify-end items-center gap-4">
        <button
          className="bg-gray-800 border border-gray-700 px-4 py-2.5 rounded transition-colors hover:bg-gray-750"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          className="bg-rose-700 px-4 py-2.5 rounded transition-colors hover:bg-rose-800"
          onClick={handleConfirm}
          disabled={disabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
