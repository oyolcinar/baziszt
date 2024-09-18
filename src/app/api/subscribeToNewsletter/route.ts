import { NextApiRequest, NextApiResponse } from 'next';
import sendgrid from '@sendgrid/mail';

const sendGridApiKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY;

if (!sendGridApiKey) {
  throw new Error('SendGrid API key is not set in environment variables.');
}

sendgrid.setApiKey(sendGridApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      await sendgrid.send({
        to: 'together@gmail.com',
        from: 'no-reply@yourdomain.com',
        subject: 'New Newsletter Subscription',
        text: `A new user has subscribed to the newsletter: ${email}`,
        html: `<strong>A new user has subscribed to the newsletter:</strong> ${email}`,
      });

      return res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
