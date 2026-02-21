import { useContext } from 'react';
import { DarkModeContext } from './DarkModeContext';

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (!context) throw new Error('DarkMode was used outside DarkModeProvideer');

  return context;
};
