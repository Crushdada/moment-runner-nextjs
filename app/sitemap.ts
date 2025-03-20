import type { MetadataRoute } from 'next'
import { locales, baseUrl } from '@lib/config'


export default function sitemap(): MetadataRoute.Sitemap {
  // 支持的语言列表
  const languages = Object.keys(locales)
  // 需要生成sitemap的路由路径
  const routes = ['', '/migrate']
  const sitemap: MetadataRoute.Sitemap = []
  // 为每个语言生成对应的路由
  languages.forEach(lang => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemap
}