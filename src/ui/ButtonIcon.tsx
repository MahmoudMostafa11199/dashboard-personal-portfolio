type Props = {
  title?: string;
  onclick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function ButtonIcon({ title, onclick, disabled, children }: Props) {
  return (
    <button
      title={title}
      type="button"
      className="btn--icon"
      onClick={onclick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
