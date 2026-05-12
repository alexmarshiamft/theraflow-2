'use client';

import { useState } from 'react';
import { PieChart, Landmark, ArrowRightLeft, Droplets, Briefcase, Calculator } from 'lucide-react';

export function FractionalCashflow() {
  const [incomingAmount, setIncomingAmount] = useState(4500);

  // Profit First percentages for a typical solo practitioner
  const splits = [
    { name: "Owner's Pay", percent: 35, color: 'bg-brand-500', icon: Briefcase, textClass: 'text-brand-400' },
    { name: "CA + Fed Taxes", percent: 30, color: 'bg-red-500', icon: Landmark, textClass: 'text-red-400' },
    { name: "Operating Exp", percent: 30, color: 'bg-slate-500', icon: Calculator, textClass: 'text-slate-400' },
    { name: "Profit (Buffer)", percent: 5, color: 'bg-emerald-500', icon: PieChart, textClass: 'text-emerald-400' },
  ];

  return (
    <div className="section-card p-6 border-border/50 bg-gradient-to-br from-slate-900 to-black overflow-hidden relative group">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">Fractional Cashflow Engine</h3>
              <p className="text-sm text-muted-foreground">Automated Profit-First Distribution</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Input Side */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="p-5 bg-slate-800/50 rounded-2xl border border-slate-700">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Simulate Incoming Payment</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xl">$</span>
                <input 
                  type="number" 
                  value={incomingAmount}
                  onChange={(e) => setIncomingAmount(Number(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-2xl font-bold font-mono text-white focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>
            </div>
            
            <div className="flex justify-center hidden md:flex">
              <div className="p-3 bg-slate-800 rounded-full text-slate-400">
                <ArrowRightLeft className="w-6 h-6 rotate-90 md:rotate-0" />
              </div>
            </div>
          </div>

          {/* Distribution Side */}
          <div className="w-full md:w-2/3 space-y-4">
            {splits.map((split, i) => {
              const amount = (incomingAmount * split.percent) / 100;
              const Icon = split.icon;
              return (
                <div key={i} className="group/row">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${split.textClass}`} />
                      <span className="font-semibold text-slate-200">{split.name}</span>
                      <span className="text-xs font-mono text-slate-500 ml-2">{split.percent}%</span>
                    </div>
                    <span className={`font-mono font-bold ${split.textClass}`}>
                      ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${split.color} transition-all duration-1000 ease-out`} 
                      style={{ width: incomingAmount > 0 ? `${split.percent}%` : '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p className="text-sm text-emerald-400/90 leading-relaxed">
            <strong>AI Insight:</strong> By sequestering 30% immediately to cover combined California State (up to 14.4%) and Federal (up to 39.6%) marginal tax rates on your pass-through net income, you eliminate quarterly estimate surprises. Your 5% profit buffer currently projects out to a $5,400 end-of-year dividend.
          </p>
        </div>
      </div>
    </div>
  );
}
