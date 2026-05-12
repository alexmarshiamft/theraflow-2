'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Trophy, Lock, CheckCircle2, Zap } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export function IncentiveTracker() {
  const [billedHours, setBilledHours] = useState(0);
  
  // Simulate hours rolling in for the demo effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setBilledHours(27.5);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const TIER_1_HOURS = 25;
  const TIER_1_BONUS = 250;
  
  const TIER_2_HOURS = 30;
  const TIER_2_BONUS = 500;

  const maxHours = 35; // For scale

  const progressPercentage = Math.min((billedHours / maxHours) * 100, 100);
  const tier1Hit = billedHours >= TIER_1_HOURS;
  const tier2Hit = billedHours >= TIER_2_HOURS;

  const tier1Pos = (TIER_1_HOURS / maxHours) * 100;
  const tier2Pos = (TIER_2_HOURS / maxHours) * 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
      {/* Background Glow based on achievement */}
      <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 ${
        tier2Hit ? 'bg-amber-500' : tier1Hit ? 'bg-brand-500' : 'bg-slate-500'
      }`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className={`w-6 h-6 ${tier1Hit ? 'text-brand-400' : 'text-slate-500'}`} />
              Performance Incentives
            </h2>
            <p className="text-slate-400 text-sm mt-1">Unlock cash bonuses by scaling your clinical caseload this month.</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400 font-medium mb-1">Current Billed Hours</p>
            <p className="text-4xl font-extrabold text-white">{billedHours.toFixed(1)} <span className="text-xl text-slate-500 font-normal">/ {TIER_2_HOURS}</span></p>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-16 w-full mb-12 mt-16">
          
          {/* Base Bar */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-4 bg-slate-800 rounded-full overflow-hidden">
            {/* Active Fill */}
            <div 
              className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                tier2Hit ? 'bg-gradient-to-r from-amber-500 to-yellow-300' :
                tier1Hit ? 'bg-gradient-to-r from-brand-600 to-brand-400' :
                'bg-slate-600'
              }`}
              style={{ width: `${progressPercentage}%` }}
            >
              {/* Shimmer effect */}
              {(tier1Hit || tier2Hit) && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              )}
            </div>
          </div>

          {/* Tier 1 Marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${tier1Pos}%` }}
          >
            <div className={`mb-3 px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap transition-all duration-500 ${
              tier1Hit 
                ? 'bg-brand-500/20 text-brand-300 border-brand-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              Tier 1: {TIER_1_HOURS} hrs
            </div>
            
            <div className={`w-8 h-8 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-500 ${
              tier1Hit 
                ? 'bg-brand-500 border-slate-900 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)]' 
                : 'bg-slate-800 border-slate-900 text-slate-500'
            }`}>
              {tier1Hit ? <CheckCircle2 className="w-4 h-4" /> : <Lock className="w-3 h-3" />}
            </div>
            
            <div className={`mt-3 font-bold text-lg whitespace-nowrap transition-colors duration-500 ${
              tier1Hit ? 'text-brand-400' : 'text-slate-500'
            }`}>
              +{formatCurrency(TIER_1_BONUS)}
            </div>
          </div>

          {/* Tier 2 Marker */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
            style={{ left: `${tier2Pos}%` }}
          >
            <div className={`mb-3 px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap transition-all duration-500 flex items-center gap-1 ${
              tier2Hit 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {tier2Hit && <Sparkles className="w-3 h-3" />}
              Tier 2: {TIER_2_HOURS} hrs
            </div>
            
            <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-500 ${
              tier2Hit 
                ? 'bg-amber-500 border-slate-900 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110' 
                : 'bg-slate-800 border-slate-900 text-slate-500'
            }`}>
              {tier2Hit ? <Zap className="w-5 h-5 fill-current" /> : <Lock className="w-4 h-4" />}
            </div>
            
            <div className={`mt-3 font-bold text-xl whitespace-nowrap transition-colors duration-500 ${
              tier2Hit ? 'text-amber-400' : 'text-slate-500'
            }`}>
              +{formatCurrency(TIER_2_BONUS)}
            </div>
          </div>
        </div>

        {/* Current Status Message */}
        <div className={`p-4 rounded-xl border flex items-start gap-4 transition-colors duration-500 ${
          tier2Hit 
            ? 'bg-amber-500/10 border-amber-500/30' 
            : tier1Hit 
              ? 'bg-brand-500/10 border-brand-500/30' 
              : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
            tier2Hit ? 'bg-amber-500/20 text-amber-400' : tier1Hit ? 'bg-brand-500/20 text-brand-400' : 'bg-slate-700 text-slate-400'
          }`}>
            {tier2Hit ? <Zap className="w-5 h-5 fill-current" /> : tier1Hit ? <CheckCircle2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </div>
          <div>
            <h4 className={`font-bold mb-1 ${
              tier2Hit ? 'text-amber-400' : tier1Hit ? 'text-brand-400' : 'text-slate-300'
            }`}>
              {tier2Hit 
                ? 'Maximum Bonus Unlocked! 🚀' 
                : tier1Hit 
                  ? 'Tier 1 Bonus Unlocked! 🎉' 
                  : 'Keep Going!'}
            </h4>
            <p className="text-sm text-slate-400">
              {tier2Hit 
                ? `You've maxed out your performance bonus for this period. An extra ${formatCurrency(TIER_2_BONUS)} has been added to your next direct deposit.` 
                : tier1Hit 
                  ? `You've secured the ${formatCurrency(TIER_1_BONUS)} bonus. Bill ${(TIER_2_HOURS - billedHours).toFixed(1)} more hours this period to double it to ${formatCurrency(TIER_2_BONUS)}!` 
                  : `Bill ${(TIER_1_HOURS - billedHours).toFixed(1)} more hours this period to unlock your first ${formatCurrency(TIER_1_BONUS)} bonus.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
