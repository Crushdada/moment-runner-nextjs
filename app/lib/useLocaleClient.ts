import { useParams } from 'next/navigation';
import { useLocaleByLang } from './useLocaleByLang';

export function useLocaleClient() {
  const params = useParams();
  const lang = params?.lang as string;
  return useLocaleByLang(lang)
}