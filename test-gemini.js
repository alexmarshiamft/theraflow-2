const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function test() {
  try {
    console.log("Calling gemini-1.5-flash...");
    const res1 = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: "hello"
    });
    console.log("1.5-flash responded:", res1.text);
  } catch (e) {
    console.error("1.5-flash error:", e.message);
  }
}
test();
