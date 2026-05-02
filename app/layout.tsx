import type { Metadata } from 'next';
import './globals.css';
import { Toast } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'Theraflow — EHR, Banking, Payroll & Tax for Healthcare',
  description:
    'HIPAA-compliant all-in-one platform unifying EHR, practice banking, payroll management, and tax preparation for modern healthcare practices.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toast />
      </body>
    </html>
  );
}
