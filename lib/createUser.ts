export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
) => {
  if (
    !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
    !process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN
  ) {
    throw new Error(
      'Required environment variables are not set: Check SHOPIFY_HOST_NAME and SHOPIFY_ADMIN_API_ACCESS_TOKEN',
    );
  }

  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/admin/api/2024-04/customers.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token':
          process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        customer: {
          email,
          first_name: firstName,
          last_name: lastName,
          verified_email: true,
          send_email_welcome: false,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to create user: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};
