import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (
      !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
      !process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN
    ) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 },
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

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
