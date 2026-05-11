'use client';

import { Sparkles, ArrowUpRight, ShieldAlert, BarChart3, Users, Clock, Activity } from 'lucide-react';
import { BurnoutRadar } from '@/components/modules/intelligence/BurnoutRadar';
import { RevenueForecast } from '@/components/modules/intelligence/RevenueForecast';
import MoodTopography from '@/components/modules/intelligence/MoodTopography';
import { ScheduleOptimizer } from '@/components/modules/intelligence/ScheduleOptimizer';

export default function IntelligenceCenter() {
  return (
    <div className="flex h-screen flex-col bg-slate-950 text-white overflow-y-auto relative">
      {/* Ambient Data Streams */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Header */}
      <div className="px-8 py-8 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
                <Sparkles className="h-6 w-6 relative z-10" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Command Center</h1>
            </div>
            <p className="text-slate-400 text-sm ml-12 font-medium tracking-wide">Predictive analytics & practice intelligence</p>
          </div>
          
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-700/50 flex flex-col items-end backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1 flex items-center gap-1">
                <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
                Model Accuracy
              </span>
              <span className="text-emerald-400 font-bold text-sm tracking-widest">94.2%</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-slate-900/50 border border-slate-700/50 flex flex-col items-end backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Data Points Analyzed</span>
              <span className="text-brand-400 font-bold text-sm tracking-widest">1,248,391</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 z-10 relative">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass-panel rounded-2xl p-5 hover:border-brand-500/50 transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12%
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1 tracking-wide">Projected MRR</h4>
              <p className="text-3xl font-bold text-white tracking-tight">$245,000</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 hover:border-brand-500/50 transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded-lg group-hover:scale-110 transition-transform">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Improved
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1 tracking-wide">Claim Denial Risk</h4>
              <p className="text-3xl font-bold text-white tracking-tight">4.2%</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 hover:border-brand-500/50 transition-all duration-300 group cursor-default">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20">
                  Warning
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1 tracking-wide">Patient Attrition Risk</h4>
              <p className="text-3xl font-bold text-white tracking-tight">18%</p>
            </div>

            <div className="glass-panel rounded-2xl p-5 hover:border-brand-500/50 transition-all duration-300 group cursor-default relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-full animate-shimmer opacity-50"></div>
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:scale-110 transition-transform relative z-10">
                  <Clock className="h-5 w-5" />
                </div>
                <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 relative z-10">
                  Optimized
                </span>
              </div>
              <h4 className="text-slate-400 text-sm font-medium mb-1 tracking-wide relative z-10">Avg Note Completion</h4>
              <p className="text-3xl font-bold text-white tracking-tight relative z-10">2.4m</p>
            </div>
          </div>

          {/* Bento Box Main Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Revenue Forecast spans 2 cols */}
            <div className="md:col-span-2">
              <RevenueForecast />
            </div>

            {/* Burnout Radar spans 1 col */}
            <div className="md:col-span-1">
              <BurnoutRadar />
            </div>

            {/* Schedule Optimizer spans full width */}
            <div className="md:col-span-3">
              <ScheduleOptimizer />
            </div>

            {/* Mood Topography spans full width */}
            <div className="md:col-span-3">
              <MoodTopography />
            </div>
          </div>

          {/* Bottom Section: AI Modules Grid */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* AI CFO / Wealth Optimizer Entry */}
            <a href="/intelligence/wealth" className="block section-card p-8 bg-gradient-to-r from-slate-900 to-indigo-950/40 border-slate-800 hover:border-indigo-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20">New</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Practice Wealth Optimizer</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Deploy your virtual AI CFO. Simulate tax strategies, optimize your Traditional and Roth 401(k) contributions, and visualize real-time shifts in your marginal tax brackets.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-indigo-400 font-medium bg-indigo-500/10 hover:bg-indigo-500/20 px-6 py-3 rounded-xl transition-colors border border-indigo-500/20">
                    Launch AI CFO
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* Alchemy Match Engine Entry */}
            <a href="/intelligence/matching" className="block section-card p-8 bg-gradient-to-r from-slate-900 to-fuchsia-950/40 border-slate-800 hover:border-fuchsia-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-widest border border-fuchsia-500/20">Beta</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Alchemy Match Engine</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    AI-driven predictive client-associate pairing. Automatically match incoming intakes with the optimal associate based on clinical focus, schedule availability, and current burnout risk.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-fuchsia-400 font-medium bg-fuchsia-500/10 hover:bg-fuchsia-500/20 px-6 py-3 rounded-xl transition-colors border border-fuchsia-500/20">
                    Initialize Alchemy
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* Clinical Roleplay Simulator Entry */}
            <a href="/intelligence/simulator" className="block section-card p-8 bg-gradient-to-r from-slate-900 to-rose-950/40 border-slate-800 hover:border-rose-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest border border-rose-500/20">Beta</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Clinical Roleplay Simulator</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Practice de-escalation with high-acuity AI patients. Monitor real-time dysregulation meters, vocal tremor biomarkers, and refine your clinical interventions safely.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-rose-400 font-medium bg-rose-500/10 hover:bg-rose-500/20 px-6 py-3 rounded-xl transition-colors border border-rose-500/20">
                    Start Simulation
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* Interactive Treatment Roadmap Entry */}
            <a href="/intelligence/roadmap" className="block section-card p-8 bg-gradient-to-r from-slate-900 to-emerald-950/40 border-slate-800 hover:border-emerald-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">Premium</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Interactive Treatment Roadmap</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Visualize client recovery trajectories. See historical modality effectiveness, predict future outcomes, and generate dynamic visual timelines for client psychoeducation.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-500/10 hover:bg-emerald-500/20 px-6 py-3 rounded-xl transition-colors border border-emerald-500/20">
                    View Roadmaps
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </a>

            {/* AI Supervisor Entry */}
            <a href="/intelligence/supervisor" className="block section-card p-8 bg-gradient-to-r from-slate-900 to-amber-950/40 border-slate-800 hover:border-amber-500/50 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest border border-amber-500/20">Early Access</span>
                    <h3 className="text-2xl font-bold text-white tracking-tight">AI Case Supervisor</h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Submit anonymized challenging cases to your dedicated AI clinical consultant. Get alternative perspectives, DSM-5 differential diagnoses, and countertransference insights.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-amber-400 font-medium bg-amber-500/10 hover:bg-amber-500/20 px-6 py-3 rounded-xl transition-colors border border-amber-500/20">
                    Consult Supervisor
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </a>

          </div>

        </div>
      </div>
    </div>
  );
}
