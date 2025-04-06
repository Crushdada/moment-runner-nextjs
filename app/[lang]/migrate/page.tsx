import MigrateClient from './MigrateClient'
import { baseMetadata, genOpenGraphByLangActor, genTwitterByLangActor, locales, baseUrl,
  languagesWithoutDefault
 } from '@lib/config'
import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import { useLocaleServer } from '@lib/useLocaleServer'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const languages = languagesWithoutDefault.reduce((acc: any, lang: string) => {
  acc[lang] = `${baseUrl}/${lang}/migrate`
  return acc
}, {});

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { t, lang } = await useLocaleServer();


  return {
    ...baseMetadata,
    title: t('site.title') + ' | ' + t('migrate.title'),
    description: t('migrate.meta_desc'),
    keywords: t('migrate.meta_keywords'),
    openGraph:  genOpenGraphByLangActor(t, lang),
    twitter: genTwitterByLangActor(t),
    alternates: {
      canonical: `${baseUrl}/en/migrate`,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en/migrate`,
      },
    },
  }
}

export default function MigratePage() {
  return <MigrateClient />
}