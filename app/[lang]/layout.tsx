
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { ThemeProvider } from "next-themes";
import Header from "../ui/header";
import { Analytics } from "@vercel/analytics/react";
import Script from 'next/script'

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
