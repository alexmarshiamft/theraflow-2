'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import {
  DollarSign,
  Users,
  Building,
  CheckCircle2,
  Sparkles,
  Receipt,
  PieChart,
  TrendingUp,
  ArrowRight,
  HeartHandshake
} from 'lucide-react';

export default function PayrollPage() {
  const [settlementState, setSettlementState] = useState<'pending' | 'processing' | 'settled'>('pending');
  const [processingStep, setProcessingStep] = useState(0);

  // Hardcoded Scenario Math (February - 4 Weeks)
  const grossIncome = 104340;
  
  // 50/50 Split
  const associateShare = grossIncome * 0.5; // $52,170
  const practiceShare = grossIncome * 0.5; // $52,170
  
  // 6 Associates
  const perAssociate = associateShare / 6; // $8,695

  // Expenses
  const supervisorPay = 16 * 200; // $3,200
  const operatingExpenses = 1500 + 150 + 150; // $1,800 (Rent, EHR, Insurance 1/12th)

  // Pre-tax Profit
  const netOperatingIncome = practiceShare - supervisorPay - operatingExpenses; // $47,170

  // Taxes
  const taxRate = 0.333; // 33.3% blended Fed+CA
  const estimatedTaxes = netOperatingIncome * taxRate; // $15,707.61

  // Final Net
  const netOwnerProfit = netOperatingIncome - estimatedTaxes; // $31,462.39

  const handleAuthorize = () => {
    setSettlementState('processing');
    setProcessingStep(0);
    
    // Simulate multi-step sequential execution (slower ticks for sub-states)
    const steps = 40;
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= steps) {
          clearInterval(interval);
          setTimeout(() => setSettlementState('settled'), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 350);
  };

  const processTasks = [
    { id: 1, label: "Formal Paystubs (PDFs)", start: 0, completing: 4, confirmed: 8 },
    { id: 2, label: "Email Delivery Confirmations", start: 8, completing: 12, confirmed: 16 },
    { id: 3, label: "6 Associate ACH Direct Deposits", start: 16, completing: 22, confirmed: 28 },
    { id: 4, label: "Federal & CA State Tax Liabilities", start: 28, completing: 34, confirmed: 40 }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Payroll & Settlement</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and authorize the end-of-month settlement for February 2026.
          </p>
        </div>
        {settlementState === 'pending' && (
          <Button 
            onClick={handleAuthorize}
            size="lg"
            className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/20"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Authorize February Settlement
          </Button>
        )}
      </div>

      {settlementState === 'processing' && (
        <div className="mb-8 max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl flex flex-col md:flex-row items-start gap-12 animate-in fade-in zoom-in-95">
          
          <div className="flex-1 w-full space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Orchestrating Settlement...</h3>
                <p className="text-sm text-slate-500">Executing institutional-grade payroll operations</p>
              </div>
            </div>
            
            <div className="w-full space-y-4">
              {processTasks.map((task) => {
                let status = 'pending';
                if (processingStep >= task.confirmed) status = 'confirmed';
                else if (processingStep >= task.completing) status = 'completing';
                else if (processingStep >= task.start) status = 'starting';

                return (
                  <div 
                    key={task.id} 
                    className={`flex items-center justify-between p-4 rounded-xl transition-all duration-500 border ${
                      status === 'confirmed' ? 'bg-emerald-50/50 border-emerald-100 text-slate-900' :
                      status === 'completing' ? 'bg-brand-50 border-brand-200 text-brand-900 shadow-sm' :
                      status === 'starting' ? 'bg-slate-50 border-slate-200 text-slate-700' :
                      'opacity-40 border-transparent text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0">
                        {status === 'confirmed' ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> :
                         (status === 'starting' || status === 'completing') ? <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin ml-0.5" /> :
                         <div className="w-2 h-2 rounded-full bg-slate-300 ml-1.5" />}
                      </div>
                      <span className="font-medium text-sm">{task.label}</span>
                    </div>
                    
                    <div className="text-xs font-mono font-semibold uppercase tracking-wider">
                      {status === 'confirmed' && <span className="text-emerald-600">Confirmed</span>}
                      {status === 'completing' && <span className="text-brand-600 animate-pulse">Completing...</span>}
                      {status === 'starting' && <span className="text-slate-500">Starting...</span>}
                      {status === 'pending' && <span className="text-slate-400">Waiting</span>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-full md:w-[26rem] shrink-0 bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative shadow-inner">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="w-48 h-48" />
            </div>
            <h4 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-6">Theraflow Impact</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              Instead of spending thousands on non-productive admin time for associates, you freed them up to take on 8 more clients each week. By eliminating manual bookkeeping, you generated thousands more this month for both you and your associates.
            </p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-brand-400 font-medium mb-1">Admin Time Saved</p>
                  <div className="text-5xl font-bold font-mono">
                    {Math.min((processingStep / 40) * 144, 144).toFixed(0)} <span className="text-xl text-slate-500">hrs</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-emerald-400 font-medium mb-1">Capital Saved</p>
                  <div className="text-5xl font-bold font-mono">
                    ${Math.min((processingStep / 40) * 2880, 2880).toFixed(0)}
                  </div>
                </div>
              </div>
              
              <div className="h-px bg-slate-800 w-full" />
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-indigo-400 font-medium mb-1">Extra Rev. Earned</p>
                  <div className="text-4xl font-bold font-mono">
                    ${Math.min((processingStep / 40) * 16694, 16694).toFixed(0)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-amber-400 font-medium mb-1">Extra People Helped</p>
                  <div className="text-4xl font-bold font-mono">
                    {Math.min((processingStep / 40) * 192, 192).toFixed(0)} <span className="text-xl text-slate-500">clients</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {settlementState === 'settled' && (
        <div className="mb-8 bg-white border border-emerald-200 rounded-2xl p-8 shadow-xl shadow-emerald-500/10 flex flex-col sm:flex-row items-center gap-6 animate-in slide-in-from-bottom-8 fade-in">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-emerald-900 mb-2">February Settlement Complete! 🎉</h2>
            <p className="text-emerald-800 text-lg">
              Phenomenal month. You grossed <strong>{formatCurrency(grossIncome)}</strong> and generated a net owner profit of <strong className="bg-emerald-200 px-2 py-0.5 rounded text-emerald-900">{formatCurrency(netOwnerProfit)}</strong> after all associate payouts, overhead, and tax liabilities. The remaining distributions are securely heading to your personal account.
            </p>
          </div>
        </div>
      )}

      {/* Main Stats Grid */}
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        
        {/* Revenue & Split Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-brand-600" />
            <h3 className="font-semibold text-slate-900">Gross Revenue & Split</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">February Collected Revenue</p>
                <p className="text-4xl font-extrabold text-slate-900">{formatCurrency(grossIncome)}</p>
              </div>
            </div>

            <div className="h-px w-full bg-slate-100" />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Practice Share (50%)</p>
                <p className="text-xl font-bold text-brand-700">{formatCurrency(practiceShare)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Associate Share (50%)</p>
                <p className="text-xl font-bold text-slate-900">{formatCurrency(associateShare)}</p>
                <p className="text-xs text-slate-400">Distributing {formatCurrency(perAssociate)} to 6 associates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expenses & Taxes Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
            <Receipt className="h-5 w-5 text-rose-500" />
            <h3 className="font-semibold text-slate-900">Overhead & Tax Liabilities</h3>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 flex items-center gap-2"><Users className="h-4 w-4" /> Supervisor Pay (16 hrs)</span>
                <span className="font-medium text-slate-900">-{formatCurrency(supervisorPay)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 flex items-center gap-2"><Building className="h-4 w-4" /> Fixed Ops (Rent, EHR, etc)</span>
                <span className="font-medium text-slate-900">-{formatCurrency(operatingExpenses)}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-900">Net Operating Income</span>
                <span className="font-bold text-slate-900">{formatCurrency(netOperatingIncome)}</span>
              </div>
              <div className="flex justify-between items-center text-rose-600">
                <span className="text-sm flex items-center gap-2">Estimated Taxes (~33.3%)</span>
                <span className="font-medium">-{formatCurrency(estimatedTaxes)}</span>
              </div>
              <p className="text-xs text-rose-400 mt-1">Federal ~24% + CA State ~9.3%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Net Owner Profit Highlight */}
      <div className="bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-2 text-center sm:text-left">
          <h2 className="text-lg font-medium text-slate-300">Net Owner Profit (Take Home)</h2>
          <p className="text-sm text-slate-400 max-w-md">
            This is your final cleared profit for February after all associate payouts, supervisor compensation, overhead, and estimated federal/state taxes have been deducted.
          </p>
        </div>
        <div className="relative z-10 shrink-0">
          <div className="text-5xl font-extrabold tracking-tight text-emerald-400">
            {formatCurrency(netOwnerProfit)}
          </div>
        </div>
      </div>

      {settlementState === 'settled' && (
        <div className="mb-8 animate-in slide-in-from-bottom-8 fade-in delay-500 fill-mode-both">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-indigo-500/20">
            <div className="p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">AI CPA S-Corp Strategy</h3>
                  <p className="text-indigo-200 text-sm">Optimizing your $31,462.39 profit distribution</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">Tax Optimized</span>
            </div>
            
            <div className="p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Strategy 1: W2 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Reasonable W-2 Salary</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(10000)}</div>
                <p className="text-xs text-slate-400">Subject to standard payroll taxes to satisfy IRS requirements.</p>
              </div>

              {/* Strategy 2: K1 */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Shareholder Distribution</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(15000)}</div>
                <p className="text-xs text-slate-400">Bypasses self-employment tax. Distributed via K-1 directly to you.</p>
              </div>

              {/* Strategy 3: Treasury */}
              <div className="bg-indigo-500/20 rounded-2xl p-6 border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <h4 className="text-indigo-200 text-sm font-medium mb-1">Business Treasury</h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(5000)}</div>
                <p className="text-xs text-slate-400">Retained in Theraflow High-Yield account earning <strong>5.1% APY</strong>.</p>
              </div>

              {/* Strategy 4: Charity */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-indigo-200 text-sm font-medium mb-1 flex items-center gap-2">
                  Charitable Giving <HeartHandshake className="h-3 w-3 text-rose-400" />
                </h4>
                <div className="text-2xl font-bold text-white mb-2">{formatCurrency(1462.39)}</div>
                <p className="text-xs text-slate-400">Tax-advantaged contribution to a Donor-Advised Fund.</p>
              </div>
            </div>

            <div className="bg-black/20 p-6 flex justify-end">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg">
                Execute S-Corp Distribution <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
    </DashboardLayout>
  );
}
