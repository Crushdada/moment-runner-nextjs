const locales = {
  en: require('../../public/locals/en.json')
}
export const getLocale = (locale: string) => {
  try {
    const module = require(`../../public/locals/${locale}.json`)
    if (module) {
      return module
    } else {
      return locales.en
    }
  } catch (error) {
    return locales.en
  }
}
