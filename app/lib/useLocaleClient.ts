import { useTranslations, useLocale } from 'next-intl';

export function useLocaleClient() {
  // 获取当前语言标识，如 'en', 'zh', 'fr' 等
  const lang = useLocale();

  // 获取翻译函数
  const t = useTranslations();

  return {
    t,        // 翻译函数，用于获取特定键的翻译
    lang    // 当前语言标识，如 'en', 'zh' 等
  };
}