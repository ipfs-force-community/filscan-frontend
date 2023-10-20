import { useFilscanStore } from '@/store/FilscanStore';
//import filscanStore from '@/store/modules/filscan';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type TranslationProps = {
  ns: string;
};

export const Translation = ({ ns }: TranslationProps) => {
  const { lang } = useFilscanStore(); // 使用你的 store 获取 lang 状态
  const { t, i18n } = useTranslation(ns);

  // 当 lang 状态改变时，重新设置语言
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  const tr = useCallback((label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: ns });
    }
    return t(label, { ns: ns });

  },[i18n.language])

  return { tr };
};