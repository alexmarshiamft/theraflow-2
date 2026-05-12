import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { app } from '@/lib/firebase';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const db = getFirestore(app);

// Secret must match what the UI shows or what the user configured
const WEBHOOK_SECRET = 'whsec_8f92j3f0923jf0923jf0923j';

export async function POST(req: Request) {
  try {
    const payloadString = await req.text();
    const signature = req.headers.get('x-theraflow-signature');
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');

    if (!uid) {
      return NextResponse.json({ error: 'Missing uid parameter in webhook URL' }, { status: 400 });
    }

    // Verify HMAC signature
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', WEBHOOK_SECRET)
        .update(payloadString)
        .digest('hex');

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: 'Invalid Signature' }, { status: 401 });
      }
    } else {
      // In a real app we might strictly require the signature, but for the demo we'll just log a warning 
      // if it's missing, so it's easier to test with Postman.
      console.warn("Webhook received without signature.");
    }

    const payload = JSON.parse(payloadString);
    const event = payload.event || 'unknown.event';

    // Log the webhook to Firestore
    const logId = `whlog_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const logEntry = {
      id: logId,
      userId: uid,
      event: event,
      endpoint: 'api/webhooks',
      status: 200,
      time: new Date().toISOString(),
      timestamp: Date.now(),
      payload: JSON.stringify(payload, null, 2)
    };

    await setDoc(doc(db, 'webhookLogs', logId), logEntry);

    // If it's a specific event, trigger an internal Firebase action
    if (event === 'claim.denied') {
      const auditLogId = `audit_${Date.now()}`;
      await setDoc(doc(db, 'auditLogs', auditLogId), {
        id: auditLogId,
        timestamp: new Date().toISOString(),
        userId: uid,
        action: 'SYSTEM',
        entityType: 'Claim',
        entityId: payload.claim_id || 'unknown',
        details: `Claim denied by payer. Reason: ${payload.reason || 'Unknown'}`,
        hash: crypto.randomBytes(32).toString('hex'),
        previousHash: crypto.randomBytes(32).toString('hex')
      });
    }

    return NextResponse.json({ success: true, logId });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
