'use client';

import { useState, useEffect } from 'react';
import { Shield, ShieldAlert, AlertTriangle, FileCheck, Loader2, Fingerprint, Clock, CheckCircle2, FileText, Lock, ChevronRight, Activity, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

type AuditState = 'idle' | 'compiling' | 'ready';

const COMPILATION_LOGS = [
  "Intercepting Optum Audit Notice: Request for 10 high-acuity patient charts...",
  "Initializing Golden Thread Compiler...",
  "Scanning Database for Intake Assessments...",
  "Verifying Biopsychosocial Data & Medical Necessity (DSM-5)... [OK]",
  "Aggregating Active Treatment Plans...",
  "Cross-referencing Treatment Plan Goals with Progress Note Interventions...",
  "Analyzing 1,420 Progress Notes for CPT 90837 compliance...",
  "Verifying session durations (> 53 minutes)... [OK]",
  "Validating cryptographic clinician signatures on all documents...",
  "Checking active NPI, DEA, and Malpractice Insurance statuses... [OK]",
  "Packaging 10 comprehensive dossiers into encrypted PDF...",
  "Audit Defense Compilation Complete. Zero vulnerabilities detected."
];

export default function AuditDefensePage() {
  const [auditState, setAuditState] = useState<AuditState>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const startCompilation = () => {
    setAuditState('compiling');
    setLogs([]);
    
    // Simulate line-by-line logging
    COMPILATION_LOGS.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        
        if (index === COMPILATION_LOGS.length - 1) {
          setTimeout(() => {
            setAuditState('ready');
          }, 1000);
        }
      }, index * 800); // 800ms between logs
    });
  };

  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex-1 flex flex-col relative z-10">
        <main className="flex-1 overflow-y-auto p-4 relative">
          
          {/* Ambient Background Glows */}
          <div className={`absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ${
            auditState === 'idle' ? 'bg-slate-500/5' : 
            auditState === 'compiling' ? 'bg-rose-500/10' : 
            'bg-emerald-500/10'
          }`} />

          <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wide mb-2">
                  <Shield className="h-3 w-3" />
                  Automated Compliance Engine
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  Audit Defense <span className="text-white/30">Command Center</span>
                </h1>
                <p className="text-white/50 text-lg max-w-2xl">
                  Instantly compile flawless, cryptographically verified document packages in response to payer audits. The Golden Thread, guaranteed.
                </p>
              </div>
            </div>

            {/* Stage 1: IDLE */}
            {auditState === 'idle' && (
              <div className="mt-12">
                <div className="border border-rose-500/30 bg-rose-950/20 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(244,63,94,0.05)] relative overflow-hidden">
                  {/* Warning stripes */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(244,63,94,0.5)_10px,rgba(244,63,94,0.5)_20px)]" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-8 w-8 text-rose-500" />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-2">Notice of Post-Payment Audit</h2>
                        <p className="text-rose-200/70 text-lg">
                          Optum Behavioral Health has initiated a random post-payment audit. They are requesting complete clinical dossiers for 10 high-acuity patients spanning the last 90 days.
                        </p>
                      </div>
                      
                      <div className="bg-black/40 rounded-xl p-4 border border-rose-500/10 font-mono text-sm text-rose-200/60 space-y-2">
                        <p><span className="text-rose-400">REQUEST ID:</span> OPT-2026-88942A</p>
                        <p><span className="text-rose-400">REQUIRED DOCUMENTS:</span> Intake Assessments, Signed Treatment Plans, All Progress Notes matching CPT 90837, Discharge Summaries.</p>
                        <p><span className="text-rose-400">DEADLINE:</span> 14 Days</p>
                        <p><span className="text-rose-400">PENALTY RISK:</span> Potential Clawback of $42,500 for missing Golden Thread documentation.</p>
                      </div>

                      <div className="pt-4">
                        <Button 
                          onClick={startCompilation}
                          className="bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_30px_rgba(225,29,72,0.4)] px-8 py-6 text-lg rounded-xl transition-all hover:scale-105"
                        >
                          <ShieldAlert className="h-5 w-5 mr-3" />
                          Initialize Automated Defense
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stage 2: COMPILING */}
            {auditState === 'compiling' && (
              <div className="mt-12 bg-black/40 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-500/5 to-transparent pointer-events-none" />
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center animate-pulse">
                    <Loader2 className="h-6 w-6 text-brand-400 animate-spin" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Weaving the Golden Thread...</h2>
                    <p className="text-brand-400 font-mono text-sm">Compiling and cross-referencing clinical data.</p>
                  </div>
                </div>

                <div className="bg-[#0a0a0a] rounded-xl p-6 border border-white/5 h-80 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
                  
                  <div className="space-y-4 font-mono text-sm flex flex-col justify-end h-full">
                    {logs.map((log, i) => (
                      <div 
                        key={i} 
                        className={`flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                          log.includes('[OK]') ? 'text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        <ChevronRight className="h-4 w-4 shrink-0 mt-0.5 text-brand-500" />
                        <span>{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stage 3: READY */}
            {auditState === 'ready' && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-emerald-500/10 border border-emerald-500/30 rounded-3xl p-8 mb-8 relative overflow-hidden backdrop-blur-md">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                  <div>
                    <h2 className="text-3xl font-bold text-emerald-400 flex items-center gap-3">
                      <Shield className="h-8 w-8" />
                      Dossier Compiled Successfully
                    </h2>
                    <p className="text-emerald-100/70 text-lg mt-2">
                      Zero compliance violations detected. The Golden Thread is 100% intact across all requested records. Clawback risk mitigated.
                    </p>
                  </div>
                  <Button className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] px-8 py-6 text-lg rounded-xl shrink-0">
                    <Download className="h-5 w-5 mr-3" />
                    Download Encrypted Dossier
                  </Button>
                </div>

                <h3 className="text-xl font-bold text-white mb-6 pl-2">Defense Package Contents</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Intake & Med Necessity */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">100% Verified</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Intake & Medical Necessity</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      All 10 patient charts contain a completed biopsychosocial assessment with a valid DSM-5 diagnosis justifying the current level of care.
                    </p>
                  </div>

                  {/* Treatment Plans */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">100% Signed</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Treatment Plans</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Measurable goals established and updated within 90-day compliance windows. Cryptographically signed by both clinician and patient.
                    </p>
                  </div>

                  {/* Progress Notes */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">1,420 Notes Matched</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">CPT Code Compliance</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Every progress note linked to CPT 90837 automatically verified to have a start/stop duration of 53+ minutes via native WebRTC logs. Interventions cross-referenced to Treatment Plan.
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Fingerprint className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Active Status</Badge>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Clinician Credentials</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      Real-time ping confirms active NPIs, unencumbered state licenses, and active Malpractice Insurance for all involved clinicians at the time of service.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
