import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

async function main() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const fileBase64 = fs.readFileSync('mock_bbs_hours.csv').toString('base64');
    
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro-latest',
      contents: [
        'Parse this file',
        {
          inlineData: {
            data: fileBase64,
            mimeType: 'text/csv',
          }
        }
      ]
    });
    console.log(response.text);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
