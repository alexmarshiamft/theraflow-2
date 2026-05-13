'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { CreditCard, Download, TrendingUp, Calendar, DollarSign, FileText, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { DashboardLayout } from '@/components/layout/DashboardLayout';

import { IncentiveTracker } from '@/components/modules/intelligence/IncentiveTracker';

export default function EarningsPage() {
  const userRole = useStore(state => state.userRole);
  const { showToast } = useToast();
  
  const [payoutSpeed, setPayoutSpeed] = useState<'instant' | 'standard'>('instant');

  const paystubs = [
    { id: 'pay-004', date: '2026-04-30', period: 'Apr 13 - Apr 27', amount: 1308.63, status: 'Paid' },
    { id: 'pay-003', date: '2026-04-15', period: 'Mar 29 - Apr 12', amount: 778.82, status: 'Paid' },
    { id: 'pay-002', date: '2026-03-31', period: 'Mar 13 - Mar 28', amount: 640.95, status: 'Paid' },
    { id: 'pay-001', date: '2026-03-16', period: 'Feb 26 - Mar 12', amount: 187.92, status: 'Paid' },
  ];

  if (userRole !== 'associate') {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
          <CreditCard className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
          <p className="text-muted-foreground">
            This view is restricted to associate roles. Practice owners should use the Payroll module.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-primary" />
            Earnings & Paystubs
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your compensation and configure your payout speed.
          </p>
        </div>

        <IncentiveTracker />

        {/* Repricing Toggle */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-full bg-brand-500/5 blur-[80px] pointer-events-none" />
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-400" />
              Payout Configuration
            </h3>
            <p className="text-sm text-slate-400 max-w-lg">
              Choose between getting paid instantly by Theraflow's treasury, or wait for insurance reimbursement for a higher percentage split.
            </p>
          </div>
          
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center gap-1 shrink-0">
            <button 
              onClick={() => setPayoutSpeed('instant')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${payoutSpeed === 'instant' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Instant (40% Split)
            </button>
            <button 
              onClick={() => setPayoutSpeed('standard')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${payoutSpeed === 'standard' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Standard (50% Split)
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="section-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <DollarSign className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">YTD Gross Earnings</h3>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">$3,771.04</p>
              <p className="text-sm text-emerald-500 flex items-center gap-1 mt-1 font-medium">
                <TrendingUp className="h-3 w-3" />
                +15% vs last month
              </p>
            </div>
          </div>

          <div className="section-card p-6 flex flex-col justify-between border-brand-500/20 shadow-[0_0_20px_rgba(14,165,233,0.05)]">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Last Net Pay</h3>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-white">$1,308.63</p>
              <p className="text-sm text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                {payoutSpeed === 'instant' ? (
                  <><Zap className="h-3 w-3 text-amber-400" /> Instant Payment</>
                ) : (
                  <><Clock className="h-3 w-3 text-emerald-400" /> Standard Cleared</>
                )}
              </p>
            </div>
          </div>

          <div className="section-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Next Payday</h3>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-white">
                {payoutSpeed === 'instant' ? 'Today' : 'May 15'}
              </p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Period: Apr 28 - May 12
              </p>
            </div>
          </div>
        </div>

        <div className="section-card overflow-hidden">
          <div className="border-b border-border/50 p-5">
            <h3 className="text-base font-semibold text-foreground">Recent Paystubs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/20">
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Pay Period</th>
                  <th className="px-5 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Amount</th>
                  <th className="px-5 py-3 text-right font-semibold text-muted-foreground">Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {paystubs.map((stub) => (
                  <tr key={stub.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-5 py-4 font-medium text-foreground">
                      {new Date(stub.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{stub.period}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        {stub.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-foreground">
                      ${stub.amount.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => showToast(`Downloading paystub for ${stub.period}...`, 'success')}
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
