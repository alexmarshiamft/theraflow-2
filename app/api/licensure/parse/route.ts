import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: Request) {
  try {
    const { fileData, mimeType } = await req.json();

    if (!fileData || !mimeType) {
      return NextResponse.json(
        { error: 'File data and mimeType are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set. Please configure it in your environment variables.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    console.log('Licensure Parse: Analyzing uploaded document with Gemini...');

    const prompt = `Extract the clinical hours from this document.
Return ONLY a raw JSON array of objects. Each object must have:
- id: a unique string (e.g. 'EXTRACT-' + random number)
- associateId: 'A001'
- associateName: 'Current Associate'
- date: ISO date string for the entry (use the current date if not specified)
- client: string (e.g. the name of the log, client initials, or 'BBS Log')
- type: must be exactly one of 'Direct Counseling', 'Individual/Triadic Supervision', 'Group Supervision', 'Non-Clinical', 'Diagnosis and Treatment'
- durationMinutes: integer representing the total minutes for this entry
- status: 'verified'
If the document does not contain clinical hours logs, return an empty array [].`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: fileData,
                mimeType: mimeType
              }
            },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    if (!response.text) {
      throw new Error("No response text from Gemini");
    }

    const parsedHours = JSON.parse(response.text);

    return NextResponse.json({ hours: parsedHours });
  } catch (error: any) {
    console.error('Licensure Parse API Error:', error);
    return NextResponse.json(
      { error: `Failed to process document: ${error?.message || error?.toString() || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
