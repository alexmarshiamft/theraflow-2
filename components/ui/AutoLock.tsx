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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-3xl animate-in fade-in duration-500">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in zoom-in-95 duration-700 text-center relative">
        
        {/* Scanning Line Animation (only active when unlocking) */}
        {unlocking && (
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_20px_#10b981] animate-[scan_1.5s_ease-in-out_infinite]" />
        )}

        <div className="mx-auto mb-6 flex h-24 w-24 relative items-center justify-center rounded-full bg-slate-900 border-2 border-slate-800 shadow-inner">
          {unlocking ? (
             <>
               <div className="absolute inset-0 rounded-full border-2 border-emerald-500/50 animate-ping" />
               <div className="h-12 w-12 rounded-full border-b-2 border-emerald-400 animate-spin" />
             </>
          ) : (
            <Lock className="h-10 w-10 text-slate-400" />
          )}
        </div>

        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white">
          {unlocking ? 'Authenticating' : 'Vault Locked'}
        </h2>
        <p className="mb-8 text-sm text-slate-400 font-medium">
          {unlocking ? 'Verifying biometric signature...' : 'Zero-Trust Protocol Active. Session secured.'}
        </p>
        
        <div className="space-y-4">
          <Button 
            className={`w-full h-14 text-lg font-medium tracking-wide transition-all duration-300 ${unlocking ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500/50' : 'bg-white text-slate-900 hover:bg-slate-200'}`}
            onClick={handleUnlock}
            disabled={unlocking}
          >
            {unlocking ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" /> Cryptographic Handshake
              </span>
            ) : (
              'Initiate Biometric Unlock'
            )}
          </Button>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
          <Shield className="h-4 w-4" />
          HIPAA & SOC2 SECURE ENCLAVE
        </div>
      </div>
      
      {/* Add custom keyframe to global or inline style */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
