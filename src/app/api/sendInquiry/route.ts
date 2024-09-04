import { NextRequest, NextResponse } from 'next/server';
import Shopify from 'shopify-api-node';

// Configure Shopify API
const shopify = new Shopify({
  shopName: process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME!,
  accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
});

// Export a POST handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      );
    }

    const draftOrder = await shopify.draftOrder.create({
      line_items: [
        {
          title: 'Customer Inquiry',
          price: 0,
          quantity: 1,
        },
      ],
      note: `Contact Inquiry\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
      customer: {
        first_name: name,
        email: email,
      },
      use_customer_default_address: true,
    });

    return NextResponse.json(
      { message: 'Inquiry created successfully', draftOrder },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error creating draft order:', error);
    return NextResponse.json(
      { message: 'Error creating inquiry' },
      { status: 500 },
    );
  }
}
