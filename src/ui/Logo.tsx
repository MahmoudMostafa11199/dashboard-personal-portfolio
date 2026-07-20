import { useDarkMode } from '../context/useDarkMode';

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <svg height="56" viewBox="26 22 150 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fe6d5e" />
          <stop offset="100%" stopColor="#fe3a34" />
        </linearGradient>
      </defs>

      <path
        d="M64 64 L40 100 L64 136"
        fill="none"
        stroke="url(#accentGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M136 64 L160 100 L136 136"
        fill="none"
        stroke="url(#accentGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <text
        x="100"
        y="102"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Poppins, Arial, sans-serif"
        fontWeight="800"
        fontSize="64"
        fill={!isDarkMode ? '#000' : '#fff'}
      >
        M
      </text>

      <circle cx="158" cy="38" r="9" fill="url(#accentGrad)" />
    </svg>
  );
}

export default Logo;
