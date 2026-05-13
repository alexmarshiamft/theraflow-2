'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { AccountSummary } from '@/components/modules/banking/AccountSummary';
import { TreasuryManager } from '@/components/modules/banking/TreasuryManager';
import { VirtualCardsManager } from '@/components/modules/banking/VirtualCardsManager';
import { TransactionList } from '@/components/modules/banking/TransactionList';
import dynamic from 'next/dynamic';

const CashFlowChart = dynamic(
  () => import('@/components/modules/banking/CashFlowChart').then(mod => mod.CashFlowChart),
  { ssr: false, loading: () => <div className="h-72 w-full animate-pulse bg-slate-800 rounded-xl" /> }
);
import { StatCard } from '@/components/ui/StatCard';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  DollarSign,
  TrendingUp,
  Wallet,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function BankingPage() {
  const { transactions, userRole, bankingStats } = useStore();
  const {
    totalBalance,
    monthlyRevenue,
    monthlyExpenses,
    netCashFlow,
    associateBalance,
    associateIncome,
    associateExpenses,
  } = bankingStats;

  const taxRate = 0.169;
  const grossEarnings = associateIncome / (1 - taxRate);
  const estimatedTaxes = grossEarnings - associateIncome;
  const advanceAmount = associateIncome * 0.5;

  if (userRole === 'associate') {
    return (
      <DashboardLayout>
        <div className="page-header">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="page-title">Theraflow Checking Account</h1>
              <p className="page-subtitle">Your personal account for direct deposits and expenses</p>
            </div>
            <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500" title="Theraflow is a financial technology company, not a bank. Banking services provided by TheraBank, Member FDIC.">
              Theraflow is a financial technology company, not a bank. Banking services provided by TheraBank, Member FDIC.
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <StatCard
            title="Available Balance"
            value={`$${associateBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change="Updated today"
            changeType="neutral"
            icon={Building2}
            iconColor="text-brand-500"
            iconBg="bg-brand-500/10"
          />
          <StatCard
            title="Last Deposit"
            value={`$${associateIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change="from Theraflow Payroll"
            changeType="up"
            icon={ArrowDownLeft}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-500/10"
          />
          <StatCard
            title="Monthly Spend"
            value={`$${associateExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            change="In May"
            changeType="down"
            icon={ArrowUpRight}
            iconColor="text-red-500"
            iconBg="bg-red-500/10"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <TransactionList 
              hideAdd={true}
              title="Recent Activity"
              subtitle="Theraflow Checking · Last 30 days"
            />
          </div>
          <div className="space-y-6">
            {/* Associate Virtual Card */}
            <div className="section-card p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Building2 className="h-24 w-24" />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="font-semibold tracking-wider text-sm opacity-80">THERAFLOW</div>
                  <div className="w-12 h-8 bg-gradient-to-r from-gray-300 to-gray-100 rounded-md opacity-90" />
                </div>
                <div className="mb-6">
                  <div className="text-2xl tracking-widest font-mono drop-shadow-md">**** **** **** 4829</div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Cardholder</div>
                    <div className="font-medium tracking-wide">Associate</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider opacity-60 mb-1">Valid Thru</div>
                    <div className="font-medium tracking-wide font-mono">12/28</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Paycheck & Advance */}
            <div className="section-card p-6 border-border/50 shadow-sm relative overflow-hidden group">
              {/* Subtle background glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 dark:bg-brand-400/5 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50" />
              
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-2 text-foreground font-semibold">
                  <div className="p-2 bg-brand-50 dark:bg-brand-500/10 rounded-lg text-brand-600 dark:text-brand-400">
                    <Wallet className="w-4 h-4" />
                  </div>
                  Upcoming Paycheck
                </div>
                <span className="text-xs font-medium text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-500/20">
                  May 15
                </span>
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="text-sm font-medium text-muted-foreground mb-1">Est. Net Deposit (Post-Tax)</div>
                <div className="text-4xl font-bold tracking-tight text-foreground">${associateIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center mt-2">
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  +58.9% from last period
                </p>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-center justify-between text-sm py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Gross Earnings</span>
                  <span className="font-medium text-foreground">${grossEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Est. Taxes (16.9%)</span>
                  <span className="font-medium text-red-500 dark:text-red-400">-${estimatedTaxes.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between text-sm py-2.5 border-b border-border/40">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md text-xs">
                    <Clock className="w-3 h-3 mr-1" /> Processing
                  </span>
                </div>
                
                <div className="pt-6">
                  <button className="w-full group/btn flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] rounded-xl py-3.5 text-sm font-semibold shadow-sm">
                    Request Early Access
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-3 leading-relaxed">
                    Access up to 50% <span className="font-medium text-foreground">(${advanceAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span> instantly for a 1.5% fee.
                    <br />
                    <span className="text-[10px] opacity-70 block mt-1">
                      *Theraflow is a financial technology company, not a lender. Earned Wage Access (EWA) is subject to eligibility. Truth in Lending Act (TILA) Disclosure: The 1.5% transaction fee equates to an APR based on your repayment date. Review terms for exact APR calculations.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="page-title">Practice Banking</h1>
            <p className="page-subtitle">Manage accounts, transactions, and cash flow for your practice</p>
          </div>
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500" title="Theraflow is a financial technology company, not a bank. Banking services provided by TheraBank, Member FDIC.">
            Theraflow is a financial technology company, not a bank. Banking services provided by TheraBank, Member FDIC.
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={`$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType="neutral"
          icon={Building2}
          iconColor="text-brand-500"
          iconBg="bg-brand-500/10"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType="neutral"
          icon={ArrowDownLeft}
          iconColor="text-emerald-500"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType="neutral"
          icon={ArrowUpRight}
          iconColor="text-red-500"
          iconBg="bg-red-500/10"
        />
        <StatCard
          title="Net Cash Flow"
          value={`$${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType={netCashFlow >= 0 ? "up" : "down"}
          icon={TrendingUp}
          iconColor="text-teal-500"
          iconBg="bg-teal-500/10"
        />
      </div>

      {/* Accounts + Transactions */}
      <div className="space-y-6">
        <CashFlowChart />
        <TreasuryManager />
        <VirtualCardsManager />
        <AccountSummary />
        <TransactionList />
      </div>
    </DashboardLayout>
  );
}
