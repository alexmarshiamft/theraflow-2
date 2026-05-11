const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function runTest() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Licensure Dashboard...');
  await page.goto('http://localhost:3000/licensure');
  
  const filesDir = '/Users/alexandermarshi/Downloads/bbs';
  const filesToUpload = [
    'AEM_ITR_BBS_Weekly_Log_2026-04-26_and_2026-05-03.pdf',
    'BBS ITR AEM Hours 3.1-4.26 To Be Signed.pdf',
    'EVF (1).pdf'
  ].map(f => path.join(filesDir, f));

  for (const f of filesToUpload) {
    if (!fs.existsSync(f)) {
      console.error('File missing:', f);
      process.exit(1);
    }
  }

  console.log('Waiting for input element...');
  const inputSelector = '#document-upload';
  await page.waitForSelector(inputSelector, { state: 'attached' });
  const fileInput = await page.$(inputSelector);
  
  if (!fileInput) {
    console.error('File input not found!');
    await browser.close();
    return;
  }

  console.log('Uploading real files...');
  await fileInput.uploadFile(...filesToUpload);

  console.log('Files uploaded. Waiting for processing to complete...');
  
  await new Promise(r => setTimeout(r, 15000));
  
  console.log('Checking state...');
  const bodyText = await page.evaluate(() => document.body.innerText);
  
  const matches = bodyText.match(/(\d+)\s+total hours/i);
  if (matches) {
    console.log('Found total hours parsed:', matches[1]);
  } else {
    console.log('Total hours text not found in UI.');
    console.log(bodyText.substring(0, 500));
  }

  await browser.close();
}

runTest().catch(console.error);
