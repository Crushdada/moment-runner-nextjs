
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { ThemeProvider } from "next-themes";
import Header from "../ui/header";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script'
import { defaultLang } from "../lib/config";
import { NextIntlClientProvider } from "next-intl";
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
  const { t, lang } = await useLocaleServer()

  return {
    ...baseMetadata,
    title: t('site.title') + ' | ' + t('site.runner_title'),
    description: t('meta_desc'),
    keywords: t('meta_keywords'),
    openGraph:  genOpenGraphByLangActor(t, lang),
    twitter: genTwitterByLangActor(t),
  }
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {

  let messages;
  try {
    messages = (await import(`../../messages/${lang}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/${defaultLang}.json`)).default;
  }

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <ThemeProvider attribute="class">
            <Header />
            {children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
