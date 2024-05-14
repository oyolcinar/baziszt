export const createCart = async (
  lineItems: Array<{ variantId: string; quantity: number }>,
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
      checkoutCreate(input: {
        lineItems: ${JSON.stringify(lineItems).replace(/"([^"]+)":/g, '$1:')}
      }) {
        checkout {
          id
          webUrl
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
      `Failed to create cart: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
