'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, TrendingUp, Building, LineChart, FileText, CheckCircle, ChevronRight, Zap } from 'lucide-react';

export function WealthGodTierFeatures() {
  const [sCorpSimulated, setSCorpSimulated] = useState(false);
  const [negotiationStarted, setNegotiationStarted] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* S-Corp Election Simulator */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
          <Building className="h-32 w-32" />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-brand-500/10 text-brand-400 border-brand-500/20 backdrop-blur-md">Tax Strategy</Badge>
            <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">Entity Optimizer: S-Corp</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            Based on your projected $185k annual net income, switching to an S-Corp could save you thousands in self-employment taxes.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {!sCorpSimulated ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 p-5 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Estimated Annual Tax Savings</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 drop-shadow-sm">$12,450</p>
                </div>
                <Button onClick={() => setSCorpSimulated(true)} className="bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] border border-emerald-500/50 transition-all hover:scale-105 duration-300">
                  Run Full Simulation
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="p-5 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm space-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                <div className="flex justify-between text-sm relative z-10">
                  <span className="text-slate-300">Net Business Income</span>
                  <span className="font-mono text-slate-100">$185,000</span>
                </div>
                <div className="flex justify-between text-sm relative z-10">
                  <span className="text-slate-300">Reasonable Salary (W2)</span>
                  <span className="font-mono text-slate-100">$85,000</span>
                </div>
                <div className="flex justify-between text-sm relative z-10">
                  <span className="text-slate-300">Owner's Draw (K1)</span>
                  <span className="font-mono text-emerald-400">$100,000</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between font-bold relative z-10">
                  <span className="text-slate-100">SE Tax Saved (15.3% on K1)</span>
                  <span className="font-mono text-emerald-400">$15,300</span>
                </div>
                <div className="flex justify-between text-sm text-slate-400 relative z-10">
                  <span>Less: Payroll/CPA Costs</span>
                  <span className="font-mono">-$2,850</span>
                </div>
                <div className="pt-4 mt-2 border-t border-white/10 flex justify-between font-bold text-lg relative z-10">
                  <span className="text-white">Net Annual Savings</span>
                  <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 drop-shadow-sm">$12,450</span>
                </div>
              </div>
              <Button className="w-full bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-brand-500/50 transition-all hover:scale-[1.02] duration-300">
                <FileText className="w-4 h-4 mr-2" />
                Generate Election Forms
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Fee Schedule Negotiator */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
          <Zap className="h-32 w-32" />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20 backdrop-blur-md">Revenue Growth</Badge>
            <Sparkles className="h-5 w-5 text-indigo-400 animate-pulse" />
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">AI Fee Negotiator</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            You are billing 18% below the regional average for CPT 90837 in ZIP 90230. We can auto-generate a data-backed rate increase request.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          {!negotiationStarted ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 p-5 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm">
                <div>
                  <p className="text-sm font-medium text-slate-400 mb-1">Missed Revenue (Aetna)</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-200 drop-shadow-sm">$8,240<span className="text-lg text-slate-500 font-normal">/yr</span></p>
                </div>
                <Button onClick={() => setNegotiationStarted(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] border border-indigo-500/50 transition-all hover:scale-105 duration-300">
                  Start Negotiation
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="p-5 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm space-y-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                <div className="flex items-start gap-3 relative z-10">
                  <div className="mt-0.5 relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-50 rounded-full"></div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 relative z-10" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">Market Data Gathered</p>
                    <p className="text-xs text-slate-400">Benchmarked against 42 local providers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 relative z-10">
                  <div className="mt-0.5 relative">
                    <div className="absolute inset-0 bg-emerald-500 blur-sm opacity-50 rounded-full"></div>
                    <CheckCircle className="w-5 h-5 text-emerald-400 relative z-10" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">Value Proposition Drafted</p>
                    <p className="text-xs text-slate-400">Highlighted specialized EMDR training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 relative z-10 animate-pulse">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-indigo-200 animate-spin mt-0.5 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                  <div>
                    <p className="font-medium text-indigo-300 drop-shadow-sm">Generating Request Letter</p>
                    <p className="text-xs text-slate-400">Applying behavioral economics to phrasing...</p>
                  </div>
                </div>
              </div>
              <Button disabled className="w-full bg-slate-800/80 text-slate-400 border border-white/5">
                Processing...
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Subscription Audit */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-rose-500/10 text-rose-400 border-rose-500/20 backdrop-blur-md">Expense Leakage</Badge>
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">Subscription Audit</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            We found 3 overlapping software subscriptions. Consolidating could save you $148/mo.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm transition-colors hover:bg-slate-800/60">
              <div>
                <p className="font-medium text-slate-200">Zoom Pro</p>
                <p className="text-xs text-slate-400">Redundant: Theraflow has built-in Telehealth</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-rose-400 font-medium">$15.99/mo</span>
                <Button size="sm" variant="outline" className="border-rose-500/30 text-rose-300 hover:text-white hover:bg-rose-500/20">Cancel</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm transition-colors hover:bg-slate-800/60">
              <div>
                <p className="font-medium text-slate-200">DocuSign</p>
                <p className="text-xs text-slate-400">Redundant: Theraflow includes e-signatures</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-rose-400 font-medium">$40.00/mo</span>
                <Button size="sm" variant="outline" className="border-rose-500/30 text-rose-300 hover:text-white hover:bg-rose-500/20">Cancel</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Increase Calculator */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 backdrop-blur-md">Wealth Multiplier</Badge>
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">Micro-Adjustment Simulator</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            See the compounding effect of a small increase in your private pay rate over 10 years, invested at 7%.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col justify-center h-full pb-8">
          <div className="flex items-center justify-center p-8 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm relative overflow-hidden group/card">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-brand-500/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
            <div className="text-center relative z-10">
              <p className="text-sm text-slate-400 mb-3">Increasing fee by just <strong className="text-white bg-white/10 px-2 py-1 rounded-md border border-white/10">$10/session</strong></p>
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-brand-400 mb-3 drop-shadow-lg scale-100 group-hover/card:scale-105 transition-transform duration-500">
                +$115,420
              </div>
              <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Added to your net worth in 10 years</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Solo 401(k) Auto-Optimizer */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden group md:col-span-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 backdrop-blur-md">Tax Shelter</Badge>
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">Solo 401(k) Maximizer</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            As an S-Corp owner, you can shelter up to $69,000 this year from taxes through combined employee/employer contributions.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Employee Contribution</span>
                <span className="font-mono text-cyan-400 font-medium">$23,000</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Employer Match (25%)</span>
                <span className="font-mono text-cyan-400 font-medium">$21,250</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 mt-2 overflow-hidden border border-white/5">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: '64%' }}></div>
              </div>
              <p className="text-xs text-slate-500 text-right mt-1">64% of max allowable ($69k)</p>
            </div>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 transition-colors">
              Auto-Schedule Contributions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real Estate Cost Segregation Estimator */}
      <Card className="bg-slate-900/60 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden group md:col-span-1">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform group-hover:scale-150 duration-1000 ease-in-out" />
        <CardHeader className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20 backdrop-blur-md">Real Estate</Badge>
          </div>
          <CardTitle className="text-white text-2xl font-bold tracking-tight">Cost Segregation Radar</CardTitle>
          <CardDescription className="text-slate-400 leading-relaxed">
            If you purchase a $500k commercial office for your practice, a cost segregation study could accelerate depreciation.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-col justify-center h-full">
            <div className="p-5 rounded-xl bg-slate-800/40 border border-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/5 to-transparent pointer-events-none" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 flex items-center justify-center border border-fuchsia-500/30 flex-shrink-0">
                  <span className="text-2xl font-bold text-fuchsia-400">Y1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-300">Year 1 Tax Deduction</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-300 drop-shadow-sm">$115,000</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                By accelerating depreciation on non-structural components (carpeting, fixtures), you can drastically offset your clinical income.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
