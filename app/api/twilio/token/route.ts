import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Generate a secure JWT for the Twilio Voice SDK
    // When the real twilio package is installed, this will be implemented using:
    // const twilio = require('twilio');
    // const AccessToken = twilio.jwt.AccessToken;
    // const VoiceGrant = AccessToken.VoiceGrant;
    
    // For now, we simulate the token generation to support our mock SDK
    // and keep the frontend architecture intact.
    const token = 'mock-twilio-jwt-token-' + Date.now();

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error('Error generating Twilio token:', error);
    return NextResponse.json(
      { error: 'Failed to generate Twilio token' },
      { status: 500 }
    );
  }
}
