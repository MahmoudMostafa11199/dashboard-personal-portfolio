import { createContext, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import type { ThemeContextType } from './types';

//
const DarkModeContext = createContext<ThemeContextType | null>(null);

//
function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches,
    'isDarkMode'
  );

  const toggleDarkMode = () =>
    setIsDarkMode((isDarkMode: boolean) => !isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//
export default DarkModeProvider;
export { DarkModeContext };
