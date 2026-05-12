'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Calculator, Download, ArrowRight, CheckCircle2, ChevronRight, Activity, Wallet, FileText, Bot, AlertTriangle, Building2, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AccountingPage() {
  const [aiScanning, setAiScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAiScanning(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-[#030303] font-sans">
        
        {/* Header */}
        <div className="px-8 py-8 border-b border-white/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-amber-500/20 p-2 rounded-lg border border-amber-500/30">
                  <Calculator className="w-6 h-6 text-amber-400" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Theraflow Accounting</h1>
              </div>
              <p className="text-slate-400 max-w-2xl text-lg">
                Real-time Profit & Loss, AI Bookkeeping, and automated IRS tax estimation.
              </p>
            </div>
            <div className="hidden md:flex gap-3">
              <Button variant="outline" className="border-slate-800 text-slate-300 hover:bg-slate-900">
                <FileText className="w-4 h-4 mr-2" /> PDF Report
              </Button>
              <Button className="bg-amber-600 hover:bg-amber-700 text-white shadow-[0_0_15px_rgba(217,119,6,0.3)]">
                <Download className="w-4 h-4 mr-2" /> Export to CPA
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Content Area: P&L */}
          <div className="xl:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-slate-500" /> General Ledger (P&L)
              </h2>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Q2 2026 (Apr - Jun)
              </span>
            </div>

            <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-sm overflow-hidden">
              <div className="divide-y divide-slate-800/50">
                
                {/* Revenue */}
                <div className="p-6 bg-emerald-950/10 hover:bg-emerald-900/20 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">Gross Revenue</h3>
                    <span className="text-xl font-bold text-emerald-400">$24,850.00</span>
                  </div>
                  <div className="space-y-2 pl-4 border-l-2 border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Insurance Reimbursements</span>
                      <span className="font-mono text-slate-300">$18,400.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Client Co-Pays</span>
                      <span className="font-mono text-slate-300">$4,250.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Private Pay</span>
                      <span className="font-mono text-slate-300">$2,200.00</span>
                    </div>
                  </div>
                </div>

                {/* COGS (Payroll) */}
                <div className="p-6 bg-slate-950/30 hover:bg-slate-900/40 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Cost of Goods (COGS)</h3>
                    <span className="text-xl font-bold text-slate-300">$10,240.00</span>
                  </div>
                  <div className="space-y-2 pl-4 border-l-2 border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Associate Commissions (W2)</span>
                      <span className="font-mono text-slate-400">$8,540.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Supervisor Stipends</span>
                      <span className="font-mono text-slate-400">$1,700.00</span>
                    </div>
                  </div>
                </div>

                {/* Gross Profit */}
                <div className="p-4 bg-slate-900/80 border-y border-slate-700">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Gross Profit</h3>
                    <span className="text-lg font-bold text-white">$14,610.00</span>
                  </div>
                </div>

                {/* Operating Expenses */}
                <div className="p-6 bg-rose-950/10 hover:bg-rose-900/20 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400">Operating Expenses</h3>
                    <span className="text-xl font-bold text-rose-400">$3,420.50</span>
                  </div>
                  <div className="space-y-2 pl-4 border-l-2 border-slate-800">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Office Rent</span>
                      <span className="font-mono text-slate-300">$2,100.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Software (Theraflow, Google)</span>
                      <span className="font-mono text-slate-300">$450.00</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Liability Insurance</span>
                      <span className="font-mono text-slate-300">$120.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Marketing & Advertising</span>
                      <span className="font-mono text-slate-300">$750.00</span>
                    </div>
                  </div>
                </div>

                {/* Net Income */}
                <div className="p-6 bg-amber-950/20 border-t border-amber-900/50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-wider text-amber-400">Net Operating Income</h3>
                      <p className="text-xs text-amber-500/70 mt-1">Pre-tax Profit</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-black text-amber-400">$11,189.50</span>
                      <p className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1 mt-1">
                        <TrendingUp className="w-3 h-3" /> 45% Margin
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </Card>

          </div>

          {/* Right Sidebar: AI Bookkeeper & Taxes */}
          <div className="space-y-6">
            
            {/* Tax Estimator */}
            <Card className="bg-gradient-to-br from-slate-900 to-black border-slate-800 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  <Activity className="w-4 h-4 text-amber-500" /> Q2 Estimated Taxes
                </div>
                
                <div className="mb-6">
                  <span className="text-5xl font-black text-white tracking-tighter">$3,356</span>
                  <span className="text-xl text-slate-500">.85</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Federal (15.3% SE + 12%)</span>
                    <span className="font-mono text-slate-300">$3,054.73</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-400">State (CA 9.3%)</span>
                    <span className="font-mono text-slate-300">$302.12</span>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-400">Due June 15, 2026</p>
                      <p className="text-xs text-amber-500/80 mt-1">
                        You have 35 days remaining. We recommend keeping this amount in your Theraflow Tax Reserve account.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Bookkeeper */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between text-sm uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" /> AI Bookkeeper
                  </div>
                  {aiScanning && <span className="text-[10px] text-brand-400 animate-pulse">Scanning...</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                
                <div className="space-y-4">
                  {aiScanning ? (
                    // Skeleton Loading
                    <>
                      <div className="h-16 bg-slate-800/50 animate-pulse rounded-xl border border-slate-700/50" />
                      <div className="h-16 bg-slate-800/50 animate-pulse rounded-xl border border-slate-700/50" />
                      <div className="h-16 bg-slate-800/50 animate-pulse rounded-xl border border-slate-700/50" />
                    </>
                  ) : (
                    // Loaded Transactions
                    <>
                      <div className="p-3 bg-black border border-slate-800 rounded-xl flex items-center justify-between group">
                        <div>
                          <p className="text-sm font-bold text-white">Google Workspace</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Auto-Matched
                            </span>
                            <span className="text-[10px] text-slate-500">Software & Subscriptions</span>
                          </div>
                        </div>
                        <span className="text-sm font-mono text-slate-300">-$15.99</span>
                      </div>

                      <div className="p-3 bg-black border border-slate-800 rounded-xl flex items-center justify-between group">
                        <div>
                          <p className="text-sm font-bold text-white">Office Depot #1142</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Auto-Matched
                            </span>
                            <span className="text-[10px] text-slate-500">Office Supplies</span>
                          </div>
                        </div>
                        <span className="text-sm font-mono text-slate-300">-$242.10</span>
                      </div>

                      <div className="p-3 bg-brand-900/10 border border-brand-500/30 rounded-xl flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white">Hiscox Liability Ins.</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Needs Review
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-mono text-slate-300 block">-$99.00</span>
                          <button className="text-[10px] text-brand-400 hover:text-brand-300 underline mt-1">Categorize</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
