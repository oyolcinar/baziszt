'use client';

import { useTranslation } from '../../../utils/useTranslation';

export default function PrivacyPolicyPage() {
  const { t } = useTranslation();
  return (
    <div className='mx-12 md:mx-4 my-36 flex justify-center items-center'>
      <div className='text-black font-futura w-full md:w-2/3'>
        <h1 className='text-4xl mb-8 text-bordeux text-center'>
          {t('privacyPolicy')}
        </h1>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('controller1')}</h2>
          <p className='mb-4'>{t('controller1_1')}</p>
          <p className='mb-4'>{t('controller1_2')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('personalDataProcessing2')}</h2>
          <p className='mb-4'>{t('personalDataProcessing2_1')}</p>
          <p className='mb-4'>{t('personalDataProcessing2_2')}</p>
          <p className='mb-4'>{t('personalDataProcessing2_3')}</p>
          <p className='mb-4'>{t('personalDataProcessing2_4')}</p>
          <p className='mb-4'>{t('personalDataProcessing2_5')}</p>
          <p className='mb-4'>{t('personalDataProcessing2_6')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('purposesOfPersonalDataProcessing3')}
          </h2>
          <p className='mb-4'>{t('purposesOfPersonalDataProcessing3_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('personalDataLikelyToBeProcessed4')}
          </h2>
          <p className='mb-4'>{t('personalDataLikelyToBeProcessed4_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('consent5')}</h2>
          <p className='mb-4'>{t('consent5_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('durationOfPersonalDataStorage6')}
          </h2>
          <p className='mb-4'>{t('durationOfPersonalDataStorage6_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('communicationOfUsersPersonalData7')}
          </h2>
          <p className='mb-4'>{t('personalDataProvidedToEmployees7_1')}</p>
          <p className='mb-4'>{t('bazisztEnsuresProtection7_2')}</p>
          <p className='mb-4'>{t('personalDataDisclosedToProviders7_3')}</p>
          <p className='mb-4'>{t('dataNotTransferredToThirdCountry7_4')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('usersRights8')}</h2>
          <p className='mb-4'>{t('fairAndLawfulProcessing8_1')}</p>
          <p className='mb-4'>{t('rightToAccessPersonalData8_2')}</p>
          <p className='mb-4'>{t('rightToObtainInformationGDPR8_3')}</p>
          <ul className='list-disc pl-5 mb-4'>
            <li>{t('purposesOfProcessing8_3_1')}</li>
            <li>{t('categoriesOfPersonalData8_3_2')}</li>
            <li>{t('recipientsOfPersonalData8_3_3')}</li>
            <li>{t('dataStoragePeriod8_3_4')}</li>
            <li>{t('automatedDecisionMaking8_3_5')}</li>
          </ul>
          <p className='mb-4'>{t('rightToAccessPersonalData8_3')}</p>
          <p className='mb-4'>{t('rectificationOfData8_4')}</p>
          <p className='mb-4'>{t('rightToDeletion8_5')}</p>
          <p className='mb-4'>{t('rightToRestrictionOfProcessing8_4')}</p>
          <p className='mb-4'>{t('restrictionOfProcessingConditions8_5')}</p>
          <p className='mb-4'>{t('rightToDataPortability8_5')}</p>
          <p className='mb-4'>{t('rightToReceiveData8_6')}</p>
          <p className='mb-4'>{t('rightToTransmitData8_7')}</p>
          <p className='mb-4'>{t('rightToObjectProcessing8_6')}</p>
          <p className='mb-4'>{t('rightToObjectConditions8_7')}</p>
          <p className='mb-4'>{t('rightToLodgeComplaint8_7')}</p>
          <p className='mb-4'>{t('rightToLodgeComplaintWithCNIL8_8')}</p>
          <p className='mb-4'>{t('exerciseOfRights8_8')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('processorsLimitationOfLiability9')}
          </h2>
          <p className='mb-4'>{t('thirdPartyWebsitesLiability9_1')}</p>
          <p className='mb-4'>{t('bazisztNoLiabilityForLoss9_2')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            {t('usersDataModificationProcess10')}
          </h2>
          <p className='mb-4'>{t('modifyPersonalData10_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>11. COOKIES</h2>
          <p className='mb-4'>{t('cookiesUsage11_1')}</p>
          <p className='mb-4'>{t('cookieSettings11_2')}</p>
          <p className='mb-4'>{t('userIDTracking11_3')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('privacyPolicyModification12')}</h2>
          <p className='mb-4'>{t('privacyPolicyRightToModify12_1')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('cookieList12_2')}</h2>
          <p className='mb-4'>{t('cookieDefinition12_3')}</p>

          <h3 className='text-xl mb-4'>
            {t('necessaryCookiesForStoreFunctioning12_4')}
          </h3>
          <table className='w-full text-left mb-4'>
            <thead>
              <tr>
                <th className='border-b-2 border-black p-2'>
                  {t('cookieName12_5')}
                </th>
                <th className='border-b-2 border-black p-2'>
                  {t('cookieFunction12_6')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b border-black p-2'>_ab</td>
                <td className='border-b border-black p-2'>
                  {t('usedForAdminAccess12_7')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>
                  _secure_session_id
                </td>
                <td className='border-b border-black p-2'>
                  {t('usedForStorefrontNavigation12_8')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>cart</td>
                <td className='border-b border-black p-2'>
                  {t('usedForShoppingCart12_9')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>cart_sig</td>
                <td className='border-b border-black p-2'>
                  {t('usedForCheckout12_10')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>cart_ts</td>
                <td className='border-b border-black p-2'>
                  {t('usedForCheckout12_10')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>checkout_token</td>
                <td className='border-b border-black p-2'>
                  {t('usedForCheckout12_10')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>secret</td>
                <td className='border-b border-black p-2'>
                  {t('usedForCheckout12_10')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>
                  secure_customer_sig
                </td>
                <td className='border-b border-black p-2'>
                  {t('usedForCustomerLogin12_11')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>storefront_digest</td>
                <td className='border-b border-black p-2'>
                  {t('usedForCustomerLogin12_11')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_u</td>
                <td className='border-b border-black p-2'>
                  {t('usedForUpdatingCustomerInfo12_12')}
                </td>
              </tr>
            </tbody>
          </table>

          <h3 className='text-xl mb-4'>
            {t('performanceAndTargetingCookies12_13')}
          </h3>
          <table className='w-full text-left'>
            <thead>
              <tr>
                <th className='border-b-2 border-black p-2'>
                  {t('cookieName12_5')}
                </th>
                <th className='border-b-2 border-black p-2'>
                  {t('cookieFunction12_6')}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border-b border-black p-2'>_tracking_consent</td>
                <td className='border-b border-black p-2'>
                  {t('trackingPreferences12_14')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_landing_page</td>
                <td className='border-b border-black p-2'>
                  {t('trackLandingPages12_15')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_orig_referrer</td>
                <td className='border-b border-black p-2'>
                  {t('trackLandingPages12_15')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_s</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyAnalytics12_16')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_fs</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyAnalytics12_16')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_s</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyAnalytics12_16')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_sa_p</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyMarketingAndReferralsAnalytics12_17')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_sa_t</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyMarketingAndReferralsAnalytics12_17')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_shopify_y</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyAnalytics12_16')}
                </td>
              </tr>
              <tr>
                <td className='border-b border-black p-2'>_y</td>
                <td className='border-b border-black p-2'>
                  {t('shopifyAnalytics12_16')}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
