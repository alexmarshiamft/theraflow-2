const fs = require('fs');
const path = require('path');

async function runTest() {
  const filesDir = '/Users/alexandermarshi/Downloads/bbs';
  const filesToUpload = [
    'AEM_ITR_BBS_Weekly_Log_2026-04-26_and_2026-05-03.pdf',
    'BBS ITR AEM Hours 3.1-4.26 To Be Signed.pdf',
    'EVF (1).pdf'
  ].map(f => path.join(filesDir, f));

  for (const file of filesToUpload) {
    if (!fs.existsSync(file)) {
      console.error('File missing:', file);
      process.exit(1);
    }
  }

  console.log('Files verified. Testing API parsing...');
  
  let totalHours = 0;
  
  for (const file of filesToUpload) {
    console.log(`\nParsing ${path.basename(file)}...`);
    const fileBuffer = fs.readFileSync(file);
    const base64Data = fileBuffer.toString('base64');
    
    // Send to Next.js API
    try {
      const response = await fetch('http://localhost:3000/api/licensure/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileData: base64Data,
          mimeType: 'application/pdf',
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('API Error:', data.error || data);
        continue;
      }
      
      if (data.hours && data.hours.length > 0) {
        const fileTotal = data.hours.reduce((sum, h) => sum + (h.durationMinutes / 60), 0);
        console.log(`Success! Parsed ${data.hours.length} entries. Total Hours for this file: ${fileTotal.toFixed(2)} hrs.`);
        totalHours += fileTotal;
        console.log('Sample entry:', data.hours[0]);
      } else {
        console.log('No clinical hours detected in this document.');
      }
    } catch (e) {
      console.error('Fetch error:', e.message);
    }
  }
  
  console.log(`\n--- Test Complete ---`);
  console.log(`Grand Total Extracted: ${totalHours.toFixed(2)} hrs`);
}

runTest().catch(console.error);
