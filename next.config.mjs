import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts");

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // !! 警告 !!
    // 禁用类型检查可能会导致生产环境中出现意外错误
    // 请谨慎使用此选项
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
