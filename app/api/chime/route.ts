import { NextResponse } from 'next/server';
import { ChimeSDKMeetingsClient, CreateMeetingCommand, CreateAttendeeCommand } from "@aws-sdk/client-chime-sdk-meetings";

const chimeClient = new ChimeSDKMeetingsClient({ 
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

export async function POST(req: Request) {
  try {
    const { meetingId } = await req.json();

    let finalMeetingId = meetingId;
    let meetingData = null;

    if (!finalMeetingId) {
      const createMeetingCommand = new CreateMeetingCommand({
        ClientRequestToken: crypto.randomUUID(),
        MediaRegion: "us-west-2",
        ExternalMeetingId: "Theraflow-Telehealth-Room-" + Date.now(),
      });
      const meetingResponse = await chimeClient.send(createMeetingCommand);
      meetingData = meetingResponse.Meeting;
      finalMeetingId = meetingData?.MeetingId;
    }

    const createAttendeeCommand = new CreateAttendeeCommand({
      MeetingId: finalMeetingId,
      ExternalUserId: "user-" + crypto.randomUUID(),
    });
    const attendeeResponse = await chimeClient.send(createAttendeeCommand);

    return NextResponse.json({
      meeting: meetingData,
      attendee: attendeeResponse.Attendee,
    });
  } catch (error: any) {
    console.error('AWS Chime API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create Chime session' },
      { status: 500 }
    );
  }
}
