'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building2,
  TrendingUp,
  FileText,
  Activity,
  Bot,
  AlertCircle,
  CheckCircle2,
  Clock,
  Briefcase,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Mock Negotiation Logs
const negotiationLogs = [
  { time: '09:41 AM', agent: 'Theraflow AI', text: 'Initiating rate renegotiation with Optum for CPT 90837 (60 min psychotherapy).', type: 'system' },
  { time: '09:42 AM', agent: 'Optum Provider Relations', text: 'Current contracted rate is $105.00. Standard increase is 3% ($108.15).', type: 'payer' },
  { time: '09:42 AM', agent: 'Theraflow AI', text: 'Counter-offering $135.00. Justification: Local demand for specialized trauma therapy exceeds supply by 41%. Provider maintains a 99% clean claim rate and 0% clawback history over 24 months.', type: 'ai' },
  { time: '09:45 AM', agent: 'Optum Provider Relations', text: 'Reviewing metrics... We can authorize a tier 2 exception. Offer is $122.00.', type: 'payer' },
  { time: '09:45 AM', agent: 'Theraflow AI', text: 'Rejecting $122.00. Based on regional median and provider quality score (98/100), minimum acceptable rate is $130.00. Attaching clinical outcomes report.', type: 'ai' },
  { time: '09:51 AM', agent: 'Optum Provider Relations', text: 'Exception approved by Director. Final rate for CPT 90837 locked at $130.00. Effective immediately.', type: 'payer' },
  { time: '09:51 AM', agent: 'Theraflow AI', text: 'Contract amendment accepted. Executing digital signature.', type: 'success' },
];

export default function CredentialingPage() {
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate real-time negotiation
    const interval = setInterval(() => {
      setActiveLogIndex((prev) => (prev < negotiationLogs.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const panels = [
    { name: 'Optum', status: 'Rate Locked', rate: '$130', stdRate: '$105', icon: Building2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { name: 'Aetna', status: 'Negotiating', rate: 'Pending', stdRate: '$110', icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { name: 'Cigna', status: 'CAQH Sync', rate: 'Pending', stdRate: '$115', icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { name: 'BCBS', status: 'Active', rate: '$145', stdRate: '$120', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-emerald-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
              Concierge Credentialing
            </span>
          </h1>
          <p className="text-slate-400 mt-2">
            AI-Driven Rate Negotiation & Panel Management
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
            <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Active Panels</div>
            <div className="text-xl font-bold text-white flex items-center gap-2">
              4 / 8 <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <div className="text-xs text-emerald-400/80 uppercase tracking-wider mb-1">Total Rate Arbitrage</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              +$24,500 <span className="text-xs font-normal text-emerald-400/60">/yr</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Live AI Negotiation Terminal */}
        <div className="xl:col-span-2 space-y-8">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 flex flex-col h-[500px]">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center relative">
                  <Bot className="h-5 w-5 text-indigo-400" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Live AI Negotiation</h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <Activity className="h-3 w-3 text-emerald-400" />
                    Target: Optum CPT 90837
                  </p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium uppercase tracking-wider">
                In Progress
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {negotiationLogs.slice(0, activeLogIndex + 1).map((log, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300",
                    log.type === 'payer' ? "items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="text-[10px] text-slate-500 font-mono">{log.time}</span>
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      log.type === 'ai' ? "text-indigo-400" :
                      log.type === 'payer' ? "text-amber-400" :
                      log.type === 'success' ? "text-emerald-400" : "text-slate-400"
                    )}>{log.agent}</span>
                  </div>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed",
                    log.type === 'ai' ? "bg-indigo-500/10 border border-indigo-500/20 text-slate-200 rounded-tl-none" :
                    log.type === 'payer' ? "bg-slate-800 border border-slate-700 text-slate-300 rounded-tr-none" :
                    log.type === 'success' ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium w-full text-center rounded-xl" :
                    "bg-slate-800/50 text-slate-400 w-full text-center rounded-xl font-mono text-xs"
                  )}>
                    {log.text}
                  </div>
                </div>
              ))}
              {activeLogIndex < negotiationLogs.length - 1 && (
                <div className="flex items-start animate-pulse">
                  <div className="px-4 py-3 rounded-2xl bg-slate-800/50 border border-slate-700 rounded-tl-none flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                    <div className="w-2 h-2 rounded-full bg-slate-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Panel Status & Arbitrage */}
        <div className="space-y-6">
          
          {/* Arbitrage Card */}
          <div className="glass-panel p-6 rounded-2xl border-emerald-500/20 bg-gradient-to-br from-slate-900 to-emerald-900/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Rate Arbitrage
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-sm text-slate-400 mb-1">Standard Market Rate (Avg)</div>
                <div className="text-2xl font-bold text-slate-300">$110.00</div>
              </div>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 opacity-10">
                  <TrendingUp className="h-24 w-24 text-emerald-400" />
                </div>
                <div className="text-sm text-emerald-400/80 mb-1">Theraflow Negotiated Rate</div>
                <div className="text-3xl font-bold text-emerald-400 flex items-baseline gap-2">
                  $137.50
                  <span className="text-sm font-medium text-emerald-400/80">+25%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Status */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-white mb-6">Payer Panels</h3>
            
            <div className="space-y-3">
              {panels.map((panel, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-slate-700/50 bg-slate-800/30 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", panel.bg)}>
                      <panel.icon className={cn("h-5 w-5", panel.color)} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{panel.name}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        {panel.status === 'Active' || panel.status === 'Rate Locked' ? (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                        ) : panel.status === 'Negotiating' ? (
                          <Activity className="h-3 w-3 text-amber-400" />
                        ) : (
                          <Clock className="h-3 w-3 text-indigo-400" />
                        )}
                        {panel.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn("text-sm font-bold", panel.rate !== 'Pending' ? 'text-emerald-400' : 'text-slate-400')}>
                      {panel.rate}
                    </div>
                    <div className="text-[10px] text-slate-500 line-through">
                      {panel.stdRate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white">
              Add New Payer <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
