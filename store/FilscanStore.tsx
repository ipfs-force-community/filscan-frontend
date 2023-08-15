/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FilscanStore {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

const FilscanStoreContext = createContext<FilscanStore | null>(null);

export const FilscanStoreProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [theme, setTheme] = useState<string>('light');
  const [lang, setLang] = useState<string>('zh');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('theme', 'light');
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    lang,
    setLang,
  };

  return (
    <FilscanStoreContext.Provider value={value}>
      {children}
    </FilscanStoreContext.Provider>
  );
};

export const useFilscanStore = (): FilscanStore => {
  const context = useContext(FilscanStoreContext);
  if (!context) {
    throw new Error(
      'useFilscanStore must be used within a FilscanStoreProvider'
    );
  }
  return context;
};
