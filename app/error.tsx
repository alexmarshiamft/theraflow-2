'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 p-4 text-slate-200">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
        <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping opacity-50" />
        <AlertTriangle className="h-10 w-10 text-red-500" />
      </div>
      
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-white text-center">
        System Anomaly Detected
      </h1>
      
      <p className="mb-8 max-w-md text-center text-slate-400">
        A critical error occurred while attempting to process your request. 
        Our engineering team has been notified of the incident.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-md justify-center">
        <Button 
          onClick={() => reset()} 
          className="bg-brand-600 hover:bg-brand-700 text-white gap-2 rounded-xl"
        >
          <RefreshCcw className="h-4 w-4" /> Try Again
        </Button>
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full gap-2 rounded-xl">
            <Home className="h-4 w-4" /> Return to Dashboard
          </Button>
        </Link>
      </div>
      
      <div className="mt-12 text-xs font-mono text-slate-600 flex items-center gap-2">
        <span>ERR_ID: {error.digest || 'UNKNOWN'}</span>
        <span className="w-1 h-1 bg-slate-600 rounded-full" />
        <span>SECURE_ENCLAVE</span>
      </div>
    </div>
  );
}
