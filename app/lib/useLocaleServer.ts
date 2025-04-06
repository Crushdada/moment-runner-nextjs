import { getLocale, getTranslations } from 'next-intl/server';


export async function useLocaleServer(namespace?: string) {
  const [lang, t] = await Promise.all([
    getLocale(),
    getTranslations(namespace)
  ]);

  return {
    t,    // 翻译函数
    lang  // 当前语言标识
  };
}