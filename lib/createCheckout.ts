const createCheckout = async (
  lineItems: Array<{ variantId: string; quantity: number }>,
): Promise<string> => {
  const query = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`;

  const variables = {
    input: {
      lineItems,
    },
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token':
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
  };

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/api/2024-04/graphql.json`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to create checkout');
  }

  const json = await response.json();
  if (json.data.checkoutCreate.checkoutUserErrors.length > 0) {
    throw new Error(json.data.checkoutCreate.checkoutUserErrors[0].message);
  }

  return json.data.checkoutCreate.checkout.webUrl;
};

export default createCheckout;
