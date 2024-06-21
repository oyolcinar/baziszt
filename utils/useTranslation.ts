import { useLanguage } from '@/app/context/LanguageContext';
import resources from './resources';

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const translation = resources[key];
    if (!translation) {
      return key;
    }
    return translation[language] || key;
  };

  return { t };
};
