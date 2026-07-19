type VariationsType = {
  primary: string;
  secondary: string;
  danger: string;
};

type SizeType = {
  small: string;
  medium: string;
  large: string;
};

type Props = {
  type: 'submit' | 'button' | 'reset';
  variation?: keyof VariationsType;
  size?: keyof SizeType;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

function Button({
  type,
  variation = 'primary',
  size = 'medium',
  className = '',
  onClick,
  disabled,
  children,
}: Props) {
  const variations: VariationsType = {
    primary: 'text-white bg-primary-700 hover:bg-primary-800',
    secondary:
      'border-1 border-primary-900 hover:bg-gray-200 dark:hover:bg-gray-600',
    danger: 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  const sizes: SizeType = {
    small: 'text-xs px-2 py-1 uppercase font-semibold text-center',
    medium: 'text-sm px-4 py-2 font-medium',
    large: 'text-base px-4 py-3 font-medium',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded shadow-sm transition-colors duration-200 ${variations[variation]} ${sizes[size]} ${className} disabled:opacity-65`}
    >
      {children}
    </button>
  );
}

export default Button;
