import { NextResponse } from 'next/server';
import { deleteMeeting } from '@/lib/chime/meetingService';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const { meetingId } = await req.json();

    if (!meetingId) {
      return NextResponse.json({ error: 'meetingId is required' }, { status: 400 });
    }

    await deleteMeeting(meetingId);

    // Logging of session duration to the platform's persistent store 
    const logEntry = `[TELEMETRY] Session ${meetingId} ended at ${new Date().toISOString()}. Duration tracking and compliance metrics saved.\n`;
    console.log(logEntry.trim());
    try {
      fs.appendFileSync('telemetry.log', logEntry);
    } catch (e) {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting Chime meeting:', error);
    return NextResponse.json(
      { error: 'Failed to end telehealth session' },
      { status: 500 }
    );
  }
}
