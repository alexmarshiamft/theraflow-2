const fs = require('fs');
const path = require('path');

const targetFiles = [
  '/Users/alexandermarshi/Downloads/ther-main/app/claims/page.tsx',
  '/Users/alexandermarshi/Downloads/ther-main/app/payroll/page.tsx',
  '/Users/alexandermarshi/Downloads/ther-main/app/compliance/page.tsx',
  '/Users/alexandermarshi/Downloads/ther-main/app/messages/page.tsx'
];

const replacements = {
  // Backgrounds
  'bg-white': 'bg-card',
  'bg-slate-50': 'bg-muted/50',
  'bg-gray-50': 'bg-muted/50',
  'bg-gray-100': 'bg-muted',
  'bg-slate-100': 'bg-muted',
  // Text
  'text-slate-900': 'text-foreground',
  'text-gray-900': 'text-foreground',
  'text-slate-800': 'text-foreground/90',
  'text-gray-800': 'text-foreground/90',
  'text-slate-700': 'text-foreground/80',
  'text-gray-700': 'text-foreground/80',
  'text-slate-600': 'text-muted-foreground',
  'text-gray-600': 'text-muted-foreground',
  'text-slate-500': 'text-muted-foreground',
  'text-gray-500': 'text-muted-foreground',
  'text-slate-400': 'text-muted-foreground/80',
  'text-gray-400': 'text-muted-foreground/80',
  // Borders
  'border-slate-200': 'border-border',
  'border-gray-200': 'border-border',
  'border-slate-100': 'border-border/50',
  'border-gray-100': 'border-border/50',
};

targetFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [key, value] of Object.entries(replacements)) {
      // Use regex with word boundaries to ensure we match full class names
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      content = content.replace(regex, value);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
