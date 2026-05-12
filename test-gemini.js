const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKey = envFile.split('\n').find(line => line.startsWith('GEMINI_API_KEY=')).split('=')[1].replace(/"/g, '').replace(/'/g, '');

const ai = new GoogleGenAI({ apiKey });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash',
      contents: 'Hello! Please confirm what model version you are. Are you Gemini 3.1 Flash? Answer in one short sentence.',
    });
    console.log("====================================");
    console.log("SUCCESS! The API is fully functional.");
    console.log("Model Output:");
    console.log(response.text);
    console.log("====================================");
  } catch (error) {
    console.error("FAILED:");
    console.error(error);
  }
}
run();
