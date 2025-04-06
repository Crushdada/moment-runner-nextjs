<!-- markdownlint-disable -->

Next.js beginner ? see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

# Next.js 国际化模板项目

这是一个基于 Next.js App Router 的多语言项目模板,集成了路由级别的国际化方案、SEO 优化等特性。

## 特性

- 📖 基于路由的国际化解决方案
- 🔍 完整的 SEO 配置 (metadata、sitemap、robots)
- 🌐 支持多语言切换
- 🎯 服务端/客户端组件国际化支持
- ⚡️ 中间件自动语言重定向

## 目录结构

![alt text](image.png)

## 开始使用

1. 克隆项目

```bash
git clone [repository-url]
```

2. 安装依赖

```bash
pnpm install
```

3. 运行开发服务器

```bash
pnpm run dev
```


## 如何使用

### 添加新语言

1. 在 `messages/` 目录下添加新的语言文件,如 `fr.json`
2. 在 `lib/config.ts` 中的 `locales` 对象添加新语言配置

### 在组件中使用国际化

服务端组件:

```tsx
import { useLocaleServer } from '@lib/useLocaleServer'
  export default function Component() {
  const { t } = useLocaleServer()
  return <div>{t('key')}</div>
}
```

客户端组件:

```tsx
import { useLocaleClient } from '@lib/useLocaleClient'
  export default function Component() {
  const { t } = useLocaleClient()
  return <div>{t('key')}</div>
}
```

### 语言切换

```
见 components/language-select.tsx 组件
```


### SEO 配置

在页面组件中配置 metadata:

```
tsx
export async function generateMetadata({ params }) {
  const { t, lang } = await useLocaleServer();

  return {
    ...baseMetadata,
    title: t('site.title'),
    description: t('meta_desc'),
    openGraph: genOpenGraphByLangActor(t, lang),
    twitter: genTwitterByLangActor(t),
  }
}
```

### robots 配置

在 `app/robots.ts` 中配置 robots 规则

```ts
import { MetadataRoute } from 'next'
import { baseUrl } from '@lib/config'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```
