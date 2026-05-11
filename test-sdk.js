const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        "What is 1+1?",
        { inlineData: { data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==", mimeType: "image/png" } }
      ]
    });
    console.log(res.text);
  } catch(e) {
    console.error("ERROR:", e);
  }
}
test();
