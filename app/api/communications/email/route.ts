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

    const premiumLetterhead = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f9fafb;
            margin: 0;
            padding: 40px 20px;
            color: #111827;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            border: 1px solid #f3f4f6;
          }
          .header {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
            padding: 30px 40px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 40px;
            font-size: 16px;
            line-height: 1.6;
            color: #374151;
          }
          .signature {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #f3f4f6;
          }
          .signature-name {
            font-weight: 600;
            color: #111827;
            margin: 0 0 4px 0;
          }
          .signature-title {
            color: #6b7280;
            font-size: 14px;
            margin: 0;
          }
          .footer {
            background-color: #f8fafc;
            padding: 24px 40px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
          }
          .confidentiality {
            font-size: 11px;
            line-height: 1.5;
            margin-top: 12px;
            color: #cbd5e1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Theraflow</h1>
          </div>
          <div class="content">
            ${html}
            
            <div class="signature">
              <p class="signature-name">Alexander Marshi, AMFT</p>
              <p class="signature-title">Theraflow Clinical Team</p>
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0 0 8px 0;">Theraflow • The Enterprise-Grade Practice Management Platform</p>
            <p style="margin: 0;">Los Angeles, CA • www.aemcounseling.com</p>
            <div class="confidentiality">
              CONFIDENTIALITY NOTICE: This email and any attachments are confidential and may also be privileged. If you are not the intended recipient, please delete all copies and notify the sender immediately.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const info = await transporter.sendMail({
      from: `"Theraflow Team" <${emailUser}>`,
      to,
      subject,
      html: premiumLetterhead,
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
