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
  variation: keyof VariationsType;
  size: keyof SizeType;
  onclick?: () => void;
  children: React.ReactNode;
};

function Button({
  type,
  variation = 'primary',
  size = 'medium',
  children,
}: Props) {
  const variations: VariationsType = {
    primary: 'text-primary-50 bg-primary-600 hover:bg-primary-700',
    secondary:
      'text-gray-600 bg-gray-0 border-1 border-gray-200 hover:bg-gray-50',
    danger: 'text-red-100 bg-red-700 hover:bg-red-800',
  };

  const sizes: SizeType = {
    small: 'text-xs px-2 py-1 uppercase font-semibold text-center',
    medium: 'text-sm px-4 py-3 font-medium',
    large: 'text-base px-4 py-3 font-medium',
  };

  return (
    <button
      type={type}
      className={`rounded shadow-sm transition-colors duration-200 ${variations[variation]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}

export default Button;
