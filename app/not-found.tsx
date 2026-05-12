import Link from 'next/link';
import { SearchX, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950 p-4 text-slate-200">
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 border border-slate-800 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 rounded-full bg-slate-800/20 animate-pulse" />
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>
      
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-white text-center font-mono">
        404
      </h1>
      <h2 className="mb-4 text-xl font-medium text-slate-300 text-center">
        Resource Not Found
      </h2>
      
      <p className="mb-8 max-w-md text-center text-slate-500">
        The clinical record, module, or page you are looking for does not exist within the current secure enclave.
      </p>

      <Link href="/dashboard" className="w-full sm:w-auto">
        <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white gap-2 rounded-xl">
          <ArrowLeft className="h-4 w-4" /> Return to Dashboard
        </Button>
      </Link>
      
      <div className="mt-16 text-[10px] uppercase tracking-widest text-slate-700 font-bold">
        Theraflow Secure Platform
      </div>
    </div>
  );
}
