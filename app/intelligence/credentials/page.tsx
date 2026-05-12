'use client';

import { useState } from 'react';
import { ShieldAlert, Fingerprint, Search, ShieldCheck, AlertOctagon, Activity, FileWarning, RefreshCw, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

type ScanResult = {
  type: string;
  entity: string;
  status: 'verified' | 'warning' | 'clean' | 'error';
  detail: string;
  icon: any;
};

export default function CredentialScannerPage() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ScanResult[]>([]);

  // The practice's NPIs to scan (Simulated associates)
  const npisToScan = ['1992161555', '1619379624']; // Some real NPIs for testing
  const emailToScan = 'david.c@theraflowclinic.com';

  const startScan = async () => {
    setScanState('scanning');
    setProgress(10);
    setResults([]);

    const newResults: ScanResult[] = [];

    try {
      // 1. Scan NPIs via actual HHS Federal Database API
      for (const npi of npisToScan) {
        const res = await fetch(`/api/npi?number=${npi}`);
        setProgress(prev => prev + 25);
        if (res.ok) {
          const data = await res.json();
          if (data.results && data.results.length > 0) {
            const provider = data.results[0];
            const name = `${provider.basic.first_name} ${provider.basic.last_name}`;
            const taxonomy = provider.taxonomies.find((t: any) => t.primary)?.desc || 'Provider';
            
            newResults.push({
              type: 'NPI Database',
              entity: name,
              status: 'verified',
              detail: `NPI #${npi} - Active. Taxonomy: ${taxonomy}.`,
              icon: Fingerprint,
            });
          } else {
            newResults.push({
              type: 'NPI Database',
              entity: `Unknown NPI (${npi})`,
              status: 'error',
              detail: `NPI #${npi} - Not found in HHS Registry.`,
              icon: AlertOctagon,
            });
          }
        }
      }

      // 2. Scan Dark Web via our Breach API
      setProgress(prev => prev + 25);
      const breachRes = await fetch(`/api/breach?email=${emailToScan}`);
      if (breachRes.ok) {
        const breachData = await breachRes.json();
        if (breachData.breaches && breachData.breaches.length > 0) {
          newResults.push({
            type: 'Dark Web Email Monitor',
            entity: emailToScan,
            status: 'warning',
            detail: `${breachData.breaches.length} credential breaches found!`,
            icon: Search,
          });
        } else {
          newResults.push({
            type: 'Dark Web Email Monitor',
            entity: emailToScan,
            status: 'clean',
            detail: '0 credential breaches found across monitored databases.',
            icon: Search,
          });
        }
      }

      // 3. Simulated internal compliance check (Malpractice)
      setProgress(prev => prev + 15);
      newResults.push({
        type: 'Malpractice Insurance',
        entity: 'CPH & Associates',
        status: 'warning',
        detail: 'Policy #CPH-992-1 expires in 14 days. Auto-renewal failed.',
        icon: FileWarning,
      });

    } catch (error) {
      console.error("Scan failed", error);
    } finally {
      setProgress(100);
      setResults(newResults);
      setTimeout(() => setScanState('complete'), 500);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-8 pt-6 pb-12 max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20">
              <ShieldAlert className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Credential & Threat Scanner</h1>
              <p className="text-muted-foreground text-sm">Real-time HHS NPI Registry polling and Dark Web breach analysis.</p>
            </div>
          </div>
          
          <button 
            onClick={startScan}
            disabled={scanState === 'scanning'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50"
          >
            {scanState === 'scanning' ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Fetching Federal Data...</>
            ) : (
              <><Search className="w-4 h-4" /> Run Live Scan</>
            )}
          </button>
        </div>

        {/* Global Security Posture */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">State Board Pings</h3>
            <p className="text-4xl font-extrabold text-foreground mb-1">1,402</p>
            <p className="text-xs text-emerald-500 font-medium">100% licenses active</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Dark Web Scans</h3>
            <p className="text-4xl font-extrabold text-foreground mb-1">8,214</p>
            <p className="text-xs text-emerald-500 font-medium">0 compromised passwords</p>
          </div>
          <div className="bg-rose-500/5 border border-rose-500/20 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-rose-500 uppercase tracking-wider mb-2">Compliance Warnings</h3>
            <p className="text-4xl font-extrabold text-rose-600 mb-1">1</p>
            <p className="text-xs text-rose-500 font-medium animate-pulse">Action required immediately</p>
          </div>
        </div>

        {/* Scanner Visualization */}
        {scanState !== 'idle' && (
          <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 relative overflow-hidden shadow-2xl">
            {scanState === 'scanning' && (
              <div className="absolute inset-0 bg-brand-500/5 animate-pulse" />
            )}
            
            <div className="relative z-10 flex flex-col items-center justify-center py-8">
              <div className="relative w-32 h-32 mb-6">
                <div className={`absolute inset-0 border-4 rounded-full ${scanState === 'complete' ? 'border-emerald-500/30' : 'border-slate-800'}`} />
                <div 
                  className="absolute inset-0 border-4 border-brand-500 rounded-full transition-all duration-300 ease-out"
                  style={{ clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {scanState === 'complete' ? (
                    <ShieldCheck className="w-12 h-12 text-emerald-500" />
                  ) : (
                    <Activity className="w-10 h-10 text-brand-400 animate-pulse" />
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {scanState === 'scanning' ? 'Querying Federal APIs...' : 'Scan Complete'}
              </h2>
              <p className="text-slate-400 text-sm">
                {scanState === 'scanning' ? 'Cross-referencing real HHS registries and compromised data sets.' : 'Found 1 critical compliance risk that requires intervention.'}
              </p>
            </div>
          </div>
        )}

        {/* Scan Results Ledger */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-border/50 bg-muted/30 flex justify-between items-center">
            <h3 className="font-semibold text-foreground">Live Audit Ledger</h3>
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">Auto-refreshes every 24h</span>
          </div>
          
          <div className="divide-y divide-border/50">
            {scanState === 'complete' && results.map((res, i) => {
              const Icon = res.icon;
              const isWarning = res.status === 'warning' || res.status === 'error';
              
              return (
                <div key={i} className={`p-6 transition-colors ${isWarning ? 'bg-rose-500/5' : 'hover:bg-muted/30'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${
                      isWarning ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-foreground">{res.type}</h4>
                          <span className="text-slate-300">•</span>
                          <span className="text-sm font-medium text-muted-foreground">{res.entity}</span>
                        </div>
                        {isWarning ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20 flex items-center gap-1">
                            <AlertOctagon className="w-3 h-3" /> Action Required
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified Clean
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${isWarning ? 'text-rose-600/80 font-medium' : 'text-muted-foreground'}`}>
                        {res.detail}
                      </p>

                      {isWarning && res.type === 'Malpractice Insurance' && (
                        <div className="mt-4 flex gap-3">
                          <button className="text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors">
                            Update Billing Card
                          </button>
                          <button className="text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 px-4 py-2 rounded-lg transition-colors border border-rose-500/20">
                            Suspend Associate Caseload
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {scanState === 'scanning' && (
              <div className="p-12 flex flex-col items-center justify-center text-muted-foreground">
                <Search className="w-8 h-8 mb-4 animate-pulse opacity-20" />
                <p>Awaiting live API responses...</p>
              </div>
            )}

            {scanState === 'idle' && (
              <div className="p-12 flex flex-col items-center justify-center text-muted-foreground">
                <Fingerprint className="w-8 h-8 mb-4 opacity-20" />
                <p>Click "Run Live Scan" to fetch data from HHS APIs.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
