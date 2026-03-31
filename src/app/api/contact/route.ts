import { NextResponse } from 'next/server';
import { contactSchema, franchiseSchema } from '@/lib/schemas/contact';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;

    // Server-side validation
    if (type === 'franchise') {
      const result = franchiseSchema.safeParse(data);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: result.error.flatten() },
          { status: 400 }
        );
      }
    } else {
      const result = contactSchema.safeParse(data);
      if (!result.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: result.error.flatten() },
          { status: 400 }
        );
      }
    }

    // Send email via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL_TO;

    if (resendApiKey && contactEmail) {
      const subject = type === 'franchise'
        ? `[Franchise Inquiry] ${data.companyName}`
        : `[Contact] ${data.subject}`;

      const textBody = type === 'franchise'
        ? `Company: ${data.companyName}\nContact: ${data.contactPerson}\nEmail: ${data.email}\nPhone: ${data.phone}\nCountry: ${data.country}\nBudget: ${data.budget || 'N/A'}\n\nMessage:\n${data.message}`
        : `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`;

      await fetch('https://api.resend.com/emails', {
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
    } else if (process.env.NODE_ENV === 'development') {
      console.warn('[Contact API] RESEND_API_KEY not configured — email not sent.');
      console.log('[Contact API] Form data:', { type, ...data });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
