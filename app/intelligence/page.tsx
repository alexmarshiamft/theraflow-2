'use client';

import { Sparkles, ArrowUpRight, ShieldAlert, BarChart3, Users, Clock } from 'lucide-react';
import { BurnoutRadar } from '@/components/modules/intelligence/BurnoutRadar';
import { RevenueForecast } from '@/components/modules/intelligence/RevenueForecast';

export default function IntelligenceCenter() {
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-y-auto">
      {/* Header */}
      <div className="px-8 py-8 border-b border-slate-900 bg-slate-950 sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Command Center</h1>
            </div>
            <p className="text-slate-400 text-sm ml-12">Predictive analytics & practice intelligence</p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Model Accuracy</span>
              <span className="text-emerald-400 font-bold text-sm">94.2%</span>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-end">
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Data Points Analyzed</span>
              <span className="text-brand-400 font-bold text-sm">1.2M+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12%
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1">Projected MRR</h4>
              <p className="text-2xl font-bold text-white">$245,000</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Improved
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1">Claim Denial Risk</h4>
              <p className="text-2xl font-bold text-white">4.2%</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                  Warning
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1">Patient Attrition Risk</h4>
              <p className="text-2xl font-bold text-white">18%</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                  Optimized
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1">Avg Note Completion</h4>
              <p className="text-2xl font-bold text-white">2.4m</p>
            </div>
          </div>

          {/* Bento Box Main Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Revenue Forecast spans 2 cols */}
            <RevenueForecast />

            {/* Burnout Radar spans 1 col */}
            <BurnoutRadar />
          </div>

        </div>
      </div>
    </div>
  );
}
