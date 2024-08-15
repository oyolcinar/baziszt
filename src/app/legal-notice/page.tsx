'use client';
import { useTranslation } from '../../../utils/useTranslation';

export default function LegalNoticePage() {
  const { t } = useTranslation();

  return (
    <div className='mx-12 md:mx-4 my-36 flex justify-center items-center'>
      <div className='text-black font-futura w-full md:w-1/2'>
        <h1 className='text-4xl mb-8 text-bordeux text-center'>
          {t('legalNotice')}
        </h1>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('publisher')}</h2>
          <p className='mb-4'>{t('legalNoticeContent')}</p>
          <p className='mb-4'>
            {t('email')}:{' '}
            <a href='mailto:together@baziszt.com' className='underline'>
              together@baziszt.com
            </a>
          </p>
          <p>
            {t('editorInChief')}: <strong>Zied Ben Amor</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
