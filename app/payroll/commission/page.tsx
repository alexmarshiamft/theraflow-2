'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Plus, Trash2, Calculator, ArrowRight, Zap, Target, DollarSign, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Tier = {
  id: string;
  minHours: number;
  maxHours: number | null; // null means infinity
  splitPercentage: number;
  bonusAmount: number;
};

export default function CommissionEnginePage() {
  const [baseRate, setBaseRate] = useState(150); // Average session rate
  const [simulatedHours, setSimulatedHours] = useState(25);
  
  const [tiers, setTiers] = useState<Tier[]>([
    { id: '1', minHours: 0, maxHours: 15, splitPercentage: 50, bonusAmount: 0 },
    { id: '2', minHours: 16, maxHours: 25, splitPercentage: 60, bonusAmount: 0 },
    { id: '3', minHours: 26, maxHours: null, splitPercentage: 70, bonusAmount: 250 },
  ]);

  const addTier = () => {
    const lastTier = tiers[tiers.length - 1];
    if (lastTier.maxHours === null) {
      // Must cap the previous infinite tier first
      const updatedTiers = [...tiers];
      updatedTiers[updatedTiers.length - 1].maxHours = lastTier.minHours + 5;
      setTiers([
        ...updatedTiers,
        { id: Date.now().toString(), minHours: lastTier.minHours + 6, maxHours: null, splitPercentage: lastTier.splitPercentage + 5, bonusAmount: 0 }
      ]);
    } else {
      setTiers([
        ...tiers,
        { id: Date.now().toString(), minHours: lastTier.maxHours + 1, maxHours: null, splitPercentage: lastTier.splitPercentage + 5, bonusAmount: 0 }
      ]);
    }
  };

  const removeTier = (id: string) => {
    if (tiers.length <= 1) return;
    const newTiers = tiers.filter(t => t.id !== id);
    // Make the last tier infinite
    newTiers[newTiers.length - 1].maxHours = null;
    setTiers(newTiers);
  };

  const updateTier = (id: string, field: keyof Tier, value: number | null) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Simulation Logic
  const calculatePayout = () => {
    let remainingHours = simulatedHours;
    let totalGross = simulatedHours * baseRate;
    let associateNet = 0;
    let practiceNet = 0;
    let totalBonus = 0;
    
    let breakdown: { tierId: string; hoursInTier: number; payout: number; bonus: number }[] = [];

    for (const tier of tiers) {
      if (remainingHours <= 0) break;

      const tierCapacity = tier.maxHours ? (tier.maxHours - tier.minHours + 1) : Infinity;
      const hoursToProcess = Math.min(remainingHours, tierCapacity);
      
      const generatedInTier = hoursToProcess * baseRate;
      const tierPayout = generatedInTier * (tier.splitPercentage / 100);
      
      // Bonus only triggers if they complete the tier minimum requirement
      // For infinite tier, triggers if they enter it
      let earnedBonus = 0;
      if (simulatedHours >= tier.minHours && tier.bonusAmount > 0) {
        earnedBonus = tier.bonusAmount;
      }

      associateNet += tierPayout;
      totalBonus += earnedBonus;
      practiceNet += (generatedInTier - tierPayout);

      breakdown.push({
        tierId: tier.id,
        hoursInTier: hoursToProcess,
        payout: tierPayout,
        bonus: earnedBonus
      });

      remainingHours -= hoursToProcess;
    }

    associateNet += totalBonus;
    practiceNet -= totalBonus; // Practice pays the bonus

    return { totalGross, associateNet, practiceNet, totalBonus, breakdown };
  };

  const simResult = calculatePayout();

  return (
    <DashboardLayout>
      <div className="page-header">
        <h1 className="page-title flex items-center gap-2">
          <Target className="h-6 w-6 text-brand-500" />
          Multi-Tier Commission Engine
        </h1>
        <p className="page-subtitle">Design complex sliding scales and simulate associate payouts instantly.</p>
      </div>

      <div className="px-8 pb-12 grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        
        {/* Left: Visual Tier Builder */}
        <div className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader className="border-b border-border/50 bg-muted/20">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compensation Rule Builder</CardTitle>
                  <CardDescription>Drag or edit the parameters below</CardDescription>
                </div>
                <Button onClick={addTier} variant="outline" size="sm" className="bg-brand-500/10 text-brand-500 border-brand-500/20 hover:bg-brand-500/20">
                  <Plus className="w-4 h-4 mr-1" /> Add Tier
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              
              {tiers.map((tier, index) => (
                <div key={tier.id} className="relative bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors group">
                  {/* Visual Connector Line */}
                  {index !== tiers.length - 1 && (
                    <div className="absolute -bottom-4 left-8 w-px h-4 bg-slate-800" />
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                        {index + 1}
                      </div>
                      <h4 className="font-bold text-white">Tier {index + 1}</h4>
                    </div>
                    {tiers.length > 1 && (
                      <button onClick={() => removeTier(tier.id)} className="text-slate-500 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Hour Range */}
                    <div className="col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Clinical Hours Range</label>
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={tier.minHours}
                          onChange={(e) => updateTier(tier.id, 'minHours', Number(e.target.value))}
                          className="w-full bg-black border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:border-brand-500 outline-none"
                        />
                        <span className="text-slate-500">to</span>
                        <input 
                          type="text" 
                          value={tier.maxHours === null ? '∞' : tier.maxHours}
                          onChange={(e) => updateTier(tier.id, 'maxHours', e.target.value === '∞' || e.target.value === '' ? null : Number(e.target.value))}
                          className="w-full bg-black border border-slate-800 rounded-lg py-2 px-3 text-sm text-white focus:border-brand-500 outline-none"
                          placeholder="∞"
                        />
                      </div>
                    </div>

                    {/* Split % */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Assoc. Split %</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={tier.splitPercentage}
                          onChange={(e) => updateTier(tier.id, 'splitPercentage', Number(e.target.value))}
                          className="w-full bg-black border border-slate-800 rounded-lg py-2 px-3 text-sm font-bold text-emerald-400 focus:border-brand-500 outline-none"
                        />
                        <span className="absolute right-3 top-2 text-slate-500 text-sm">%</span>
                      </div>
                    </div>

                    {/* Flat Bonus */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase">Flat Bonus</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-500 text-sm">$</span>
                        <input 
                          type="number" 
                          value={tier.bonusAmount}
                          onChange={(e) => updateTier(tier.id, 'bonusAmount', Number(e.target.value))}
                          className="w-full bg-black border border-slate-800 rounded-lg py-2 pl-6 pr-3 text-sm font-bold text-amber-400 focus:border-brand-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between">
                <Button className="bg-brand-600 hover:bg-brand-700 text-white w-full">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Save Commission Ruleset
                </Button>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Right: Live Simulator */}
        <div className="space-y-6">
          <Card className="border-indigo-500/20 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-slate-900 to-black relative overflow-hidden h-full">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <CardHeader className="relative z-10 border-b border-white/5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Calculator className="h-5 w-5 text-indigo-400" />
                    Live Payroll Simulator
                  </CardTitle>
                  <CardDescription className="text-slate-400">Test your ruleset against a hypothetical week.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-6 space-y-8">
              
              {/* Inputs */}
              <div className="grid grid-cols-2 gap-6 bg-black/40 p-5 rounded-2xl border border-white/5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 block">Avg Rate per Session</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input 
                      type="number" 
                      value={baseRate}
                      onChange={(e) => setBaseRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-xl font-bold text-white focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 block">Simulated Hours</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min="1" max="40" 
                      value={simulatedHours}
                      onChange={(e) => setSimulatedHours(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                    <div className="bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 text-xl font-bold text-white min-w-[4rem] text-center">
                      {simulatedHours}
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Results Breakdown */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tier Progression Breakdown</h3>
                
                <div className="space-y-2">
                  {simResult.breakdown.map((b, i) => (
                    <div key={b.tierId} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-sm text-slate-300 font-medium">Tier {i + 1} ({tiers[i].splitPercentage}%)</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-slate-400 font-mono">{b.hoursInTier} hrs</span>
                        <span className="text-sm font-bold text-emerald-400 w-20 text-right">+${b.payout.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  {simResult.totalBonus > 0 && (
                    <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-amber-400 font-bold">Milestone Bonuses Triggered</span>
                      </div>
                      <span className="text-sm font-bold text-amber-400 w-20 text-right">+${simResult.totalBonus.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Final Math */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Practice Keeps</p>
                  <p className="text-3xl font-bold text-white mb-1">
                    ${simResult.practiceNet.toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-400 font-medium">
                    {Math.round((simResult.practiceNet / simResult.totalGross) * 100)}% Effective Margin
                  </p>
                </div>
                
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5 relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10">
                    <DollarSign className="w-24 h-24 text-emerald-500" />
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2 relative z-10">Associate Payout</p>
                  <p className="text-3xl font-bold text-emerald-500 mb-1 relative z-10">
                    ${simResult.associateNet.toLocaleString()}
                  </p>
                  <p className="text-sm text-emerald-400/80 font-medium relative z-10">
                    {Math.round((simResult.associateNet / simResult.totalGross) * 100)}% Effective Split
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-xs font-medium text-slate-300 flex items-center gap-2">
                  Total Gross Generated: <strong className="text-white">${simResult.totalGross.toLocaleString()}</strong>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
