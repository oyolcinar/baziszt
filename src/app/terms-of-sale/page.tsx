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
          <p className='mb-4'>
            BAZISZT cannot be held responsible in the event of loss, theft or
            damage of the parcel.
          </p>
          <p className='mb-4'>
            Parcels for which the Customer’s identification (surname, first
            name, address and return code) is not possible shall be refused.
          </p>
          <p className='mb-4'>
            Any return must be made by a traceable method (UPS, FEDEX, DHL,
            return receipt requested, etc.) and the tracking number must be
            provided to BAZISZT.
          </p>
          <p className='mb-4'>
            On receipt of the Product returned by the Customer, the customer
            service shall send a confirmation of receipt of the Product by
            e-mail.
          </p>
          <p className='mb-4'>
            In the event the Customer makes a valid use of this right by the
            Customer, BAZISZT shall reimburse the Customer for the sums paid by
            the same and corresponding to the acquisition of the returned
            Products (therefore excluding potential customs duties), within a
            maximum period of 14 days by bank transfer into the account used
            with the credit card bearing the Customer’s name.
          </p>
          <p className='mb-4'>
            BAZISZT undertakes to reimburse the standard delivery costs
            including the tracking of the parcel. For that purpose, Customer
            shall insert the delivery invoice indicating the parcel tracking
            number into the return parcel.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>9. STATUTORY WARRANTIES</h2>
          <p className='mb-4'>
            The Products sold by BAZISZT are subject to the conditions of
            statutory warranties provided by Articles L.217-4 to L.217-14 of the
            Consumer Code as well as by Articles 1641 through 1648 of the Civil
            Code, to the exclusion of any other warranties.
          </p>
          <p className='mb-4'>
            BAZISZT shall refuse any complaint for Products that have been used
            contrary to their intended use.
          </p>
          <p className='mb-4'>
            Any complaint regarding the Products in their current form and
            without relation to the delivery must be submitted by e-mail to the
            address together@baziszt.com followed by a written confirmation sent
            by registered letter with acknowledgement of receipt to the customer
            service at the following address BAZISZT – 13 RUE LA BOETIE, 75008
            PARIS 8, FRANCE.
          </p>
          <h3 className='text-xl mb-4'>
            <strong>Statutory warranty of conformity:</strong>
          </h3>
          <p className='mb-4'>
            BAZISZT shall deliver to the Customer a Product that complies with
            the contract and which is exempt from conformity defects at the time
            of the delivery of said Product, to the extent that the Product
            shall be fit for the use normally expected of similar goods and that
            it shall have the characteristics featured during the sale. BAZISZT
            is also liable for conformity defects resulting from the packaging,
            assembly or installation instructions provided such liability as
            agreed by contract or such processes where made under its
            responsibility.
          </p>
          <h3 className='text-xl mb-4'>
            <strong>Statutory warranty against hidden defects:</strong>
          </h3>
          <p className='mb-4'>
            BAZISZT shall ship to the Customer a Product free of hidden defects
            that would make it unfit for the use for which it was intended, or
            that substantially decreases this use, that he/she/it would not have
            acquired it or would have paid a lower price if he/she/it had been
            aware of them.
          </p>
          <p className='mb-4'>
            These guarantees shall apply provided that the Customer makes the
            request in a period of 24 months following the delivery of the
            Product (for the statutory warranty of conformity) or the discovery
            of the defect (for the statutory warranty of hidden defects).
          </p>
          <p className='mb-4'>
            Conformity defects that appear within a period of 24 months from
            delivery are presumed to exist at the time of delivery, unless
            proven otherwise.
          </p>
          <p className='mb-4'>
            In the event of an actual non-conformity on a Product sold by
            BAZISZT, the Customer may choose between the Product being repaired
            or replaced unless one of these choices are commercially
            unreasonable for BAZISZT. If the repair or the replacement of the
            Product is impossible, the Customer may be reimbursed and shall
            return the Product or keep the Product and have a part of the price
            reimbursed to him/her/it, unless the conformity defect is minor.
          </p>
          <p className='mb-4'>
            In the event of an actual hidden defect on a Product sold by
            BAZISZT, the Customer shall have the choice of returning the Product
            and having the price and costs incurred by the sale returned or
            keeping the Product and having a part of the price returned to
            him/her/it.
          </p>
          <p className='mb-4'>
            In any event, it shall be up to the Customer to prove that he/she/it
            fulfils the conditions of the guarantee properly.
          </p>
          <p className='mb-4'>
            The return, replacement or reimbursement of the Product shall occur
            without costs for the Customer and shall not prevent the potential
            damages where applicable.
          </p>
          <p className='mb-4'>
            In the case of lack of conformity and/or hidden defects admitted by
            BAZISZT, should the Customer choose to return the Product, he/she/it
            shall ship it to the following address: BAZISZT – customer service -
            13 RUE LA BOETIE, 75008 PARIS 8, FRANCE. The Customer must obtain
            beforehand a return number as well as any precision relating to
            shipping from the customer service to be contacted via e-mail at
            together@baziszt.com No parcel shall be accepted without a return
            number. This number must be written legibly with a marker pen on the
            parcel.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>
            10. AFTER-SALES SERVICE AND AVAILABILITY OF SPARE PARTS
          </h2>
          <p className='mb-4'>
            Any Product that can be technically repaired benefits from an
            after-sales service for a fee. For any repair request, the Customer
            must directly contact the customer service via the e-mail at:
            together@baziszt.com.
          </p>
          <p className='mb-4'>
            In accordance with Article L 111-3 paragraph 1 of the French
            Consumer Code, BAZISZT makes no warranty regarding the availability
            period of spare parts that are essential for the use of the
            Products. BAZISZT shall nonetheless make its best efforts to satisfy
            its Customers in the event of a request for one or several spare
            parts.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>11. LIMITATION OF LIABILITY</h2>
          <p className='mb-4'>
            In no event may BAZISZT be held liable for any damage which does not
            result from a failure by BAZISZT to honour one of its obligations.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>12. PERSONAL DATA</h2>
          <p className='mb-4'>
            When the Customer registers on the <strong>www.baziszt.com</strong>,
            BAZISZT collects personal information (personal data, e-mail
            address, gender, etc.) via the registration form in order to offer
            him/her/it accessible services in the reserved access areas of
            BAZISZT. The filling in of personal information concerning him is
            essential for the processing and delivery of his/her/its orders.
          </p>
          <p className='mb-4'>
            The order process on the <strong>www.baziszt.com</strong> Website
            requires the creation of a Customer account in which his/her/its
            information is stored and protected by a password chosen by the
            Customer. This information is strictly confidential and intended for
            BAZISZT exclusively. It shall be processed in strict compliance with
            the provisions of Data Protection Act No. 78-17 of 6 January 1978
            and the regulation (EU) 2016/679, general regulation on data
            protection.
          </p>
          <p className='mb-4'>
            In this respect BAZISZT notably undertakes to: (i) guarantee the
            confidentiality of data of a personal nature processed in the
            framework hereof by implementing the appropriate security measures
            in its field of activity, (ii) ensure that the persons authorised to
            process the data of a personal nature in virtue hereof undertake to
            respect the confidentiality or are subject to an appropriate legal
            obligation of confidentiality and receive the necessary training
            regarding protection of data of a personal nature, and (iii) that
            its potential subcontractors respect the legal obligations on behalf
            of and according to the instructions of BAZISZT.
          </p>
          <p className='mb-4'>
            The Customer shall at all times have a right of access, amendment,
            rectification and deletion of his/her/its data. To exercise this
            right, he/she/it may present a request to BAZISZT by e-mail to the
            address together@baziszt.com or by letter to the following address:
            BAZISZT - 13 RUE LA BOETIE, 75008 PARIS 8, FRANCE.
          </p>
          <p className='mb-4'>
            Subject to validation by an “opt-in” of the Customer, personal
            information (personal data, e-mail address, gender, etc.) can also
            be used by BAZISZT and/or its partners for marketing purposes like
            the sending of newsletters or requests.
          </p>
          <p className='mb-4'>
            The Website uses cookies in order to best satisfy and customise the
            Customer’s requirements. The purpose of the cookie is to indicate
            that you have visited the Website.
          </p>
          <p className='mb-4'>
            The personal data management policy of BAZISZT can be accessed on
            the Website.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>13. INTELLECTUAL PROPERTY</h2>
          <p className='mb-4'>
            All documents, information, texts, graphs, images, photographs or
            any other content published on the <strong>www.baziszt.com</strong>{' '}
            Website are the exclusive property of BAZISZT. Consequently, they
            may not be reproduced, exploited or used for any purpose whatsoever,
            without the express authorisation of the publication manager.
          </p>
          <p className='mb-4'>
            BAZISZT is the owner of all the intellectual property (with the
            exception of authors’ moral rights) pertaining to Products and
            distinctive trademarks and signs under which the Products are
            marketed.
          </p>
          <p className='mb-4'>
            The Customer acknowledges without reservations the intellectual
            property rights of BAZISZT and undertakes not to infringe them in
            any manner howsoever. More specifically, the Customer expressly
            undertakes not to manufacture, sell, provide a licence or market in
            any manner howsoever, directly or through a third party, for its
            benefit or the benefit of a third party, the Products, imitations or
            reproductions of the Products or the intellectual property rights
            pertaining to the Products and trademarks belonging to BAZISZT.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>14. FORCE MAJEURE</h2>
          <p className='mb-4'>
            &quot;Force majeure&quot; means all external unforeseeable and
            unavoidable circumstances, beyond the reasonable control of the
            party which is suffering a force majeure case.
          </p>
          <p className='mb-4'>
            In the situation where BAZISZT is prevented or delayed by a force
            majeure case in honouring its commitments, BAZISZT undertakes to
            inform the Customer within 96 hours by specifying the exact elements
            constituting the force majeure, the reasonably foreseeable period of
            delay or prevention. BAZISZT shall then be exempt from the liability
            in connection with the non-performance or delay in performance of
            its obligations but undertakes to use its best efforts to resume
            full performance without further delay. In such a case of force
            majeure, BAZISZT may exercise its discretionary right to terminate
            the order or any part thereof, without being held liable, except
            however that BAZISZT shall be responsible to reimburse the Customer
            for any amounts already paid. In no event shall the Customer invoke
            a case of force majeure to release himself/herself/itself even
            temporarily from an obligation to pay a sum of money.
          </p>
        </section>

        <section className='mb-6'>
          <h2 className='text-2xl mb-4'>15. GOVERNING LAW – DISPUTES</h2>
          <p className='mb-4'>
            These GTS shall be governed and interpreted in accordance with
            French law. The language of this contract is French.
          </p>
          <p className='mb-4'>
            In the event of a dispute the French courts shall have sole
            jurisdiction. However, in accordance with Regulation CE 593/2008 of
            the 17 June 2008, these GTS do not prevent the application of a more
            favourable mandatory non-waivable provisions to the Customer, and as
            may applicable based on the Customer’s normal place of residence.
          </p>
          <p className='mb-4'>
            In the event of a dispute arising in connection with the performance
            and/or the interpretation of these GTS, the Customer may submit such
            dispute to a contractually-agreed mediation procedure or any other
            alternative dispute resolution procedure. Pursuant to Ordinance No.
            2015-1033 of 20 August 2015 and to the application decree No.
            2015-1382 of 30 October 2015, any consumer dispute or litigation,
            subject to Article L.612-2 of the Consumer Code, may be the subject
            of an amicable settlement by mediation through the CMAP - Paris
            Centre of Mediation and Arbitration. In order to bring a complaint
            before the mediator, the Customer may (i) fill in the form on the
            CMAP website{' '}
            <a href='https://www.cmap.fr' className='underline'>
              www.cmap.fr
            </a>
            , tab “you are: a consumer”, (ii) send his/her/its request by first
            class mail or registered letter to: CMAP - Médiation Consommation,
            39 avenue Franklin D. Roosevelt, 75008 PARIS, or (iii) send an
            e-mail to{' '}
            <a href='mailto:consommation@cmap.fr' className='underline'>
              consommation@cmap.fr
            </a>
            . Irrespective of the means used to contact CMAP, the Customer’s
            request must contain the following elements in order to be processed
            rapidly: his/her/its postal address, e-mail address and telephone
            number, as well as the full name and address of BAZISZT, a clear
            statement of the facts, and proof of previous steps taken with
            BAZISZT.
          </p>
          <p className='mb-4'>
            Notwithstanding the foregoing, in the case of a dispute, in
            accordance with Regulation No. 1215/2012 of 12 December 2012:
          </p>
          <ul className='list-disc pl-5 mb-4'>
            <li>
              The Customer may bring the matter before the competent court of
              his/her/its domicile or the French courts,
            </li>
            <li>
              BAZISZT may bring the matter before the court of the Customer’s
              domicile.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
