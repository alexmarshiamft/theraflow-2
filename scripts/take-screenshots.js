const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms));
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const routes = [
  '/',
  '/dashboard',
  '/banking',
  '/claims',
  '/compliance',
  '/ehr',
  '/features',
  '/intelligence',
  '/payroll',
  '/platform',
  '/portal',
  '/supervision',
  '/tax',
  '/telehealth'
];

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true, // "old" headless mode
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  
  // Set a large viewport for high-quality, desktop-sized screenshots
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
  
  try {
    for (const route of routes) {
      console.log(`Navigating to ${route}...`);
      await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle0' });
      
      // Wait for framer-motion or tailwind animate-in animations to finish
      await sleep(2000); 
      
      // Clean up the route name for the file name
      const name = route === '/' ? 'landing' : route.replace('/', '');
      const filePath = path.join(SCREENSHOT_DIR, `${name}_screenshot.png`);
      
      await page.screenshot({ path: filePath, fullPage: true });
      console.log(`Saved screenshot to: ${filePath}`);
    }
    
    console.log('\nAll screenshots captured successfully in the "screenshots" folder!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

run();
