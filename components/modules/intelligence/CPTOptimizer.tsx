'use client';

import { useState } from 'react';
import { Stethoscope, TrendingUp, AlertTriangle, CheckCircle2, DollarSign } from 'lucide-react';

export function CPTOptimizer() {
  const [sessionLength, setSessionLength] = useState(53);
  const [acuity, setAcuity] = useState<'Low' | 'Moderate' | 'High'>('Moderate');
  const [hasFamilyInvolved, setHasFamilyInvolved] = useState(false);

  // Mock reimbursement rates
  const rates = {
    '90834': 110, // 45 min
    '90837': 150, // 60 min
    '90785': 25,  // Interactive complexity add-on
    '90847': 140, // Family therapy
  };

  const getRecommendedCodes = () => {
    let codes = [];
    let total = 0;
    let risk = 'Low';

    if (hasFamilyInvolved && sessionLength > 45) {
      codes.push({ code: '90847', desc: 'Family psychotherapy, 50 mins', rate: rates['90847'] });
      total += rates['90847'];
      risk = 'Medium';
    } else if (sessionLength >= 53) {
      codes.push({ code: '90837', desc: 'Psychotherapy, 60 mins', rate: rates['90837'] });
      total += rates['90837'];
      if (sessionLength < 55) risk = 'Medium'; // Audit risk if always billing 90837 exactly at 53
    } else {
      codes.push({ code: '90834', desc: 'Psychotherapy, 45 mins', rate: rates['90834'] });
      total += rates['90834'];
    }

    if (acuity === 'High' && !hasFamilyInvolved) {
      codes.push({ code: '+90785', desc: 'Interactive Complexity', rate: rates['90785'] });
      total += rates['90785'];
      risk = 'High'; // Add-on codes have higher audit risk
    }

    return { codes, total, risk };
  };

  const recommendation = getRecommendedCodes();
  const baseRate = rates['90834']; // What they might have billed by default
  const leftOnTable = recommendation.total > baseRate ? recommendation.total - baseRate : 0;

  return (
    <div className="section-card p-6 border-border/50 bg-gradient-to-br from-card to-slate-900 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        <Stethoscope className="w-48 h-48 text-brand-500" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-brand-500/20 text-brand-400 rounded-xl border border-brand-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground">CPT Arbitrage Engine</h3>
            <p className="text-sm text-muted-foreground">AI Medical Coding Optimizer</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground flex justify-between">
                Session Length 
                <span className="text-brand-400 font-mono">{sessionLength} mins</span>
              </label>
              <input 
                type="range" 
                min="30" max="90" 
                value={sessionLength}
                onChange={(e) => setSessionLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-foreground">Client Acuity</label>
              <div className="flex gap-2 text-sm">
                {['Low', 'Moderate', 'High'].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAcuity(a as any)}
                    className={`flex-1 py-2 rounded-lg border transition-all ${acuity === a ? 'bg-brand-500/20 border-brand-500 text-brand-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700 cursor-pointer hover:bg-slate-800 transition-colors" onClick={() => setHasFamilyInvolved(!hasFamilyInvolved)}>
              <span className="text-sm font-medium text-slate-300">Family/Partner Involved?</span>
              <div className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 ${hasFamilyInvolved ? 'bg-brand-500' : 'bg-slate-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hasFamilyInvolved ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800 backdrop-blur-sm flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Optimized Billing Profile</h4>
              <div className="space-y-3">
                {recommendation.codes.map((c, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-brand-400">{c.code}</span>
                      <span className="text-xs text-slate-300">{c.desc}</span>
                    </div>
                    <span className="font-mono text-emerald-400">${c.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 space-y-4">
              <div className="flex justify-between items-end">
                <div className="text-sm text-slate-400">Total Reimbursement</div>
                <div className="text-2xl font-bold font-mono text-white">${recommendation.total}</div>
              </div>
              
              {leftOnTable > 0 && (
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Captured vs default 90834</span>
                  </div>
                  <span className="font-mono font-bold">+${leftOnTable}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs">
                {recommendation.risk === 'Low' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : recommendation.risk === 'Medium' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span className={recommendation.risk === 'Low' ? 'text-emerald-500' : recommendation.risk === 'Medium' ? 'text-amber-500' : 'text-red-500'}>
                  Audit Risk: {recommendation.risk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
