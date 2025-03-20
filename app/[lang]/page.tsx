import ClientPage from './ClientPage'
import { baseMetadata, genOpenGraphByLangActor, genTwitterByLangActor } from '../lib/config'
import type { Metadata, ResolvingMetadata, Viewport } from 'next'
import { useLocaleServer } from '@lib/useLocaleServer'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const lang = params?.lang || 'en'
  const { t } = useLocaleServer(lang)

  return {
    ...baseMetadata,
    title: t('site.title') + ' | ' + t('site.runner_title'),
    description: t('meta_desc'),
    keywords: t('meta_keywords'),
    openGraph:  genOpenGraphByLangActor(t, lang),
    twitter: genTwitterByLangActor(t),
  }
}

export default async function Page() {
  return <ClientPage />
}
