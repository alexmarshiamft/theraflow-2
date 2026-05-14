import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rateLimit';
import nodemailer from 'nodemailer';

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

    const emailUser = process.env.EMAIL_USER;
    const emailAppPassword = process.env.EMAIL_APP_PASSWORD;

    if (!emailUser || !emailAppPassword) {
      return NextResponse.json(
        { error: 'EMAIL_USER or EMAIL_APP_PASSWORD is not set in the environment.' },
        { status: 500 }
      );
    }

    // ZERO-RETENTION COMPLIANCE LOGGING
    console.log(`[COMPLIANCE] Dispatching real Email to ${to.replace(/(?<=.).(?=.*@)/g, '*')}`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailAppPassword,
      },
    });

    const info = await transporter.sendMail({
      from: `"Theraflow" <${emailUser}>`,
      to,
      subject,
      html,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send Email.' },
      { status: 500 }
    );
  }
}
