'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { AccountSummary } from '@/components/modules/banking/AccountSummary';
import { TransactionList } from '@/components/modules/banking/TransactionList';
import { CashFlowChart } from '@/components/modules/banking/CashFlowChart';
import { StatCard } from '@/components/ui/StatCard';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Building2,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function BankingPage() {
  const { transactions } = useStore();

  const totalBalance = transactions.reduce((acc, t) => acc + (t.type === 'credit' ? t.amount : -t.amount), 239751); // Base offset for demo
  const monthlyRevenue = transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
  const monthlyExpenses = transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
  const netCashFlow = monthlyRevenue - monthlyExpenses;

  return (
    <DashboardLayout>
      <div className="page-header">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="page-title">Practice Banking</h1>
            <p className="page-subtitle">Manage accounts, transactions, and cash flow for your practice</p>
          </div>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            FDIC Insured · $250k per account
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
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType="neutral"
          icon={ArrowDownLeft}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Monthly Expenses"
          value={`$${monthlyExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType="neutral"
          icon={ArrowUpRight}
          iconColor="text-red-500"
          iconBg="bg-red-50"
        />
        <StatCard
          title="Net Cash Flow"
          value={`$${netCashFlow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change="Updated dynamically"
          changeType={netCashFlow >= 0 ? "up" : "down"}
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
      </div>

      {/* Accounts + Transactions */}
      <div className="space-y-6">
        <CashFlowChart />
        <AccountSummary />
        <TransactionList />
      </div>
    </DashboardLayout>
  );
}
