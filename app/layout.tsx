import type { Metadata } from 'next';
import './globals.css';
import { Toast } from '@/components/ui/Toast';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CommandPalette } from '@/components/ui/CommandPalette';

export const metadata: Metadata = {
  title: 'Theraflow — The Enterprise-Grade Practice Management Platform',
  description: 'HIPAA-compliant platform unifying EHR, predictive AI retention, autonomous billing, and tiered compensation management for modern clinical practices.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theraflow.com',
    siteName: 'Theraflow',
    title: 'Theraflow — The Enterprise-Grade Practice Management Platform',
    description: 'HIPAA-compliant platform unifying EHR, predictive AI retention, and autonomous billing.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Theraflow Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theraflow — The Enterprise-Grade Practice Management Platform',
    description: 'HIPAA-compliant platform unifying EHR, predictive AI retention, and autonomous billing.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CommandPalette />
          {children}
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
