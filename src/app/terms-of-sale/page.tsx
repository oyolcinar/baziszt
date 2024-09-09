'use client';

import { useTranslation } from '../../../utils/useTranslation';

export default function TermsOfSalePage() {
  const { t } = useTranslation();

  return (
    <div className='mx-12 md:mx-4 my-36 flex justify-center items-center'>
      <div className='text-black font-futura w-full md:w-2/3'>
        <h1 className='text-4xl mb-8 text-bordeux text-center'>
          {t('termsOfSale')}
        </h1>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('vendorIdentification')}</h2>
          <p className='mb-4'>{t('vendorDetails')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('scopeAndAcceptance')}</h2>
          <p className='mb-4'>
            {t('purchaseOfProducts')} <strong>www.baziszt.com</strong>{' '}
            {t('websiteAndGTS')}
          </p>
          <p className='mb-4'>{t('productsAndCustomers')}</p>
          <p className='mb-4'>{t('updateGTS')}</p>
          <p className='mb-4'>
            {t('familiariseGTS')}{' '}
            <a
              href='https://www.baziszt.com/terms_of_sale'
              className='underline'
            >
              https://www.baziszt.com/terms_of_sale
            </a>
            . {t('applicableGTS')}
          </p>
          <p className='mb-4'>{t('acceptanceGTS')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('termsOfOrder')}</h2>
          <p className='mb-4'>{t('orderAcceptance')}</p>
          <p className='mb-4'>
            <strong>{t('orderProcess')}</strong>
          </p>
          <p className='mb-4'>{t('orderProcedure')}</p>
          <p className='mb-4'>
            <strong>{t('productChoice')}</strong> {t('productSelection')}
          </p>
          <p className='mb-4'>
            <strong>{t('checkingSelectionContent')}</strong>{' '}
            {t('checkingSelectionContent')}
          </p>
          <p className='mb-4'>
            <strong>{t('identification')}</strong>{' '}
            {t('customerIdentificationForm')}
          </p>
          <p className='mb-4'>
            <strong>{t('checkingCustomerOrder')}</strong>{' '}
            {t('customerOrderVerification')}
          </p>
          <p className='mb-4'>
            <strong>{t('orderAcknowledgementOfReceipt')}</strong>{' '}
            {t('emailOrderSummary')}
          </p>
          <ul className='list-disc pl-5 mb-4'>
            <li>{t('deliveryAndInvoicingAddresses')}</li>
            <li>{t('orderNumber')}</li>
            <li>{t('orderDate')}</li>
            <li>{t('orderedProductsList')}</li>
            <li>{t('deliveryMethod')}</li>
          </ul>
          <p className='mb-4'>{t('orderProof')}</p>
          <p className='mb-4'>
            <strong>{t('confirmationOfShipping')}</strong>{' '}
            {t('orderEmailSummary')}
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('section4ProductAvailability')}</h2>
          <p className='mb-4'>{t('offersValidity')}</p>
          <p className='mb-4'>{t('errorsOrModifications')}</p>
          <p className='mb-4'>{t('productUnavailable')}</p>
          <p className='mb-4'>{t('productChangeRight')}</p>
          <p className='mb-4'>{t('productQuantityLimit')}</p>
          <p className='mb-4'>{t('productPhotoDisclaimer')}</p>
          <p className='mb-4'>{t('orderRejectionClause')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('priceSectionTitle')}</h2>
          <p className='mb-4'>{t('priceDetails')}</p>
          <p className='mb-4'>{t('priceChangeNotice')}</p>
          <p className='mb-4'>{t('productInvoiceBasis')}</p>
          <p className='mb-4'>{t('orderPaymentTerms')}</p>
          <p className='mb-4'>{t('partialOrderDebited')}</p>
        </section>
        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            <strong>{t('meansOfPayment')}</strong>
          </h2>
          <p className='mb-4'>{t('paymentInstructions')}</p>

          <h3 className='text-xl mb-4 underline'>{t('paymentByCreditCard')}</h3>
          <p className='mb-4'>{t('creditCardPaymentDetails')}</p>

          <h3 className='text-xl mb-4 underline'>{t('paymentByApp')}</h3>
          <p className='mb-4'>{t('paymentByAppDetails')}</p>

          <h3 className='text-xl mb-4 underline'>{t('paymentByGiftCards')}</h3>
          <p className='mb-4 text-[darkOrange] italic'>
            {t('purchaseOfGiftCards')}
          </p>
          <p className='mb-4'>{t('giftCardsAvailability')}</p>
          <p className='mb-4'>{t('giftCardAmounts')}</p>
          <p className='mb-4'>{t('giftCardDelivery')}</p>
          <p className='mb-4'>{t('giftCardConditions')}</p>
          <p className='mb-4'>{t('giftCardDeactivation')}</p>

          <p className='mb-4 text-[darkOrange] italic'>
            {t('paymentWithGiftCards')}
          </p>
          <p className='mb-4'>{t('giftCardUsage')}</p>
          <p className='mb-4'>{t('giftCardPartialPayment')}</p>
          <p className='mb-4'>{t('giftCardRemainingAmount')}</p>

          <p className='mb-4 text-[darkOrange] italic'>
            {t('refundWithGiftCard')}
          </p>
          <p className='mb-4'>{t('refundWithGiftCardProcedure')}</p>
          <ol className='list-decimal pl-5 mb-4'>
            <li>{t('refundAllGiftCard')}</li>
            <li>
              {t('refundPartialGiftCard')}
              <ul className='list-disc pl-5'>
                <li>{t('refundGiftCardCredit')}</li>
                <li>{t('refundAdditionalPaymentMethod')}</li>
              </ul>
              {t('giftCardCreditValidity')}
            </li>
          </ol>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('reservationOfOwnership')}</h2>
          <p className='mb-4'>{t('productsOwnership')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('deliveryTerms')}</h2>
          <p className='mb-4'>{t('handlingShippingCosts')}</p>
          <p className='mb-4'>{t('customsResponsibility')}</p>
          <p className='mb-4'>{t('preparationTime')}</p>
          <p className='mb-4'>{t('preOrderShippingTime')}</p>
          <p className='mb-4'>{t('deliveryExceedingPeriod')}</p>
          <p className='mb-4'>{t('multipleDeliveries')}</p>
          <p className='mb-4'>{t('shippingMethod')}</p>
          <p className='mb-4'>{t('deliveryCompliance')}</p>
          <p className='mb-4'>{t('incompleteAddress')}</p>
          <p className='mb-4'>{t('deliveryTerms2')}</p>
          <p className='mb-4'>{t('undeliverableReturn')}</p>
          <p className='mb-4'>{t('returnClaim')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('rightOfWithdrawal')}</h2>
          <p className='mb-4'>{t('rightOfWithdrawalDetails')}</p>
          <p className='mb-4 text-[darkOrange]'>{t('returnShipmentFees')}</p>
          <p className='mb-4'>{t('returnProcedure')}</p>
          <p className='mb-4'>{t('parcelResponsibility')}</p>
          <p className='mb-4'>{t('parcelIdentification')}</p>
          <p className='mb-4'>{t('returnTracking')}</p>
          <p className='mb-4'>{t('returnReceiptConfirmation')}</p>
          <p className='mb-4'>{t('reimbursementPolicy')}</p>
          <p className='mb-4'>{t('deliveryCostReimbursement')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('statutoryWarranties')}</h2>
          <p className='mb-4'>{t('warrantyConditions')}</p>
          <p className='mb-4'>{t('productComplaintRefusal')}</p>
          <p className='mb-4'>{t('productComplaintSubmission')}</p>
          <h3 className='text-xl mb-4'>
            <strong>{t('warrantyOfConformity')}</strong>
          </h3>
          <p className='mb-4'>{t('warrantyOfConformityDetails')}</p>
          <h3 className='text-xl mb-4'>
            <strong>{t('warrantyAgainstHiddenDefects')}</strong>
          </h3>
          <p className='mb-4'>{t('warrantyAgainstHiddenDefectsDetails')}</p>
          <p className='mb-4'>{t('warrantyTimeframe')}</p>
          <p className='mb-4'>{t('conformityDefectsPresumption')}</p>
          <p className='mb-4'>{t('nonConformityOptions')}</p>
          <p className='mb-4'>{t('hiddenDefectOptions')}</p>
          <p className='mb-4'>{t('customerProofOfGuarantee')}</p>
          <p className='mb-4'>{t('returnReplacementReimbursement')}</p>
          <p className='mb-4'>{t('returnProcedureWithNumber')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('afterSalesService')}</h2>
          <p className='mb-4'>{t('repairService')}</p>
          <p className='mb-4'>{t('sparePartsAvailability')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('limitationOfLiability')}</h2>
          <p className='mb-4'>{t('liabilityExclusion')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('personalData')}</h2>
          <p className='mb-4'>
            {t('customerRegistration')}
            <strong>www.baziszt.com</strong>
            {t('personalInformationCollection')}
          </p>
          <p className='mb-4'>
            {t('orderProcess2')}
            <strong>www.baziszt.com</strong>
            {t('customerAccountCreation')}
          </p>
          <p className='mb-4'>{t('dataProtectionCommitments')}</p>
          <p className='mb-4'>{t('customerDataRights')}</p>
          <p className='mb-4'>{t('optInMarketing')}</p>
          <p className='mb-4'>{t('cookieUsage')}</p>
          <p className='mb-4'>{t('dataPolicyAccess')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('intellectualProperty')}</h2>
          <p className='mb-4'>
            {t('intellectualPropertyContent')}
            <strong>www.baziszt.com</strong>
            {t('intellectualPropertyRights')}
          </p>
          <p className='mb-4'>{t('intellectualPropertyOwnership')}</p>
          <p className='mb-4'>{t('intellectualPropertyAcknowledgement')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>14. FORCE MAJEURE</h2>
          <p className='mb-4'>{t('forceMajeureDefinition')}</p>
          <p className='mb-4'>{t('forceMajeureDetails')}</p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>{t('governingLawDisputes')}</h2>
          <p className='mb-4'>{t('governingLaw')}</p>
          <p className='mb-4'>{t('disputeResolution')}</p>
          <p className='mb-4'>
            {t('mediationProcedure')}{' '}
            <a href='https://www.cmap.fr' className='underline'>
              www.cmap.fr
            </a>
            {t('mediationContact')}{' '}
            <a href='mailto:consommation@cmap.fr' className='underline'>
              consommation@cmap.fr
            </a>
            {t('mediationRequestDetails')}
          </p>
          <p className='mb-4'>{t('disputeRegulation')}</p>
          <ul className='list-disc pl-5 mb-4'>
            <li>{t('customerCourtChoice')}</li>
            <li>{t('bazisztCourtChoice')}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
