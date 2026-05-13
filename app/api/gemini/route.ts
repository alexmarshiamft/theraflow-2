import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const rateLimitResult = rateLimit(ip, 20, 60000); // 20 req per minute
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { prompt, context, responseFormat } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
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
    
    // Construct the final prompt by injecting context if provided
    let finalPrompt = `SYSTEM INSTRUCTION: You are a secure, HIPAA-compliant AI assistant for a mental health practice. You must strictly adhere to California Board of Behavioral Sciences (BBS) guidelines, federal HIPAA regulations, and ethical standards of psychotherapy in all of your analyses and generated content.\n\nUser Request:\n${prompt}`;
    
    if (context) {
      let contextString = '';
      
      if (context.uploadedFile) {
        contextString += `\n--- ATTACHED FILE DATA: ${context.uploadedFile.name} ---\n${context.uploadedFile.content}\n-----------------------------------\n\n`;
        // Remove uploaded file from stringified context to avoid duplication
        delete context.uploadedFile;
      }
      
      contextString += `System State Context:\n${JSON.stringify(context, null, 2)}`;
      
      finalPrompt = `SYSTEM INSTRUCTION: You are a secure, HIPAA-compliant AI assistant for a mental health practice. You must strictly adhere to California Board of Behavioral Sciences (BBS) guidelines, federal HIPAA regulations, and ethical standards of psychotherapy in all of your analyses and generated content.\n\nContext:\n${contextString}\n\nUser Request:\n${prompt}`;
    }

    const config: any = {};
    if (responseFormat === 'json') {
      config.responseMimeType = 'application/json';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: finalPrompt,
      config,
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : (error?.message || 'Failed to generate content: ' + String(error)) },
      { status: 500 }
    );
  }
}
