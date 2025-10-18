import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from './Icons';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default ThemeToggle;
