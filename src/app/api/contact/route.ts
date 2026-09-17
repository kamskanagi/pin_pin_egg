import { NextResponse } from 'next/server';
import { z } from 'zod';
import { contactSchema, franchiseSchema } from '@/lib/schemas/contact';

const requestSchema = z.discriminatedUnion('type', [
  contactSchema.extend({ type: z.literal('general') }),
  franchiseSchema.extend({ type: z.literal('franchise') }),
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Server-side validation — only the parsed result is used below, never the raw body
    const result = requestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      );
    }
    const data = result.data;

    // Send email via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL_TO;

    if (resendApiKey && contactEmail) {
      const subject = data.type === 'franchise'
        ? `[Franchise Inquiry] ${data.companyName}`
        : `[Contact] ${data.subject}`;

      const textBody = data.type === 'franchise'
        ? `Company: ${data.companyName}\nContact: ${data.contactPerson}\nEmail: ${data.email}\nPhone: ${data.phone}\nCountry: ${data.country}\nBudget: ${data.budget || 'N/A'}\n\nMessage:\n${data.message}`
        : `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: 'Pin Pin Café <noreply@pinpincafe.com>',
          to: contactEmail,
          subject,
          text: textBody,
          reply_to: data.email,
        }),
      });

      if (!res.ok) {
        console.error('[Contact API] Resend request failed:', res.status, await res.text());
        return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Contact API] RESEND_API_KEY not configured — email not sent.');
      console.log('[Contact API] Form data:', data);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
