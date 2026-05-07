'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { Lock, Shield, KeyRound, Loader2 } from 'lucide-react';
import { Button } from './Button';

export function AutoLock() {
  const { isLocked, setIsLocked } = useStore();
  const [unlocking, setUnlocking] = useState(false);

  // Auto-lock inactivity timer (set to 5 minutes)
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      if (!isLocked) {
        timeout = setTimeout(() => {
          setIsLocked(true);
        }, 5 * 60 * 1000); // 5 minutes
      }
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => document.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimer));
      clearTimeout(timeout);
    };
  }, [isLocked, setIsLocked]);

  if (!isLocked) return null;

  const handleUnlock = () => {
    setUnlocking(true);
    // Simulate biometric/password auth delay
    setTimeout(() => {
      setIsLocked(false);
      setUnlocking(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl animate-in slide-in-from-bottom-4 duration-500 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Session Locked</h2>
        <p className="mb-6 text-sm text-gray-500">
          For your security and HIPAA compliance, your session was automatically locked.
        </p>
        
        <div className="space-y-3">
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input 
              type="password" 
              placeholder="Enter master password" 
              value="********"
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
          
          <Button 
            className="w-full bg-brand-600 hover:bg-brand-700 h-12" 
            onClick={handleUnlock}
            disabled={unlocking}
          >
            {unlocking ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying Credentials...
              </>
            ) : (
              'Unlock Theraflow'
            )}
          </Button>
        </div>
        
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield className="h-3 w-3" />
          Zero-Trust Security Enabled
        </div>
      </div>
    </div>
  );
}
