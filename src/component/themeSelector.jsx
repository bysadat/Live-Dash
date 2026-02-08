import { Moon, Sun, Monitor } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ThemeSelector = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (themeValue) => {
      if (themeValue === 'system') {
        const isDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', themeValue);
      }
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  // Helper to show the correct icon on the main button
  const getIcon = (t) => {
    if (t === 'light') return <Sun size={16} />;
    if (t === 'dark') return <Moon size={16} />;
    return <Monitor size={16} />;
  };

  return (
    <div className="theme-dropdown" ref={dropdownRef}>
      <button className="theme-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {getIcon(theme)}
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={theme === 'light' ? 'active' : ''}
          >
            <Sun size={16} /> Light
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={theme === 'dark' ? 'active' : ''}
          >
            <Moon size={16} /> Dark
          </button>
          <button
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={theme === 'system' ? 'active' : ''}
          >
            <Monitor size={16} /> System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
