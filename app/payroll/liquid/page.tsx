'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Shield, Zap, DollarSign, ArrowRight, Settings, Activity, Building2, TrendingUp, AlertTriangle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock ERA Data
const MOCK_ERAS = [
  { id: 'ERA-AET-9921', payer: 'Aetna', amount: 124.50, status: 'cleared', risk: 'low' },
  { id: 'ERA-OPT-4412', payer: 'Optum', amount: 108.90, status: 'cleared', risk: 'low' },
  { id: 'ERA-UHC-1198', payer: 'UHC', amount: 155.00, status: 'cleared', risk: 'low' },
  { id: 'ERA-BCB-7723', payer: 'BCBS', amount: 95.00, status: 'flagged', risk: 'high', reason: 'Deductible Unmet' },
];

export default function LiquidPayrollPage() {
  const [standardSplit] = useState(50); // 50% baseline
  const [liquidSplit, setLiquidSplit] = useState(40); // 40% default liquid access
  const [simulating, setSimulating] = useState(false);
  const [processedEras, setProcessedEras] = useState<any[]>([]);

  // Analytics
  const monthlyClaimVolume = 125000; // Total collected revenue/mo
  const optInRate = 0.65; // 65% of associates opt into liquid payroll
  
  // Math
  const standardMargin = 100 - standardSplit; // 50%
  const liquidMargin = 100 - liquidSplit; // e.g. 60%
  const marginDelta = liquidMargin - standardMargin; // e.g. +10%
  
  const liquidVolume = monthlyClaimVolume * optInRate; // $81,250
  const standardVolume = monthlyClaimVolume * (1 - optInRate); // $43,750
  
  const baseProfit = monthlyClaimVolume * (standardMargin / 100); // $62,500
  const floatYield = liquidVolume * (marginDelta / 100); // The extra profit
  const totalProjectedProfit = baseProfit + floatYield;

  const simulateEraProcessing = () => {
    setSimulating(true);
    setProcessedEras([]);
    
    MOCK_ERAS.forEach((era, index) => {
      setTimeout(() => {
        setProcessedEras(prev => [...prev, era]);
        if (index === MOCK_ERAS.length - 1) {
          setTimeout(() => setSimulating(false), 1000);
        }
      }, index * 1200);
    });
  };

  return (
    <DashboardLayout>
      <div className="page-header relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wide mb-2">
              <Zap className="h-3 w-3" />
              Treasury Command Center
            </div>
            <h1 className="page-title text-4xl">Liquid Payroll Yield</h1>
            <p className="page-subtitle text-lg">Convert float time into a profit center with automated zero-touch ERA reconciliation.</p>
          </div>
          <Button onClick={simulateEraProcessing} disabled={simulating} className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            {simulating ? <Activity className="h-4 w-4 mr-2 animate-spin" /> : <DollarSign className="h-4 w-4 mr-2" />}
            Simulate Incoming ERAs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        {/* Left Column: Configurator & Yield */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Float Premium Configurator */}
          <Card className="bg-black/40 border-white/10 relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-[80px] pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5 text-brand-400" />
                Float Premium Configurator
              </CardTitle>
              <CardDescription>Set the convenience fee for instant wage access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
              
              <div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-slate-400">Standard 45-Day Split</span>
                  <span className="font-bold text-white">{standardSplit}% Associate / {100-standardSplit}% Practice</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-slate-500" style={{ width: `${standardSplit}%` }} />
                  <div className="h-full bg-brand-500" style={{ width: `${100-standardSplit}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <span className="text-brand-400 font-bold flex items-center gap-2 mb-1">
                      <Zap className="h-4 w-4" /> Instant Liquid Split
                    </span>
                    <span className="text-xs text-slate-500">Adjust associate cut for early access</span>
                  </div>
                  <span className="font-bold text-xl text-white">{liquidSplit}%</span>
                </div>
                
                <input 
                  type="range" 
                  min="20" 
                  max="49" 
                  value={liquidSplit}
                  onChange={(e) => setLiquidSplit(Number(e.target.value))}
                  className="w-full accent-brand-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Higher Margin</span>
                  <span>Lower Margin</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Practice Float Premium</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                  +{marginDelta}% Margin
                </span>
              </div>

            </CardContent>
          </Card>

          {/* Float Yield Radar */}
          <Card className="bg-gradient-to-br from-emerald-950/30 to-black border-emerald-500/20 relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
                Projected Monthly Float Yield
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              
              <div className="text-5xl font-bold text-white tracking-tight">
                ${floatYield.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                <span className="text-lg text-emerald-500/70 font-medium ml-2">/ mo extra profit</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Collected Revenue</span>
                  <span className="text-white">${monthlyClaimVolume.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Base Profit (Standard Split)</span>
                  <span className="text-slate-300">${baseProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-brand-300">Total Adjusted Profit</span>
                  <span className="text-brand-400">${totalProjectedProfit.toLocaleString()}</span>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right Column: Auto-Split Visualizer */}
        <div className="lg:col-span-7">
          <Card className="bg-black/60 border-white/5 h-full relative overflow-hidden backdrop-blur-xl shadow-2xl">
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="text-xl flex items-center gap-2">
                <Activity className="h-5 w-5 text-brand-400" />
                Zero-Touch ERA Auto-Splitter
              </CardTitle>
              <CardDescription>Watch live insurance remittances automatically split and route based on risk.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              
              {!simulating && processedEras.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-slate-500 space-y-4">
                  <Building2 className="h-12 w-12 opacity-20" />
                  <p>Awaiting incoming Electronic Remittance Advice (ERA)...</p>
                </div>
              ) : (
                <div className="p-6 space-y-6 min-h-[24rem]">
                  {processedEras.map((era) => (
                    <div key={era.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      
                      {/* ERA Arrival */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{era.id} • {era.payer}</span>
                        <span className="text-sm font-bold text-white">${era.amount.toFixed(2)}</span>
                      </div>

                      {/* Split Logic */}
                      {era.risk === 'low' ? (
                        <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex">
                          {/* Associate Half */}
                          <div 
                            className="bg-slate-800 rounded-lg p-3 flex flex-col justify-center border-r border-slate-900 transition-all duration-1000 ease-out relative overflow-hidden group"
                            style={{ width: `${liquidSplit}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 group-hover:to-white/10 transition-colors" />
                            <span className="text-[10px] text-slate-400 uppercase font-bold relative z-10">Associate Wallet</span>
                            <span className="text-lg font-bold text-white relative z-10">${(era.amount * (liquidSplit/100)).toFixed(2)}</span>
                          </div>
                          
                          {/* Owner Half */}
                          <div 
                            className="bg-brand-500/20 border border-brand-500/30 rounded-lg p-3 flex flex-col justify-center transition-all duration-1000 ease-out relative overflow-hidden"
                            style={{ width: `${100-liquidSplit}%` }}
                          >
                            <div className="absolute inset-0 bg-brand-500/10" />
                            <span className="text-[10px] text-brand-300 uppercase font-bold relative z-10">Practice Treasury</span>
                            <span className="text-lg font-bold text-brand-400 relative z-10">${(era.amount * ((100-liquidSplit)/100)).toFixed(2)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Lock className="h-5 w-5 text-rose-500" />
                            <div>
                              <p className="text-sm font-bold text-rose-400">Risk-Lock Protocol Engaged</p>
                              <p className="text-xs text-rose-500/80">Liquid Payroll blocked: {era.reason}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-white">Funds Frozen</span>
                        </div>
                      )}

                    </div>
                  ))}
                  
                  {simulating && (
                    <div className="flex items-center justify-center py-8 opacity-50">
                      <div className="w-6 h-6 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}

            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
