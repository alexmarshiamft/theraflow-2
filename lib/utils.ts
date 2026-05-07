import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatTime(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Synchronous pseudo-hash for Immutable Ledger demo (outputs 64-char hex)
export function generateHash(input: string): string {
  let hash1 = 5381;
  let hash2 = 52711;
  
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) + char; /* hash * 33 + c */
    hash2 = ((hash2 << 5) + hash2) ^ char;
  }
  
  // Convert to positive hex and pad
  const p1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  const p3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0');
  const p4 = ((hash1 * 31) >>> 0).toString(16).padStart(8, '0');
  const p5 = ((hash2 * 17) >>> 0).toString(16).padStart(8, '0');
  const p6 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0');
  const p7 = ((hash1 ^ 0x5a5a5a5a) >>> 0).toString(16).padStart(8, '0');
  const p8 = ((hash2 ^ 0xa5a5a5a5) >>> 0).toString(16).padStart(8, '0');
  
  return p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
}
