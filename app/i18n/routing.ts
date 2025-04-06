import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { defaultLang, locales } from "../lib/config";

const langs = Object.keys(locales)
export const routing = defineRouting({
  locales: langs,  // 支持的语言
  defaultLocale: defaultLang,    // 默认语言
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);