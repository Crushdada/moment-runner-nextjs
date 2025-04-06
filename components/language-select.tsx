'use client'

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocale } from "next-intl";
import { locales, languages } from '@lib/config';
import { useRouter, usePathname } from "@i18n/routing";

export function LanguageSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // 获取当前路径

  const handleLanguageChange = (localeKey: string) => {
    // 如果已经是当前语言，不做任何操作
    if (locale === localeKey) return;

    // 使用router进行导航
    router.replace(pathname, { locale: localeKey });
  };

  return (
    <Select defaultValue={locale}
    onValueChange={handleLanguageChange}
    >
      <SelectTrigger className="w-[130px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((localeKey) => (
          <SelectItem key={localeKey} value={localeKey}>
            {locales[localeKey as keyof typeof locales]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
