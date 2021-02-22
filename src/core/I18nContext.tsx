import React, { useContext, useState, useEffect, useCallback, createContext } from 'react'

export enum LocaleEnum {
  'fr' = 'fr',
  'en' = 'en',
}

export const I18nContext = createContext({
  locale: null,
  translate: (key: string, data?: Record<string, any>, plural?: number): string => {
    return key
  },
})

// Replace dynamic variables in strings
function replaceDynamicVarInString(template: string, data: Record<string, any>) {
  return template.replace(/\{\{(\w+)\}\}/g, function (_, key) {
    return data[key]
  })
}

function getPluralTranslation(template: string, plural: number) {
  // Translations are defined on the following base : "none | unique | plural" or "unique | plural"
  const splitted = template.split('|')

  switch (true) {
    case splitted.length < 2:
      return template
    case splitted.length === 2:
      return plural < 2 ? splitted[0] : splitted[1]
    default:
      return splitted[plural] || splitted.slice(-1)[0]
  }
}

interface I18nProviderProps {
  locale: keyof typeof LocaleEnum
  children: any
}

export const I18nProvider = ({ locale, children }: I18nProviderProps) => {
  const [translations, setTranslations] = useState<Record<string, string>>({})

  // Translations are dinamically imported according to the selected locale
  useEffect(() => {
    const loadTranslations = async () => {
      const translations = (await import(`@/public/lang/${locale}.json`)) as Record<string, string>
      setTranslations(translations || {})
    }

    loadTranslations()
  }, [locale])

  // Translate function that will be used in pages/component to get translations
  const translate = useCallback(
    (key: string, data?: Record<string, any>, plural = 0) => {
      if (!translations || Object.keys(translations).length === 0) {
        return ''
      }

      if (!translations || !translations[key]) {
        console.warn(`Translation '${key}' for locale '${locale}' not found.`)
        return key
      }

      const translation = getPluralTranslation(translations[key], plural)

      return data ? replaceDynamicVarInString(translation, data) : translation
    },
    [translations]
  )

  return <I18nContext.Provider value={{ locale, translate }}>{children}</I18nContext.Provider>
}

export const useI18nContext = () => useContext(I18nContext)
