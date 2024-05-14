export const placeOrder = async (
  checkoutId: string,
  payment: {
    paymentAmount: { amount: string; currencyCode: string };
    idempotencyKey: string;
    billingAddress: object;
    paymentData: string;
    test: boolean;
  },
) => {
  if (
    !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
    !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  ) {
    throw new Error(
      'Required environment variables are not set: Check SHOPIFY_HOST_NAME and SHOPIFY_STOREFRONT_ACCESS_TOKEN',
    );
  }

  const query = `
    mutation {
      checkoutCompleteWithTokenizedPaymentV2(checkoutId: "${checkoutId}", payment: {
        paymentAmount: ${JSON.stringify(payment.paymentAmount).replace(
          /"([^"]+)":/g,
          '$1:',
        )},
        idempotencyKey: "${payment.idempotencyKey}",
        billingAddress: ${JSON.stringify(payment.billingAddress).replace(
          /"([^"]+)":/g,
          '$1:',
        )},
        paymentData: "${payment.paymentData}",
        test: ${payment.test}
      }) {
        checkout {
          id
          webUrl
        }
        payment {
          id
          amountV2 {
            amount
            currencyCode
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql',
        'X-Shopify-Storefront-Access-Token':
          process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: query,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to place order: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
