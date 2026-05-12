'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Sparkles, TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CancellationImpactSimulatorProps {
  monthlyScheduledSessions: number;
  avgSessionRate: number;
  currentCancellationRate?: number;
}

export function CancellationImpactSimulator({
  monthlyScheduledSessions,
  avgSessionRate,
  currentCancellationRate = 19.6
}: CancellationImpactSimulatorProps) {
  const [cancellationRate, setCancellationRate] = useState(currentCancellationRate);

  // Constants & Baseline
  const baselineCompleted = monthlyScheduledSessions * (1 - (currentCancellationRate / 100));
  const baselineAnnual = (baselineCompleted * avgSessionRate) * 12;

  // Simulated Values
  const simulatedCompleted = monthlyScheduledSessions * (1 - (cancellationRate / 100));
  const simulatedMonthlyGross = simulatedCompleted * avgSessionRate;
  const simulatedAnnualGross = simulatedMonthlyGross * 12;

  const annualDifference = simulatedAnnualGross - baselineAnnual;
  const isImprovement = cancellationRate < currentCancellationRate;
  const isWorse = cancellationRate > currentCancellationRate;

  return (
    <Card className="bg-slate-900/60 border-rose-500/20 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      <div className={cn(
        "absolute top-0 right-0 w-64 h-64 blur-3xl rounded-full -mr-32 -mt-32 pointer-events-none transition-colors duration-500",
        isImprovement ? "bg-emerald-500/10" : isWorse ? "bg-rose-500/10" : "bg-brand-500/10"
      )} />
      
      <CardHeader className="border-b border-white/5 pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-rose-400" />
          Cancellation Impact Simulator
        </CardTitle>
        <p className="text-sm text-slate-400 mt-1">Simulate how adjusting practice-wide cancellation rates affects annualized gross revenue.</p>
      </CardHeader>
      
      <CardContent className="pt-6 relative z-10">
        <div className="space-y-8">
          
          {/* Slider Section */}
          <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider block mb-1">Simulated Cancellation Rate</label>
                <span className="text-xs text-slate-500">Current baseline: {currentCancellationRate.toFixed(1)}%</span>
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-3xl font-bold",
                  isImprovement ? "text-emerald-400" : isWorse ? "text-rose-400" : "text-brand-400"
                )}>
                  {cancellationRate.toFixed(1)}%
                </span>
              </div>
            </div>
            
            <input 
              type="range" min="0" max="50" step="0.1" value={cancellationRate} 
              onChange={(e) => setCancellationRate(parseFloat(e.target.value))}
              className={cn(
                "w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer transition-colors duration-300",
                isImprovement ? "accent-emerald-500" : isWorse ? "accent-rose-500" : "accent-brand-500"
              )} 
            />
            
            <div className="flex justify-between mt-3 text-xs font-bold text-slate-500">
              <span>0% (Perfect)</span>
              <span>25% (Average)</span>
              <span>50% (Critical)</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-white/5 flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-brand-400" /> Monthly Completed
              </span>
              <span className="text-3xl font-bold text-white">{Math.round(simulatedCompleted)}</span>
              <span className="text-xs text-slate-500 mt-1">out of {monthlyScheduledSessions} scheduled</span>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-5 border border-white/5 flex flex-col justify-center">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-brand-400" /> Annualized Revenue
              </span>
              <span className="text-3xl font-bold text-white">
                ${Math.round(simulatedAnnualGross).toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 mt-1">Gross practice income</span>
            </div>
          </div>

          {/* Impact Banner */}
          <div className={cn(
            "rounded-xl p-5 border flex items-center justify-between transition-colors duration-500",
            isImprovement ? "bg-emerald-500/10 border-emerald-500/20" : 
            isWorse ? "bg-rose-500/10 border-rose-500/20" : 
            "bg-slate-800/50 border-white/5"
          )}>
            <div>
              <span className={cn(
                "text-xs uppercase tracking-wider font-bold mb-1 flex items-center gap-1.5",
                isImprovement ? "text-emerald-400" : isWorse ? "text-rose-400" : "text-slate-400"
              )}>
                {isImprovement ? <TrendingUp className="h-4 w-4" /> : isWorse ? <TrendingDown className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                Annual Financial Impact
              </span>
              <span className={cn(
                "text-2xl font-bold",
                isImprovement ? "text-emerald-300" : isWorse ? "text-rose-300" : "text-white"
              )}>
                {isImprovement ? "+" : isWorse ? "" : ""}${Math.abs(Math.round(annualDifference)).toLocaleString()}
              </span>
            </div>
            <div className="text-right max-w-[140px]">
              <p className={cn(
                "text-xs font-medium leading-relaxed",
                isImprovement ? "text-emerald-500/80" : isWorse ? "text-rose-500/80" : "text-slate-500"
              )}>
                {isImprovement 
                  ? "Recovered revenue by improving retention." 
                  : isWorse 
                    ? "Lost revenue due to increased cancellations." 
                    : "Holding steady at current baseline."}
              </p>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
