import type { Metadata } from 'next'

export const baseUrl = 'https://momentjs-runner.netlify.app'
export const siteName = 'Moment.js Playground'
export const locales = {
  ar: 'العربية',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  id: 'Bahasa Indonesia',
  ja: '日本語',
  pt: 'Português',
  ru: 'Русский',
  'zh-CN': '中文'
};

const languages = Object.keys(locales).reduce((acc: any, lang: string) => {
  if (lang === 'en') return acc
  acc[lang] = `${baseUrl}/${lang}`
  return acc
}, {});

export const baseMetadata: Metadata = {
  metadataBase: new URL(baseUrl),

  // 机器人元标记
  robots: {
    index: true,
    follow: true,
  },

  // 备用语言链接
  alternates: {
    canonical: `${baseUrl}/en`,
    languages: {
      ...languages,
      'x-default': `${baseUrl}/en`,
    },
  },

  // 其他元数据
  generator: 'Next.js',
  applicationName: siteName,
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Crushdada' }],
  creator: 'Crushdada',
  publisher: 'Crushdada',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

   // 图标, https://realfavicongenerator.net/
   icons: {
    // 基础 favicon
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },  // 传统 favicon
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },  // 为搜索引擎特别指定的大尺寸图标
      { url: '/favicon.svg', type: 'image/svg+xml' },  // 现代浏览器的矢量图标
    ],
    // // Apple 设备图标
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      // { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      // { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
    ],
    // // 其他设备的图标
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon.png'  // Android Chrome
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: '/favicon-96x96.png'  // Android Chrome
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/web-app-manifest-192x192.png'  // Android Chrome
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/web-app-manifest-512x512.png'  // PWA 图标
      }
    ]
  },

}

// 开放图谱
export const genOpenGraphByLangActor = (t: Function, lang: string) => {
  return  {
    title: t('site.title'),
    description: t('meta_desc'),
    url: baseUrl,
    siteName: siteName,
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png', // Must be an absolute URL
    //     width: 800,
    //     height: 600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: lang,
    type: 'website',
  }
}

export const genTwitterByLangActor = (t: Function) => {
  return  {
    card: 'summary_large_image',
    title: t('site.title'),
    description: t('meta_desc'),
    // images: {
    //   url: `${baseUrl}/og-image.png`,
    //   alt: `${siteName} Screenshot`,
    // },
  }
}