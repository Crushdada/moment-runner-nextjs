import { useRouter, usePathname } from 'next/navigation'

export const useChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (newLang: string) => {
    const pathWithoutLang = pathname.replace(/^\/([a-z]{2}(-[A-Z]{2})?)/,'');
    const newPath = `/${newLang}${pathWithoutLang}`;
    router.push(newPath);
  };
};