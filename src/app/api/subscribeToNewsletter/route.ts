import { NextRequest, NextResponse } from 'next/server';
import sendgrid from '@sendgrid/mail';

const sendGridApiKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;

if (!sendGridApiKey) {
  throw new Error('SendGrid API key is not set in environment variables.');
}

sendgrid.setApiKey(sendGridApiKey);

// Handle POST requests directly as required by the new App Router
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await sendgrid.send({
      to: 'together@gmail.com',
      from: 'no-reply@yourdomain.com', // Ensure this is a verified email in SendGrid
      subject: 'New Newsletter Subscription',
      text: `A new user has subscribed to the newsletter: ${email}`,
      html: `<strong>A new user has subscribed to the newsletter:</strong> ${email}`,
    });

    return NextResponse.json(
      { message: 'Subscription successful' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 },
    );
  }
}
