'use client';

import { useToast } from '@/lib/toast';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Toast() {
  const { message, type } = useToast();

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-xl animate-in fade-in slide-in-from-bottom-4">
      {type === 'success' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
      {type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-400" />}
      {type === 'error' && <AlertCircle className="h-4 w-4 text-red-400" />}
      {type === 'info' && <Info className="h-4 w-4 text-brand-400" />}
      <span>{message}</span>
    </div>
  );
}
