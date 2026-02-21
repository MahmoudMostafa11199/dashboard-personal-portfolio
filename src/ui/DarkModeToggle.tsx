import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useDarkMode } from '../context/useDarkMode';

import ButtonIcon from './ButtonIcon';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onclick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun title="Light mode" />
      ) : (
        <HiOutlineMoon title="Dark mode" />
      )}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
