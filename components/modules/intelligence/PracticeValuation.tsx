'use client';

import { useState } from 'react';
import { BarChart3, Building2, Users, ArrowUpRight } from 'lucide-react';

export function PracticeValuation() {
  const [activeClients, setActiveClients] = useState(24);
  const [avgFee, setAvgFee] = useState(150);
  const [retentionMonths, setRetentionMonths] = useState(9);

  // Simple math for demonstration
  const monthlyRevenue = activeClients * avgFee * 4; // assuming 4 sessions/mo
  const annualRevenue = monthlyRevenue * 12;
  const cltv = avgFee * 4 * retentionMonths;
  
  // Standard private practice valuation multiples are often 1x - 1.5x SDE (Seller's Discretionary Earnings)
  // For demo, we'll assume an 80% margin for a solo tele-health practice and a 1.5x multiple
  const estimatedMargin = 0.8;
  const sde = annualRevenue * estimatedMargin;
  const enterpriseValue = sde * 1.5;

  return (
    <div className="section-card p-6 border-border/50 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 overflow-hidden relative group">
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">Enterprise Equity Builder</h3>
            <p className="text-sm text-muted-foreground">Practice Valuation & CLTV Projector</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                Active Caseload 
                <span className="text-indigo-400 font-mono">{activeClients} clients</span>
              </label>
              <input 
                type="range" 
                min="5" max="40" 
                value={activeClients}
                onChange={(e) => setActiveClients(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                Average Session Fee 
                <span className="text-indigo-400 font-mono">${avgFee}</span>
              </label>
              <input 
                type="range" 
                min="80" max="300" step="10"
                value={avgFee}
                onChange={(e) => setAvgFee(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                Avg. Retention 
                <span className="text-indigo-400 font-mono">{retentionMonths} months</span>
              </label>
              <input 
                type="range" 
                min="1" max="24" 
                value={retentionMonths}
                onChange={(e) => setRetentionMonths(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* Outputs */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-5 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <BarChart3 className="w-32 h-32 text-indigo-400 -mb-8 -mr-8" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xs font-bold text-indigo-400/80 uppercase tracking-wider mb-1">Estimated Enterprise Value</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold font-mono text-white">${enterpriseValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  <span className="text-xs text-indigo-400 flex items-center"><ArrowUpRight className="w-3 h-3 mr-1" /> 1.5x SDE</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="text-xs text-slate-400 mb-1 flex items-center gap-1"><Users className="w-3 h-3" /> CLTV</div>
                <div className="text-xl font-bold font-mono text-slate-200">${cltv.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                <div className="text-xs text-slate-400 mb-1">Annual Revenue</div>
                <div className="text-xl font-bold font-mono text-slate-200">${annualRevenue.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
