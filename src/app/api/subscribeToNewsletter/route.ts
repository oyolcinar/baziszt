import { NextRequest, NextResponse } from 'next/server';
import Shopify from 'shopify-api-node';

// Configure Shopify API
const shopify = new Shopify({
  shopName: process.env.NEXT_PUBLIC_SHOPIFY_HOST_NAME!,
  accessToken: process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ message: 'Missing email' }, { status: 400 });
    }

    const draftOrder = await shopify.draftOrder.create({
      line_items: [
        {
          title: 'Newsletter Subscription',
          price: 0,
          quantity: 1,
        },
      ],
      note: `Newsletter Subscription\n\nEmail: ${email}`,
    });

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter', draftOrder },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error creating draft order:', error);
    return NextResponse.json(
      { message: 'Error subscribing to newsletter' },
      { status: 500 },
    );
  }
}
