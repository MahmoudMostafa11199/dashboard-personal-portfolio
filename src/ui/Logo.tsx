import { useDarkMode } from '../context/useDarkMode';

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <img
      src={`/logo-${isDarkMode ? '2' : '1'}.png`}
      alt="logo"
      className="h-8"
    />
  );
}

export default Logo;
