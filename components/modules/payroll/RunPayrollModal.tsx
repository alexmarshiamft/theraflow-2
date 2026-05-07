'use client';

import { useState, useEffect } from 'react';
import { Shield, Loader2, CheckCircle2, AlertTriangle, Play, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface RunPayrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  payrollId?: string;
  period?: string;
}

type AuditState = 'idle' | 'scanning' | 'anomaly' | 'resolving' | 'ready';

export function RunPayrollModal({ isOpen, onClose, payrollId, period }: RunPayrollModalProps) {
  const [state, setState] = useState<AuditState>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('Initializing AI Auditor...');

  useEffect(() => {
    if (isOpen) {
      setState('idle');
      setScanProgress(0);
    }
  }, [isOpen]);

  const startAudit = () => {
    setState('scanning');
    setScanProgress(0);
    
    // Simulate AI audit progress
    setTimeout(() => { setScanProgress(20); setScanMessage('Cross-referencing state labor laws...'); }, 800);
    setTimeout(() => { setScanProgress(45); setScanMessage('Analyzing 12 employee timesheets...'); }, 1600);
    setTimeout(() => { setScanProgress(70); setScanMessage('Calculating BBS clinical-to-supervision ratios...'); }, 2400);
    setTimeout(() => { setScanProgress(90); setScanMessage('Flagging compliance anomalies...'); }, 3200);
    setTimeout(() => { setState('anomaly'); }, 4000);
  };

  const handleOverride = () => {
    setState('ready');
  };

  const handleAutoRemediate = () => {
    setState('resolving');
    setTimeout(() => { setState('ready'); }, 3000);
  };

  const handleRunPayroll = () => {
    // In a real app, this would submit the payload to the backend
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">AI Payroll Auditor</h2>
              <p className="text-xs text-brand-600 font-medium">Protecting your practice from liability</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 min-h-[350px] flex flex-col justify-center">
          
          {state === 'idle' && (
            <div className="text-center space-y-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-brand-50 flex items-center justify-center">
                <Play className="h-10 w-10 text-brand-500 ml-1" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Run Payroll for {period || 'Current Period'}</h3>
                <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
                  Before we process $38,400.00 in gross pay, Theraflow AI will audit all timesheets for labor law compliance and BBS supervision ratios.
                </p>
              </div>
              <Button size="lg" onClick={startAudit} className="bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg mt-4">
                Start AI Audit & Run Payroll
              </Button>
            </div>
          )}

          {state === 'scanning' && (
            <div className="text-center space-y-8 max-w-sm mx-auto w-full">
              <Loader2 className="h-12 w-12 text-brand-500 animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Auditing Timesheets...</h3>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3 overflow-hidden">
                  <div 
                    className="bg-brand-500 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm font-medium text-brand-600">{scanMessage}</p>
              </div>
            </div>
          )}

          {state === 'anomaly' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-red-50 flex items-center justify-center mb-4 border border-red-100">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Compliance Anomaly Detected</h3>
                <p className="text-gray-500 text-sm mt-1">
                  The AI Auditor flagged 1 critical issue that requires your attention before running payroll.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900">BBS Ratio Violation: Jane Doe (AMFT)</h4>
                    <p className="text-sm text-red-800 mt-1 leading-relaxed">
                      Jane logged <strong>42 total hours</strong> in Week 1, exceeding the 40-hour legal maximum. 
                      Additionally, she logged <strong>15 direct counseling hours</strong> but only <strong>1 unit of supervision</strong>. 
                      Under California BBS regulations (10:1 ratio), she requires at least 2 units of supervision for any week over 10 clinical hours. Paying this timesheet without correction risks severe board penalties.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center pt-4">
                <Button variant="outline" onClick={handleOverride} className="rounded-xl border-gray-300">
                  Override & Proceed Anyway
                </Button>
                <Button onClick={handleAutoRemediate} className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-md shadow-brand-200">
                  <Sparkles className="h-4 w-4 mr-2" /> Auto-Remediate (AI Email)
                </Button>
              </div>
            </div>
          )}

          {state === 'resolving' && (
            <div className="text-center space-y-8 max-w-sm mx-auto w-full">
              <Loader2 className="h-12 w-12 text-brand-500 animate-spin mx-auto" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Auto-Remediation Active</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Drafting compliance notice to Jane Doe. Pausing her timesheet and recalculating payroll totals for the remaining 11 employees...
                </p>
              </div>
            </div>
          )}

          {state === 'ready' && (
            <div className="text-center space-y-6">
              <div className="mx-auto h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Anomaly Resolved</h3>
                <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                  Jane&apos;s timesheet is paused pending her correction, and an AI-drafted compliance email has been dispatched. Payroll has been recalculated for the remaining 11 employees. Net pay: <strong className="text-gray-900 font-semibold">$26,450.00</strong>.
                </p>
              </div>
              <Button size="lg" onClick={handleRunPayroll} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-lg mt-4 w-full max-w-xs">
                Run Updated Payroll
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
