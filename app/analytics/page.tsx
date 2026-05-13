'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Users, 
  Clock, 
  Activity, 
  TrendingUp, 
  AlertCircle,
  BarChart3,
  DollarSign,
  Zap
} from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const CHART_DATA = [
  { date: '04/13', client: 0, insurance: 550 },
  { date: '04/15', client: 50, insurance: 150 },
  { date: '04/16', client: 50, insurance: 600 },
  { date: '04/20', client: 0, insurance: 1300 },
  { date: '04/21', client: 0, insurance: 100 },
  { date: '04/24', client: 0, insurance: 500 },
  { date: '04/27', client: 100, insurance: 600 },
  { date: '05/04', client: 0, insurance: 1250 },
  { date: '05/05', client: 0, insurance: 500 },
  { date: '05/06', client: 0, insurance: 800 },
  { date: '05/08', client: 0, insurance: 1555 }
];

export default function AnalyticsPage() {
  const totalIncome = 8105;
  const associateCut = totalIncome * 0.5;
  const projectedMonthly = (totalIncome / 12) * 30; // ~$20,262
  
  // Arbitrage math (if owner took 60/40 spread on Liquid Payroll)
  const standardOwnerCut = totalIncome * 0.5;
  const liquidOwnerCut = totalIncome * 0.6;
  const arbitrageSpread = liquidOwnerCut - standardOwnerCut;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="page-title flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-brand-500" />
              Practice Analytics
            </h1>
            <p className="page-subtitle">Real-time performance metrics and revenue tracking</p>
          </div>
          
          {/* Custom Date Range selector aesthetic */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white rounded-md transition-colors">This month</button>
            <button className="px-4 py-1.5 text-sm font-bold text-brand-400 bg-brand-500/10 rounded-md shadow-sm">Last 30 days</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-400 hover:text-white rounded-md transition-colors">Last month</button>
          </div>
        </div>
      </div>

      {/* Practice Pulse Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-400" />
          Practice Pulse
          <span className="text-xs font-normal text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800 ml-2">Updates overnight</span>
        </h2>
        
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-slate-400 text-sm font-medium">Your cancellation rate</h3>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Clinic Avg: 20.8%</span>
            </div>
            <div className="text-3xl font-bold text-emerald-400">5.0%</div>
            <div className="mt-4 flex items-center text-xs text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md w-fit">
              <TrendingUp className="h-3 w-3 mr-1" /> Top performing provider
            </div>
          </div>

          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
            <h3 className="text-slate-400 text-sm font-medium mb-1">Avg time to complete notes</h3>
            <div className="text-3xl font-bold text-emerald-400 flex items-baseline gap-1">
              0.5 <span className="text-lg font-medium text-emerald-400/70">days</span>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded-md w-fit">
              <Clock className="h-3 w-3 mr-1" /> Excellent velocity
            </div>
          </div>

          <div className="bg-slate-900/50 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl -mr-8 -mt-8" />
            <h3 className="text-slate-400 text-sm font-medium mb-1">Active Caseload</h3>
            <div className="text-3xl font-bold text-indigo-400 flex items-baseline gap-1">
              30+ <span className="text-lg font-medium text-indigo-400/70">clients</span>
            </div>
            <div className="mt-4 flex items-center text-xs text-indigo-500/80 bg-indigo-500/10 px-2 py-1 rounded-md w-fit">
              <Users className="h-3 w-3 mr-1" /> At capacity
            </div>
          </div>
        </div>
      </div>

      {/* Overview & Income Chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 relative h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-slate-400 text-sm font-medium mb-1">Gross Income (Last 30 Days)</h3>
                <div className="text-4xl font-bold text-white tracking-tight">
                  ${totalIncome.toLocaleString('en-US')}
                </div>
                <div className="text-sm text-slate-500 mt-1">First 12 days of May run-rate</div>
              </div>
              <button className="text-sm font-medium text-brand-400 hover:text-brand-300 transition-colors">
                View detailed report
              </button>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip 
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#94a3b8' }} />
                  <Bar dataKey="client" name="Client payments" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={8} />
                  <Bar dataKey="insurance" name="Insurance" stackId="a" fill="#93c5fd" radius={[4, 4, 0, 0]} barSize={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Liquid Arbitrage Insight Overlay */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-brand-900/40 to-slate-900 border border-brand-500/30 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-24 h-24 text-brand-400" />
            </div>
            
            <h3 className="text-brand-400 font-bold text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4" /> 
              Liquid Treasury Insight
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <div className="text-slate-400 text-sm mb-1">Your 50% Standard Split</div>
                <div className="text-2xl font-bold text-white">
                  ${associateCut.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="h-px w-full bg-slate-800" />

              <div>
                <div className="text-slate-400 text-sm mb-1">Projected Monthly Total</div>
                <div className="text-3xl font-bold text-emerald-400">
                  ~${projectedMonthly.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Based on the $8k velocity in the first 12 days, your practice is on track to gross over $20k this month.
                </p>
              </div>

              <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800">
                <div className="text-xs text-slate-400 mb-1">Owner's Arbitrage Opportunity</div>
                <div className="text-lg font-bold text-brand-400">
                  +${arbitrageSpread.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-500">MDT</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  If this $8,105 was processed via Liquid Payroll (Instant 40% payout to associate), the owner captures ${arbitrageSpread} in pure spread this period alone.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
