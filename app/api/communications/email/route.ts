import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimitResult = rateLimit(ip, 10, 60000); // 10 requests per minute
    
    if (!rateLimitResult.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429 });
    }

    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ error: 'Missing "to", "subject", or "html" fields.' }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not set in the environment. Please configure it to send real emails.' },
        { status: 500 }
      );
    }

    // ZERO-RETENTION COMPLIANCE LOGGING
    console.log(`[COMPLIANCE] Dispatching real Email to ${to.replace(/(?<=.).(?=.*@)/g, '*')}`);

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Theraflow <notifications@theraflow.com>',
        to: [to],
        subject: subject,
        html: html,
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API Error:', data);
      return NextResponse.json({ error: data.message || 'Failed to send via Resend' }, { status: res.status });
    }

    return NextResponse.json({ success: true, messageId: data.id });
  } catch (error: any) {
    console.error('Resend Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send Email.' },
      { status: 500 }
    );
  }
}
