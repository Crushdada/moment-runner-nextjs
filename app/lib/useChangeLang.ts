// import { useRouter, usePathname } from '@i18n/routing';
// import { locales } from '@lib/config';

// export function useChangeLang() {
//   const router = useRouter();
//   const pathname = usePathname();

//   const changeLang = (lang: keyof typeof locales) => {
//     router.replace(pathname, { locale: lang });
//   };

//   return changeLang;
// }