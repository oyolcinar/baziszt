import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    console.log('Received customer creation request:', {
      email,
      firstName,
      lastName,
    });

    if (
      !process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME ||
      !process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN
    ) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 },
      );
    }

    console.log('Attempting to create customer...');
    const customerResponse = await fetch(
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

    if (!customerResponse.ok) {
      console.error(
        `Failed to create customer: ${customerResponse.status} ${customerResponse.statusText}`,
      );
      throw new Error(
        `Failed to create customer: ${customerResponse.status} ${customerResponse.statusText}`,
      );
    }

    const customerData = await customerResponse.json();
    console.log('Customer created successfully:', customerData);

    if (customerData.customer.state === 'enabled') {
      console.log('Customer already activated, skipping activation email.');
      return NextResponse.json(
        { message: 'Customer already activated, no activation email sent.' },
        { status: 200 },
      );
    }

    console.log('Attempting to send activation email...');
    const activationResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME}/admin/api/2024-04/customers/${customerData.customer.id}/send_invite.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token':
            process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          customer_invite: {
            to: email,
            from: 'zied@baziszt.com',
            subject: 'Activate your account',
            custom_message:
              'Please activate your account and set your password.',
          },
        }),
      },
    );

    if (!activationResponse.ok) {
      const errorResponse = await activationResponse.json();
      console.error('Failed to send activation email:', errorResponse);
      throw new Error(
        `Failed to send activation email: ${activationResponse.status} ${activationResponse.statusText}`,
      );
    }

    const activationData = await activationResponse.json();
    console.log('Activation email sent successfully:', activationData);

    return NextResponse.json(
      { message: 'Customer created and activation email sent.' },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error(
      'Error in customer creation or activation process:',
      errorMessage,
    );
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
