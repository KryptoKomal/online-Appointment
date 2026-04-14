import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Themes: 'modern' (current), 'neubrutalism', 'neumorphism'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'modern';
  });

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
    // Apply theme class to body
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
