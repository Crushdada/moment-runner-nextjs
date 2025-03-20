import { getLocale } from './getLocale'
import { getNestedValue } from './utils'

export function useLocaleByLang(lang: string='en') {
  const localeJson = getLocale(lang)
  return {
    t: (key: string) => {
      const value = getNestedValue(localeJson, key)
      return value
    },
    lang: lang,
  }
}