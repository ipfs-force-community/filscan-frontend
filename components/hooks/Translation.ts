import { useTranslation } from 'react-i18next';

type TranslationProps = {
  ns: string;
};

export const Translation = ({ ns }: TranslationProps) => {
  const { t } = useTranslation(ns);

  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: ns });
    }
    return t(label, { ns: ns });
  };

  return { tr };
};
