'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/Card';
import { ShieldCheck, Server, AlertCircle, FileSearch, ArrowRight, Check, Activity, FileStack, RefreshCw } from 'lucide-react';

type Claim = {
  id: string;
  client: string;
  cpt: string;
  status: 'scanning' | 'scrubbed' | 'fixed';
  issue?: string;
  fix?: string;
};

export default function ClaimScrubberPage() {
  const [claims, setClaims] = useState<Claim[]>([
    { id: '1042', client: 'John S.', cpt: '90837', status: 'scrubbed' },
    { id: '1043', client: 'Mary K.', cpt: '90834', status: 'scrubbed' },
    { id: '1044', client: 'David T.', cpt: '90847', status: 'scanning', issue: 'Missing Modifier 95 (Telehealth)', fix: 'Appended Modifier 95' },
    { id: '1045', client: 'Sarah L.', cpt: '90837', status: 'scanning' },
    { id: '1046', client: 'Robert B.', cpt: '99214', status: 'scanning', issue: 'ICD-10 Code Mismatch', fix: 'Mapped to F41.1' },
  ]);

  const [scrubCount, setScrubCount] = useState(1284);
  const [savedAmount, setSavedAmount] = useState(42500);

  // Simulate conveyor belt scanning
  useEffect(() => {
    const interval = setInterval(() => {
      setClaims(prev => {
        const next = [...prev];
        const scanningIndex = next.findIndex(c => c.status === 'scanning');
        
        if (scanningIndex !== -1) {
          const claim = next[scanningIndex];
          if (claim.issue) {
            next[scanningIndex] = { ...claim, status: 'fixed' };
            setSavedAmount(s => s + 150); // Simulate saving money on denials
          } else {
            next[scanningIndex] = { ...claim, status: 'scrubbed' };
          }
          setScrubCount(c => c + 1);
        }
        
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#050505] font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
                  <FileSearch className="w-6 h-6 text-emerald-400" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">AI Claim Scrubber</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg">
                Autonomously audits and corrects insurance claims before submission to prevent denials and maximize revenue cycle speed.
              </p>
            </div>
            
            <div className="text-right hidden md:block space-y-2">
              <div className="flex items-center gap-3 justify-end">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Revenue Saved</p>
                <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg text-emerald-400 font-bold font-mono">
                  ${savedAmount.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-3 justify-end">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Claims Scrubbed</p>
                <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg text-slate-300 font-bold font-mono">
                  {scrubCount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8">
          
          <div className="mb-6 flex items-center gap-3 text-sm font-bold text-brand-400 uppercase tracking-widest">
            <Activity className="w-4 h-4 animate-pulse" /> Live Scrubber Conveyor
          </div>

          <div className="space-y-4">
            {claims.map((claim) => (
              <Card 
                key={claim.id} 
                className={`transition-all duration-500 border ${
                  claim.status === 'scanning' ? 'bg-slate-900 border-brand-500/50 shadow-[0_0_15px_rgba(14,165,233,0.1)] translate-x-4' : 
                  claim.status === 'fixed' ? 'bg-emerald-500/10 border-emerald-500/30' : 
                  'bg-black border-slate-800 opacity-50 grayscale'
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  
                  {/* Claim Info */}
                  <div className="flex items-center gap-4 w-1/4">
                    <div className={`p-2 rounded-lg ${
                      claim.status === 'scanning' ? 'bg-brand-500/20 text-brand-400' :
                      claim.status === 'fixed' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-slate-800 text-slate-500'
                    }`}>
                      <FileStack className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`font-bold ${claim.status === 'scanning' ? 'text-white' : 'text-slate-300'}`}>Claim #{claim.id}</p>
                      <p className="text-xs text-slate-500">Client: {claim.client} • CPT: {claim.cpt}</p>
                    </div>
                  </div>

                  {/* Scrubber Status */}
                  <div className="flex-1 flex justify-center">
                    {claim.status === 'scanning' && (
                      <div className="flex items-center gap-3 text-brand-400">
                        <Server className="w-4 h-4 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">AI Scrubbing in progress...</span>
                      </div>
                    )}
                    {claim.status === 'fixed' && (
                      <div className="flex items-center gap-4 w-full px-8">
                        <div className="flex items-center gap-2 text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 text-xs font-bold w-1/2">
                          <AlertCircle className="w-4 h-4 shrink-0" /> {claim.issue}
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600 shrink-0" />
                        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-xs font-bold w-1/2">
                          <Check className="w-4 h-4 shrink-0" /> {claim.fix}
                        </div>
                      </div>
                    )}
                    {claim.status === 'scrubbed' && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Clean Claim - Approved</span>
                      </div>
                    )}
                  </div>

                  {/* Final Action */}
                  <div className="w-32 text-right">
                    {claim.status === 'scanning' && (
                      <RefreshCw className="w-5 h-5 text-brand-400 animate-spin ml-auto" />
                    )}
                    {(claim.status === 'fixed' || claim.status === 'scrubbed') && (
                      <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                        Ready to Bill
                      </div>
                    )}
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
