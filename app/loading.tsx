import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-950">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-brand-500/20" />
        <div className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
        <Loader2 className="h-8 w-8 text-brand-500 animate-pulse" />
      </div>
      <p className="mt-6 text-sm font-medium text-brand-400/80 animate-pulse tracking-widest uppercase">
        Initializing Secure Enclave
      </p>
    </div>
  );
}
