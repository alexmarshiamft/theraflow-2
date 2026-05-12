import { 
  ChimeSDKMeetingsClient, 
  CreateMeetingCommand, 
  CreateAttendeeCommand, 
  DeleteMeetingCommand 
} from '@aws-sdk/client-chime-sdk-meetings';

// Using the default credential provider chain which will look for
// CHIME_AWS_ACCESS_KEY_ID and CHIME_AWS_SECRET_ACCESS_KEY in the environment.
const chimeClient = new ChimeSDKMeetingsClient({ 
  // The Amazon Chime SDK meetings control plane is only available in us-east-1
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.CHIME_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CHIME_AWS_SECRET_ACCESS_KEY || '',
  }
});

/**
 * Creates an Amazon Chime Meeting.
 */
export const createMeeting = async (sessionId: string, clientRegion: string = 'us-west-2') => {
  const command = new CreateMeetingCommand({
    ClientRequestToken: sessionId,
    MediaRegion: clientRegion,
    ExternalMeetingId: `theraflow-${sessionId}`,
  });

  const response = await chimeClient.send(command);
  return response.Meeting;
};

/**
 * Creates an Attendee for an existing Chime Meeting.
 */
export const createAttendee = async (meetingId: string, userId: string) => {
  const command = new CreateAttendeeCommand({
    MeetingId: meetingId,
    ExternalUserId: userId,
  });

  const response = await chimeClient.send(command);
  return response.Attendee;
};

/**
 * Deletes a Chime Meeting.
 */
export const deleteMeeting = async (meetingId: string) => {
  const command = new DeleteMeetingCommand({
    MeetingId: meetingId,
  });

  await chimeClient.send(command);
};

/**
 * Convenience method that fetches or creates both Meeting and Attendee in one call.
 * This is used by the session join endpoint.
 */
export const getMeetingWithAttendee = async (sessionId: string, userId: string) => {
  // In a real app with persistent backend, you would first check if a meeting
  // already exists in the database for this sessionId. 
  // For the sake of this mock/demo, we will just create a new meeting 
  // (which is idempotent if ClientRequestToken is the same, but the API may return 
  // the existing meeting or throw. AWS Chime CreateMeeting is idempotent 
  // if you use the same ClientRequestToken, it returns the existing meeting).
  
  const meeting = await createMeeting(sessionId);
  
  if (!meeting?.MeetingId) {
    throw new Error('Failed to create or retrieve Chime Meeting');
  }

  const attendee = await createAttendee(meeting.MeetingId, userId);

  return { meeting, attendee };
};
