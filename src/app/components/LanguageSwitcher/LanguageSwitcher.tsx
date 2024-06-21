import React from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { useTranslation } from '../../../../utils/useTranslation';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const { t } = useTranslation();

  return (
    <div className='text-base font-futura text-black flex flex-row gap-2'>
      <div>{t('language')}</div>
      <button
        onClick={() => setLanguage('en')}
        disabled={language === 'en'}
        className='cursor-pointer hover:opacity-70 transition duration-300'
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('fr')}
        disabled={language === 'fr'}
        className='cursor-pointer hover:opacity-70 transition duration-300'
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
