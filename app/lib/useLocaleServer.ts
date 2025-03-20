import { useLocaleByLang } from './useLocaleByLang';
import { locales } from './config';
import { headers } from 'next/headers';

export function useLocaleServer(lang?: string) {
  if (lang) {
    return useLocaleByLang(lang)
  }

  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const pathLang = pathname.split('/')[1] || ''

  // 检查获取的语言代码是否在支持的语言列表中
  lang = Object.keys(locales).includes(pathLang) ? pathLang : 'en'
  return useLocaleByLang(lang)
}