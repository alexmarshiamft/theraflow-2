const fs = require('fs');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const apiKeyMatch = envContent.match(/GEMINI_API_KEY=(.*)/);
process.env.GEMINI_API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : '';

async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const filesDir = '/Users/alexandermarshi/Downloads/ther-main/associate_bbs_data';
  const files = fs.readdirSync(filesDir).filter(f => f.endsWith('.pdf') || f.endsWith('.png'));
  
  let allHours = [];
  let vaultDocs = [];
  
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

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    const filePath = path.join(filesDir, fileName);
    console.log(`Processing ${fileName}...`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString('base64');
    const mimeType = fileName.endsWith('.pdf') ? 'application/pdf' : 'image/png';
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  data: base64Data,
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
      
      let parsedFromDoc = false;
      if (response.text) {
        try {
          const parsedHours = JSON.parse(response.text);
          if (parsedHours && parsedHours.length > 0) {
            allHours = allHours.concat(parsedHours.map((h, idx) => ({
              ...h,
              id: `EXTRACT-${Date.now()}-${i}-${idx}`
            })));
            parsedFromDoc = true;
          }
        } catch (e) {
          console.error('Failed to parse JSON:', e.message);
        }
      }
      
      vaultDocs.push({
        id: `VAULT-${Date.now()}-${i}`,
        name: fileName,
        type: mimeType,
        size: fs.statSync(filePath).size,
        uploadDate: new Date().toISOString(),
        category: parsedFromDoc ? 'licensure' : 'general'
      });
      
    } catch (e) {
      console.error('Gemini error:', e.message);
    }
  }
  
  fs.writeFileSync('parsed_data.json', JSON.stringify({ hours: allHours, vaultDocs }, null, 2));
  console.log(`Saved ${allHours.length} hours and ${vaultDocs.length} vault documents to parsed_data.json`);
}

run().catch(console.error);
