'use client'

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLocaleClient } from '@lib/useLocaleClient';
import { useChangeLanguage } from '@lib/useChangeLang';
import { locales } from '@lib/config';

export function LanguageSelect() {
  const { lang: currentLanguage } = useLocaleClient()
  const handleLanguageChange = useChangeLanguage()

  return (
    <Select onValueChange={handleLanguageChange} defaultValue={currentLanguage}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(locales).map((locale) => (
          <SelectItem key={locale} value={locale}>
            {locales[locale as keyof typeof locales]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
