import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
      !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    ) {
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
        `Failed to log in user: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
