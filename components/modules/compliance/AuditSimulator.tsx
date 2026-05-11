'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, Fingerprint, FileCheck, CheckCircle2, Shield, Loader2, Download, AlertTriangle, Building } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function AuditSimulator() {
  const [auditState, setAuditState] = useState<'idle' | 'compiling' | 'ready'>('idle');

  const triggerAudit = () => {
    setAuditState('compiling');
    setTimeout(() => {
      setAuditState('ready');
    }, 2500); // Simulate compilation time
  };

  const resetAudit = () => {
    setAuditState('idle');
  };

  return (
    <Card className={`overflow-hidden relative transition-all duration-700 ${
      auditState === 'idle' ? 'bg-slate-900/60 border-slate-700/50' : 
      auditState === 'compiling' ? 'bg-rose-950/40 border-rose-500/50 shadow-[0_0_50px_rgba(244,63,94,0.1)]' : 
      'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.1)]'
    }`}>
      
      {/* Background Glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full transition-colors duration-1000 ${
        auditState === 'idle' ? 'bg-slate-500/10' : 
        auditState === 'compiling' ? 'bg-rose-500/20' : 
        'bg-emerald-500/20'
      }`} />

      <CardHeader className="relative z-10 border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            {auditState === 'compiling' ? (
              <AlertTriangle className="h-6 w-6 text-rose-500 animate-pulse" />
            ) : auditState === 'ready' ? (
              <Shield className="h-6 w-6 text-emerald-500" />
            ) : (
              <ShieldAlert className="h-6 w-6 text-slate-400" />
            )}
            Flash Audit Simulator
          </CardTitle>
          {auditState === 'ready' && (
             <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
               Audit Defeated
             </Badge>
          )}
        </div>
        <p className="text-sm text-slate-400 mt-1">Simulate an unexpected regulatory or insurance audit to test systemic defense capabilities.</p>
      </CardHeader>

      <CardContent className="pt-6 relative z-10">
        {auditState === 'idle' && (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
              <Building className="h-8 w-8 text-slate-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Incoming Optum Post-Payment Audit</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
                Optum is requesting immediate proof of CPT code compliance, signed clinical notes, and supervision ratios for all billed 90837 sessions over the last 90 days.
              </p>
            </div>
            <Button 
              onClick={triggerAudit}
              className="mt-4 bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_20px_rgba(225,29,72,0.4)]"
            >
              Trigger Flash Audit Defense
            </Button>
          </div>
        )}

        {auditState === 'compiling' && (
          <div className="py-8 space-y-6">
            <div className="flex items-center gap-3 text-rose-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-mono text-sm tracking-widest uppercase">Compiling Defense Dossier...</span>
            </div>
            <div className="space-y-3 font-mono text-xs text-slate-400">
              <p className="flex items-center gap-2"><span className="text-rose-500">{'>'}</span> Scanning 1,420 telehealth session logs for 90837 time-stamps...</p>
              <p className="flex items-center gap-2 opacity-80"><span className="text-rose-500">{'>'}</span> Cross-referencing 240 BBS supervision hours with client load...</p>
              <p className="flex items-center gap-2 opacity-60"><span className="text-rose-500">{'>'}</span> Verifying cryptographic signatures on 1,200 clinical progress notes...</p>
              <p className="flex items-center gap-2 opacity-40"><span className="text-rose-500">{'>'}</span> Checking NPI and Malpractice policy active status...</p>
            </div>
          </div>
        )}

        {auditState === 'ready' && (
          <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Dossier Compiled Successfully</h3>
                <p className="text-sm text-slate-300">0 compliance violations detected. 100% audit defense rate.</p>
              </div>
              <Button onClick={resetAudit} variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                Reset
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> CPT Code 90837 Defense
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-emerald-400 font-mono">1,420/1,420</span> sessions billed as 90837 contain cryptographic proof of running 53+ minutes via native WebRTC logs. <strong className="text-slate-300">$0 clawback risk.</strong>
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> BBS Supervision Ratios
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-emerald-400 font-mono">100%</span> compliance with the California BBS 1:10 supervision rule across all associates. Supervision logs attached.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-emerald-500" /> Clinical Notes
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  <span className="text-emerald-400 font-mono">1,200/1,200</span> progress notes cryptographically signed and locked prior to claim submission.
                </p>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <Fingerprint className="h-4 w-4 text-emerald-500" /> Credential Verification
                  </h4>
                </div>
                <p className="text-xs text-slate-400">
                  Real-time ping confirms active NPIs, unencumbered BBS registrations, and active Malpractice Insurance for all 10 clinicians.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Dossier
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
