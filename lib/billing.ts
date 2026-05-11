import { Claim, ClinicalNote } from './store';

/**
 * Mocks the generation of an EDI 837P (Professional) claim file format.
 * In a production environment, this would map the store data to strict X12 loops and segments.
 */
export const generateEDI837P = (claim: Claim, note?: ClinicalNote): string => {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const currentTime = new Date().toISOString().split('T')[1].slice(0, 4).replace(':', '');
  const controlNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  
  // Basic Mock X12 Structure
  return `ISA*00*          *00*          *ZZ*SUBMITTERID    *ZZ*RECEIVERID     *${currentDate.slice(2)}*${currentTime}*^*00501*${controlNumber}*0*T*:~
GS*HC*SUBMITTERID*RECEIVERID*${currentDate}*${currentTime}*1*X*005010X222A1~
ST*837*0001*005010X222A1~
BHT*0019*00*0123*${currentDate}*${currentTime}*CH~
NM1*41*2*THERAFLOW INC*****46*SUBMITTERID~
PER*IC*JOHN DOE*TE*5555555555~
NM1*40*2*${claim.payer.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 35)}*****46*RECEIVERID~
HL*1**20*1~
NM1*85*2*THERAFLOW INC*****XX*1234567890~
N3*123 MAIN ST~
N4*SAN FRANCISCO*CA*94105~
REF*EI*123456789~
HL*2*1*22*0~
SBR*P*18*******CI~
NM1*IL*1*${claim.client.split(' ')[1]?.toUpperCase() || 'DOE'}*${claim.client.split(' ')[0]?.toUpperCase() || 'JOHN'}****MI*111223333~
N3*456 CLIENT WAY~
N4*OAKLAND*CA*94612~
DMG*D8*19800101*M~
CLM*${claim.id}*${claim.amount.toFixed(2)}***11:B:1*Y*A*Y*I~
HI*BK:F4322~
LX*1~
SV1*HC:${claim.cptCode}*${claim.amount.toFixed(2)}*UN*1***1~
DTP*472*D8*${claim.serviceDate.replace(/-/g, '')}~
SE*23*0001~
GE*1*1~
IEA*1*${controlNumber}~`;
};

/**
 * Mocks the generation of a CMS-1500 PDF.
 * In a production environment, this would use a library like pdf-lib or react-pdf
 * to overlay text onto a standard CMS-1500 form template.
 * For this mock, we just generate a simple data URI representing a "PDF".
 */
export const generateCMS1500PDF = async (claim: Claim, note?: ClinicalNote): Promise<string> => {
  // Mock artificial delay for generating the PDF
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return a mock base64 string that a frontend could potentially treat as a file download.
  // In a real scenario this is a binary blob.
  return `data:application/pdf;base64,JVBERi0xLjQKJcOkw7zDtsOfCjIgMCBvYmoKPDwvTGVuZ3RoIDMgMCBSL0ZpbHRlci9GbGF0ZURlY29kZT4+CnN0cmVhbQp4nDPQM1Qo5ypUMFAwALJMLU31jBQsLQEshQwDSwMLl3SFlNQKoLQUAFw7ByUKZW5kc3RyZWFtCmVuZG9iagoKMyAwIG9iago0NAplbmRvYmoKCjUgMCBvYmoKPDwvTGVuZ3RoIDYgMCBSL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGgxIDc5MjQ+PgpzdHJlYW0K... (Mock CMS-1500 PDF Content for Claim ${claim.id})`;
};
