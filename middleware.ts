import createMiddleware from "next-intl/middleware";
import { defaultLang, languages} from "@lib/config";

export default createMiddleware({
  locales: languages,
  defaultLocale: defaultLang,
  // 添加这个配置来防止重定向
  localePrefix: "as-needed",
  // localeDetection: false, // 禁用自动检测用户语言
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
};