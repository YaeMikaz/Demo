import { useState, useCallback } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

export const useTheme = () => {
  const systemTheme = useRNColorScheme();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);
  
  return {
    theme: currentTheme,
    isDark,
    setTheme,
    toggleTheme,
  };
};
