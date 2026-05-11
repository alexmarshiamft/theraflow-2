'use client';

import { useState, useEffect } from 'react';
import { Play, CheckCircle2, Circle, AlertCircle, FileText, Banknote, ShieldCheck, PenTool, Lock } from 'lucide-react';

export function EndOfWeekSimulator() {
  const [mode, setMode] = useState<'owner' | 'associate'>('owner');
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'complete'>('idle');
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  const ownerSteps = [
    { id: 'scan', label: 'Auditing 14/14 Staff Clinical Notes', icon: <FileText className="w-5 h-5" /> },
    { id: 'compliance', label: 'Running BBS Ratio Compliance Check', icon: <AlertCircle className="w-5 h-5" /> },
    { id: 'claims', label: 'Locking 412 Claims & Dispatching to Clearinghouse', icon: <Lock className="w-5 h-5" /> },
    { id: 'payroll', label: 'Executing Payroll & Commission Splits', icon: <Banknote className="w-5 h-5" /> },
    { id: 'secure', label: 'Cryptographically Signing Weekly Ledger', icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  const associateSteps = [
    { id: 'timesheet', label: 'Compiling Timesheet (32 Clinical, 4 Admin)', icon: <FileText className="w-5 h-5" /> },
    { id: 'recoding', label: 'Recoding 90837 -> 90834 for Audit Safety', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'sign', label: 'Requesting 1-Click BBS Log Signature', icon: <PenTool className="w-5 h-5" /> },
    { id: 'deposit', label: 'Direct Deposit Initiated: $1,420.50', icon: <Banknote className="w-5 h-5" /> },
  ];

  const steps = mode === 'owner' ? ownerSteps : associateSteps;

  const runSimulation = () => {
    setSimulationState('running');
    setActiveStepIndex(0);
  };

  useEffect(() => {
    if (simulationState === 'running' && activeStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setActiveStepIndex(prev => prev + 1);
      }, 1500); // 1.5 seconds per step
      return () => clearTimeout(timer);
    } else if (simulationState === 'running' && activeStepIndex === steps.length) {
      setTimeout(() => {
        setSimulationState('complete');
      }, 500);
    }
  }, [simulationState, activeStepIndex, steps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      {/* Mode Toggle */}
      <div className="flex items-center justify-center mb-12">
        <div className="bg-slate-900/80 p-1 rounded-2xl flex items-center border border-slate-800 shadow-xl backdrop-blur-md">
          <button
            onClick={() => { setMode('owner'); setSimulationState('idle'); setActiveStepIndex(-1); }}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              mode === 'owner' 
                ? 'bg-brand-600 text-white shadow-[0_0_20px_rgba(14,165,233,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Clinic Owner View
          </button>
          <button
            onClick={() => { setMode('associate'); setSimulationState('idle'); setActiveStepIndex(-1); }}
            className={`px-8 py-3 rounded-xl font-bold transition-all ${
              mode === 'associate' 
                ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Associate View
          </button>
        </div>
      </div>

      {/* Main Interface */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 relative overflow-hidden backdrop-blur-xl">
        {/* Ambient Glows */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 ${
          simulationState === 'complete' ? 'bg-emerald-500' : 
          mode === 'owner' ? 'bg-brand-500' : 'bg-purple-500'
        }`} />

        <div className="relative z-10 flex flex-col md:flex-row gap-12">
          
          {/* Left Column: CTA & Status */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">
              Friday Wrap-Up
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
              {mode === 'owner' 
                ? 'Stop chasing down notes and manually calculating splits. One click runs payroll, locks notes, and signs the ledger.'
                : 'Your week is done. Timesheets are generated automatically, coded safely, and your direct deposit is queued up.'}
            </p>

            {simulationState === 'idle' && (
              <button
                onClick={runSimulation}
                className={`group relative flex items-center justify-center gap-3 w-full max-w-xs py-5 rounded-2xl font-bold text-white transition-all hover:scale-105 active:scale-95 ${
                  mode === 'owner' ? 'bg-brand-600 hover:bg-brand-500' : 'bg-purple-600 hover:bg-purple-500'
                }`}
              >
                <Play className="w-5 h-5 fill-current" />
                Execute End of Week
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 -z-10 group-hover:opacity-100 transition-opacity ${
                  mode === 'owner' ? 'bg-brand-600' : 'bg-purple-600'
                }`} />
              </button>
            )}

            {simulationState === 'running' && (
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 border-t-2 border-l-2 border-brand-500 rounded-full animate-spin"></div>
                    <div className="w-8 h-8 bg-brand-500/20 rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">System Processing</h3>
                    <p className="text-sm text-brand-400 animate-pulse">Running autonomous ledger...</p>
                  </div>
                </div>
              </div>
            )}

            {simulationState === 'complete' && (
              <div 
                className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 transition-all duration-500 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-400">Week Closed</h3>
                </div>
                <p className="text-emerald-400/80 mt-2 font-medium">
                  {mode === 'owner' ? 'Payroll dispatched and 412 claims successfully submitted.' : 'Direct deposit initiated. Enjoy your weekend!'}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Execution Steps */}
          <div className="flex-1 bg-slate-950/50 rounded-2xl border border-slate-800/50 p-8 shadow-inner">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Execution Log</h4>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isActive = activeStepIndex === index;
                const isPast = activeStepIndex > index || simulationState === 'complete';

                return (
                  <div key={step.id} className="flex items-start gap-4 relative">
                    {/* Connecting Line */}
                    {index !== steps.length - 1 && (
                      <div className={`absolute left-3.5 top-8 bottom-[-24px] w-0.5 rounded-full transition-colors duration-500 ${
                        isPast ? 'bg-emerald-500/50' : 'bg-slate-800'
                      }`} />
                    )}

                    <div className={`relative z-10 w-7 h-7 rounded-full flex flex-shrink-0 items-center justify-center mt-0.5 transition-all duration-500 ${
                      isPast ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                      isActive ? 'bg-slate-800 border-2 border-brand-500 text-brand-400 animate-pulse' :
                      'bg-slate-900 border border-slate-800 text-slate-600'
                    }`}>
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-3 h-3" />}
                    </div>

                    <div className="flex-1">
                      <p className={`font-medium transition-colors duration-300 ${
                        isPast ? 'text-slate-300' :
                        isActive ? 'text-white' :
                        'text-slate-600'
                      }`}>
                        {step.label}
                      </p>
                      
                      {isActive && (
                        <div className="mt-2 text-sm text-slate-500 flex items-center gap-2 animate-in fade-in duration-300">
                          <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
