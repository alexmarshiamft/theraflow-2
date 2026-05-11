'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  BrainCircuit,
  Wallet,
  ShieldCheck,
  AlertCircle,
  PiggyBank
} from 'lucide-react';

// Simple mock tax brackets (Single Filer)
const brackets = [
  { rate: 0.10, max: 11600 },
  { rate: 0.12, max: 47150 },
  { rate: 0.22, max: 100525 },
  { rate: 0.24, max: 191950 },
  { rate: 0.32, max: 243725 },
];

const calculateTaxes = (income: number) => {
  let taxes = 0;
  let prevMax = 0;
  for (const b of brackets) {
    if (income > prevMax) {
      const taxableAtThisRate = Math.min(income, b.max) - prevMax;
      taxes += taxableAtThisRate * b.rate;
      prevMax = b.max;
    } else {
      break;
    }
  }
  return taxes;
};

export function WealthOptimizer() {
  const projectedGross = 110000;
  const max401k = 23500;

  const [trad401k, setTrad401k] = useState(6000);
  const [roth401k, setRoth401k] = useState(4000);

  const agi = projectedGross - trad401k;
  const estimatedTaxes = calculateTaxes(agi);
  const effectiveRate = (estimatedTaxes / projectedGross) * 100;
  
  // Find current top bracket
  const topBracket = brackets.find(b => agi <= b.max) || brackets[brackets.length - 1];
  const nextBracketDown = brackets[brackets.indexOf(topBracket) - 1];

  // AI Logic for insight
  const distanceToNextBracket = nextBracketDown ? agi - nextBracketDown.max : 0;
  
  const aiInsight = useMemo(() => {
    if (distanceToNextBracket > 0 && distanceToNextBracket < 5000) {
      return `If you increase your Traditional 401(k) by $${distanceToNextBracket.toLocaleString()}, you'll drop into the ${nextBracketDown.rate * 100}% bracket, saving significant federal taxes.`;
    }
    if (trad401k + roth401k === 0) {
      return "You haven't contributed to your 401(k) yet. Even a small contribution can have a massive impact on compound growth and tax efficiency over decades.";
    }
    if (trad401k + roth401k > max401k) {
      return `Warning: You are projected to exceed the IRS limit of $${max401k.toLocaleString()}. Adjust your sliders.`;
    }
    return `Your current mix is projected to save you $${calculateTaxes(projectedGross) - estimatedTaxes} in taxes compared to making no pre-tax contributions. Solid strategy.`;
  }, [distanceToNextBracket, trad401k, roth401k, estimatedTaxes, max401k, nextBracketDown, projectedGross]);

  const handleTradChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val + roth401k > max401k) {
      setTrad401k(max401k - roth401k);
    } else {
      setTrad401k(val);
    }
  };

  const handleRothChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val + trad401k > max401k) {
      setRoth401k(max401k - trad401k);
    } else {
      setRoth401k(val);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Interactive Controls */}
      <div className="lg:col-span-2 space-y-6">
        <div className="section-card p-6 bg-gradient-to-b from-card to-background border-border/50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-1">Tax Strategy Simulator</h2>
              <p className="text-sm text-muted-foreground">Adjust contributions to optimize your projected end-of-year tax liability.</p>
            </div>
            <div className="p-3 bg-brand-500/10 rounded-xl text-brand-500">
              <PiggyBank className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-8">
            {/* Traditional 401k Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center">
                    Traditional 401(k)
                    <span className="ml-2 text-xs font-normal text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">Pre-Tax</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">Lowers taxable income immediately</p>
                </div>
                <div className="text-2xl font-bold font-mono text-brand-500">${trad401k.toLocaleString()}</div>
              </div>
              <input 
                type="range" 
                min="0" 
                max={max401k} 
                step="500"
                value={trad401k}
                onChange={handleTradChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-brand-500 hover:accent-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
            </div>

            {/* Roth 401k Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <label className="text-sm font-semibold text-foreground flex items-center">
                    Roth 401(k)
                    <span className="ml-2 text-xs font-normal text-muted-foreground border border-border/50 px-2 py-0.5 rounded-full">Post-Tax</span>
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">Tax-free growth and withdrawals</p>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-500">${roth401k.toLocaleString()}</div>
              </div>
              <input 
                type="range" 
                min="0" 
                max={max401k} 
                step="500"
                value={roth401k}
                onChange={handleRothChange}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-muted/50 rounded-xl border border-border/50 flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Total Projected Contributions</span>
            <span className="text-lg font-bold font-mono ${(trad401k + roth401k) >= max401k ? 'text-red-500' : 'text-foreground'}">
              ${(trad401k + roth401k).toLocaleString()} <span className="text-xs text-muted-foreground">/ ${max401k.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* Visual Bracket */}
        <div className="section-card p-6 border-border/50">
          <h3 className="text-sm font-bold text-foreground mb-6 uppercase tracking-wider">Marginal Tax Bracket Impact</h3>
          
          <div className="relative h-8 bg-muted rounded-full overflow-hidden flex">
            {/* 10% */}
            <div className="h-full bg-slate-700 dark:bg-slate-800 border-r border-slate-600/50 relative" style={{ width: `${(11600 / 191950) * 100}%` }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-400">10%</span>
            </div>
            {/* 12% */}
            <div className="h-full bg-slate-600 dark:bg-slate-700 border-r border-slate-500/50 relative" style={{ width: `${((47150 - 11600) / 191950) * 100}%` }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-300">12%</span>
            </div>
            {/* 22% */}
            <div className="h-full bg-slate-500 dark:bg-slate-600 border-r border-slate-400/50 relative" style={{ width: `${((100525 - 47150) / 191950) * 100}%` }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-200">22%</span>
            </div>
            {/* 24% */}
            <div className="h-full bg-slate-400 dark:bg-slate-500 relative" style={{ width: `${((191950 - 100525) / 191950) * 100}%` }}>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-100">24%</span>
            </div>
            
            {/* Current AGI Marker */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-brand-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10 transition-all duration-500 ease-out" 
              style={{ left: `${(agi / 191950) * 100}%` }}
            >
              <div className="absolute -top-6 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                AGI: ${agi.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
             <div>
               <div className="text-2xl font-bold font-mono text-foreground">${projectedGross.toLocaleString()}</div>
               <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Gross Pay</div>
             </div>
             <div>
               <div className="text-2xl font-bold font-mono text-brand-500">-${trad401k.toLocaleString()}</div>
               <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Deductions</div>
             </div>
             <div>
               <div className="text-2xl font-bold font-mono text-foreground">${agi.toLocaleString()}</div>
               <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Adjusted Gross</div>
             </div>
          </div>
        </div>
      </div>

      {/* Analytics & AI CFO Panel */}
      <div className="space-y-6">
        <div className="section-card p-6 bg-slate-900 text-white border-slate-800 shadow-xl relative overflow-hidden group">
          {/* Ambient AI Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400 border border-purple-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg tracking-wide">AI CFO Insights</h3>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {aiInsight}
            </p>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Marginal Bracket</span>
                <span className="font-mono font-bold text-purple-400">{(topBracket.rate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Effective Tax Rate</span>
                <span className="font-mono font-bold text-emerald-400">{effectiveRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Est. Federal Tax</span>
                <span className="font-mono font-bold text-white">${Math.round(estimatedTaxes).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card p-6 border-border/50">
          <div className="flex gap-3 mb-4">
            <div className="mt-0.5 text-amber-500"><ShieldCheck className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Safe Harbor Rules</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Ensure your withholdings meet the 90% current year or 100% prior year safe harbor to avoid underpayment penalties.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="mt-0.5 text-blue-500"><AlertCircle className="w-5 h-5" /></div>
            <div>
              <h4 className="text-sm font-bold text-foreground">Quarterly Payments</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">As an associate with mixed income types, consider pushing extra withholdings to Q4 if you receive a bonus.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
