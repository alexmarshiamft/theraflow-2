import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hasPhi: {
      type: Type.BOOLEAN,
      description: 'True if Protected Health Information (PHI) is detected in the text, false otherwise.'
    },
    scrubbedText: {
      type: Type.STRING,
      description: 'The original text with all PHI replaced by appropriate placeholders like [PATIENT_NAME], [DOB], [CONDITION], etc. If no PHI is detected, return the original text.'
    },
    detectedEntities: {
      type: Type.ARRAY,
      description: 'A list of the types of PHI detected, e.g. ["Patient Name", "Diagnosis"].',
      items: { type: Type.STRING }
    }
  },
  required: ['hasPhi', 'scrubbedText', 'detectedEntities']
};

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing "text" field.' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not set in the environment.' },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: "You are a strict HIPAA Compliance Officer for Theraflow, an enterprise practice management platform. Your job is to scan outgoing communications for Protected Health Information (PHI). If you detect any PHI (such as patient names, dates of birth, social security numbers, specific diagnoses, treatment details, or contact information), you must flag it and provide a scrubbed version of the text where the PHI is replaced by generic placeholders (e.g., [PATIENT_NAME], [DOB], [DIAGNOSIS]). If there is no PHI, return the text unchanged.",
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (!response.text) {
      throw new Error('No text returned from Gemini API');
    }

    const result = JSON.parse(response.text);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('PHI Scanner Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to scan for PHI.' },
      { status: 500 }
    );
  }
}
