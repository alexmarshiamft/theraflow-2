'use client';

import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Terminal, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Lock, 
  Send,
  Loader2,
  FileCheck,
  Search,
  Zap,
  Check,
  Building2,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function AuditSimulator() {
  const [phase, setPhase] = useState<'request' | 'compiling' | 'success'>('request');
  const [logs, setLogs] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(14); // 14 days to respond

  const handleCompile = () => {
    setPhase('compiling');
    
    const compilationSteps = [
      "> Initializing Theraflow Secure Audit Engine...",
      "> Establishing encrypted connection to EMR database...",
      "> Locating patient file: #P-84729 (Sarah J.)",
      "> Extracting date range: 01/01/2026 - 03/31/2026...",
      "> Pulling Initial Intake Assessment & MSE...",
      "> Verifying Medical Necessity (F41.1 Generalized Anxiety Disorder)... [PASS]",
      "> Extracting Individualized Treatment Plan (ITP)... [FOUND]",
      "> Cross-referencing ITP goals with 12 progress notes...",
      "> Reconciling CPT 90837 timestamps (60 min) vs actual session lengths... [PASS]",
      "> Running Anti-Cloning Lexical Analysis on progress notes...",
      "> Note variance detected: 94% unique content... [100% UNIQUE PASS]",
      "> Redacting highly sensitive Psychotherapy (Process) Notes to protect PHI...",
      "> Verifying provider signatures and credentialing... [PASS]",
      "> Packaging 14 documents into secure, encrypted defense packet...",
      "> Audit packet compilation complete."
    ];

    let currentStep = 0;
    setLogs([]); // Reset logs

    const interval = setInterval(() => {
      if (currentStep < compilationSteps.length) {
        setLogs(prev => [...prev, compilationSteps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase('success'), 800);
      }
    }, 450); // Cinematic speed for reading
  };

  return (
    <div className="p-8 max-w-5xl mx-auto min-h-[calc(100vh-6rem)] flex flex-col justify-center">
      
      {/* PHASE 1: The Scary Request */}
      {phase === 'request' && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-rose-950/30 border-2 border-rose-900/50 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(225,29,72,0.1)]">
            
            {/* Header */}
            <div className="bg-rose-600/10 border-b border-rose-900/50 p-6 flex items-start gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <AlertTriangle className="w-64 h-64" />
              </div>
              
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 animate-pulse">
                <ShieldAlert className="w-8 h-8 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white tracking-tight">NOTICE OF DOCUMENTATION AUDIT</h1>
                  <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase border border-rose-500/30">Action Required</span>
                </div>
                <p className="text-rose-200/70 text-lg">Optum Behavioral Health Network Quality Assurance Division</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8 relative z-10">
              <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
                <p className="text-slate-300 text-lg leading-relaxed">
                  Dear Marshi Family Therapy,
                  <br /><br />
                  This letter serves as official notification that your practice has been selected for a routine documentation and coding audit. To ensure compliance with medical necessity requirements and billing standards, you are required to submit complete medical records for the following patient within <strong className="text-rose-400">14 calendar days</strong>. Failure to comply may result in claim clawbacks or suspension from the network.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Patient Details</h3>
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient ID</span>
                      <span className="text-white font-mono">OPT-84729-SJ</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dates of Service</span>
                      <span className="text-white">01/01/2026 - 03/31/2026</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Billed Codes</span>
                      <span className="text-white font-mono">90791, 90837</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Required Documents</h3>
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                    {["Initial Diagnostic Intake & MSE", "Individualized Treatment Plan", "All Progress Notes (w/ start/stop times)", "Signed Consents & HIPAA Disclosures"].map((doc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-slate-300 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-medium">
                  <Clock className="w-5 h-5" />
                  Due in {countdown} days
                </div>
                <Button 
                  onClick={handleCompile}
                  className="bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/20 h-14 px-8 rounded-xl text-lg group"
                >
                  <Zap className="w-5 h-5 mr-2 text-brand-200 group-hover:animate-pulse" />
                  Auto-Compile Defense Packet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: Compilation Engine */}
      {phase === 'compiling' && (
        <div className="bg-[#0A0A0A] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-mono animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between px-4 py-3 bg-[#111] border-b border-slate-800">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Terminal className="w-4 h-4" />
              <span>theraflow_audit_engine_v2.4.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
            </div>
          </div>
          
          <div className="p-6 h-[400px] overflow-y-auto space-y-2 relative">
            {logs.map((log, index) => {
              const isPass = log.includes('[PASS]') || log.includes('[FOUND]') || log.includes('[100% UNIQUE PASS]');
              const isRedacted = log.includes('[REDACTED]');
              
              return (
                <div 
                  key={index} 
                  className={cn(
                    "text-sm tracking-tight animate-in slide-in-from-bottom-2 fade-in duration-300",
                    isPass ? "text-emerald-400" : isRedacted ? "text-amber-400" : "text-brand-300"
                  )}
                >
                  {log}
                </div>
              );
            })}
            
            <div className="flex items-center gap-2 text-slate-500 text-sm mt-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Success State */}
      {phase === 'success' && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Audit Packet Ready</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Theraflow has successfully compiled, scrubbed, and verified 14 documents. Your records show 100% compliance with Optum's medical necessity and coding guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Cards */}
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileCheck className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Medical Necessity</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">Diagnosis (F41.1) correctly linked to interventions across all 12 sessions.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                <Check className="w-3 h-3" /> VERIFIED
              </div>
            </div>

            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Coding Accuracy</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">Start/stop times strictly support billed CPT 90837 (60 minutes).</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                <Check className="w-3 h-3" /> VERIFIED
              </div>
            </div>

            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <FileText className="w-16 h-16 text-emerald-400" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-bold mb-1">Anti-Cloning</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">Lexical analysis proves 100% unique clinical content per session.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                <Check className="w-3 h-3" /> VERIFIED
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="outline" className="h-14 px-8 border-slate-700 hover:bg-slate-800 text-white rounded-xl w-full sm:w-auto">
              <Download className="w-5 h-5 mr-2 text-slate-400" />
              Download PDF Copy
            </Button>
            <Button size="lg" className="h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl w-full sm:w-auto shadow-lg shadow-emerald-600/20 border-0">
              <Lock className="w-5 h-5 mr-2 text-emerald-200" />
              Generate Secure Auditor Link
            </Button>
          </div>

          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={() => setPhase('request')} className="text-slate-500 hover:text-slate-300">
              Reset Demo
            </Button>
          </div>

        </div>
      )}

    </div>
  );
}
