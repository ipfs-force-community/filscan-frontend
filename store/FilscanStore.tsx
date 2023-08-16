/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react';

interface FilscanStore {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  lang: string;
  setLang: React.Dispatch<React.SetStateAction<string>>;
}

export const FilscanStoreContext = createContext<FilscanStore | null>(null);

export const FilscanStoreProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [theme, setTheme] = useState<string>('light');
  const [lang, setLang] = useState<string>('zh');

  useEffect(() => {
    const theme_Local = localStorage.getItem('theme');
    const lang_Local = localStorage.getItem('lang');
    if (theme_Local) setTheme(theme_Local);
    if (lang_Local) setLang(lang_Local);

    loadTheme(theme_Local);
  }, []);

  const loadTheme = (theme_Local: any) => {
    if (theme_Local === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('theme', 'dark');
      document.documentElement.setAttribute('class', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('theme', 'light');
      document.documentElement.setAttribute('class', 'light');
    }
  };

  const value = {
    theme,
    setTheme,
    lang,
    setLang,
  };

  return (
    <FilscanStoreContext.Provider
      value={{
        theme,
        setTheme: (value: any) => {
          loadTheme(value);
          setTheme(value);
        },
        lang,
        setLang,
      }}>
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
