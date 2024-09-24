import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
      !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    ) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 },
      );
    }

    const query = `
      mutation {
        customerAccessTokenCreate(input: {email: "${email}", password: "${password}"}) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    console.log('Attempting to log in customer...');
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
      console.error(
        `Failed to log in user: ${response.status} ${response.statusText}`,
      );
      throw new Error(
        `Failed to log in user: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log('Response from Shopify:', data);

    const userErrors = data.data.customerAccessTokenCreate?.userErrors || [];
    if (userErrors.length > 0) {
      console.error('User Errors:', userErrors);
      return NextResponse.json(
        { error: userErrors[0].message },
        { status: 400 },
      );
    }

    const accessToken =
      data.data.customerAccessTokenCreate?.customerAccessToken;
    if (!accessToken) {
      console.error('No access token returned from Shopify');
      return NextResponse.json(
        { error: 'No access token received' },
        { status: 400 },
      );
    }

    // Return the access token
    console.log('Login successful, returning access token:', accessToken);
    return NextResponse.json(accessToken, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Login Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
