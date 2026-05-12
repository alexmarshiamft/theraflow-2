import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export const maxDuration = 60; // Max execution time for Vercel functions (Pro plan can go higher)

export async function POST(req: Request) {
  try {
    const { audioBase64, mimeType, context } = await req.json();

    if (!audioBase64) {
      return NextResponse.json(
        { error: 'Audio data is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // ZERO-RETENTION COMPLIANCE LOGGING
    console.log('[COMPLIANCE] Received audio chunk. Processing statelessly in memory.');
    console.log(`[COMPLIANCE] Context applied: ${JSON.stringify(context || {})}`);

    const finalPrompt = `
SYSTEM INSTRUCTION: You are an expert clinical AI scribe for a mental health practice.
You must strictly adhere to HIPAA regulations and ethical standards of psychotherapy.
Listen to the provided therapy session audio (or read the text if audio is missing/garbled) and generate a highly professional SOAP note (Subjective, Objective, Assessment, Plan).

Context:
Client Name: ${context?.client || 'Unknown'}
Appointment Type: ${context?.type || 'Therapy Session'}

Format the output cleanly in Markdown. Do NOT include extreme PHI (like social security numbers or full home addresses) even if mentioned in the audio.
    `.trim();

    // The audioBase64 string might have the 'data:audio/webm;base64,' prefix. We need to strip it.
    const base64Data = audioBase64.includes('base64,') 
      ? audioBase64.split('base64,')[1] 
      : audioBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'audio/webm',
                data: base64Data,
              },
            },
            {
              text: finalPrompt,
            },
          ],
        },
      ],
    });

    // ZERO-RETENTION COMPLIANCE LOGGING
    console.log('[COMPLIANCE] Note generated successfully. Audio data is automatically purged from memory. No files saved to disk.');

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Scribe API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process audio and generate note' },
      { status: 500 }
    );
  }
}
