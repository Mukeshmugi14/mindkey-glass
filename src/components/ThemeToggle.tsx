import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLightMode(true);
      document.body.classList.add('light-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 sm:left-6 z-50 glass-panel p-2.5 rounded-full hover:bg-white/10 transition-colors border-white/10 group shadow-[0_0_15px_rgba(203,168,100,0.15)]"
      aria-label="Toggle Theme"
    >
      {isLightMode ? (
        <Moon className="w-5 h-5 text-brand-purple group-hover:text-brand-purple-dark transition-colors" />
      ) : (
        <Sun className="w-5 h-5 text-brand-gold group-hover:text-white transition-colors" />
      )}
    </button>
  );
}
