import filscanStore from '@/store/modules/filscan'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type TranslationProps = {
  ns: string
}

export const Translation = (props: TranslationProps) => {
  const { ns } = props
  const { lang } = filscanStore
  const { t, i18n } = useTranslation(ns)
  // 当 lang 状态改变时，重新设置语言
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  const tr = useCallback(
    (label: string, value?: Record<string, any>) => {
      if (value) {
        return t(label, { ...value, ns: ns })
      }
      return t(label, { ns: ns })
    },
    [i18n.language],
  )

  return { tr }
}
