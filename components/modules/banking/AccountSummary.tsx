'use client';

import { ArrowDownLeft, ArrowUpRight, Building, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: string;
  number: string;
  balance: number;
  available: number;
  routing: string;
}

const accounts: Account[] = [
  {
    id: 'ACC001',
    name: 'Practice Operating',
    type: 'Business Checking',
    number: '••••  4821',
    balance: 142_830.55,
    available: 138_200.00,
    routing: '021000021',
  },
  {
    id: 'ACC002',
    name: 'Payroll Reserve',
    type: 'Business Savings',
    number: '••••  7392',
    balance: 65_400.00,
    available: 65_400.00,
    routing: '021000021',
  },
  {
    id: 'ACC003',
    name: 'Tax Escrow',
    type: 'Money Market',
    number: '••••  1157',
    balance: 31_520.75,
    available: 31_520.75,
    routing: '021000021',
  },
];

const accountColors = [
  'from-brand-600 to-brand-800',
  'from-teal-500 to-teal-700',
  'from-purple-600 to-purple-800',
];

export function AccountSummary() {
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div className="space-y-4">
      {/* Total Balance */}
      <div className="section-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Practice Balance</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{formatCurrency(totalBalance)}</p>
            <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+8.4% vs last month</span>
            </div>
          </div>
          <div className="rounded-2xl bg-brand-50 p-4">
            <DollarSign className="h-7 w-7 text-brand-600" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">Monthly Revenue</p>
            <p className="mt-0.5 text-base font-semibold text-gray-800">{formatCurrency(105_993)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Monthly Expenses</p>
            <p className="mt-0.5 text-base font-semibold text-gray-800">{formatCurrency(62_450)}</p>
          </div>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {accounts.map((account, i) => (
          <div
            key={account.id}
            className={cn(
              'relative overflow-hidden rounded-xl p-5 text-white bg-gradient-to-br',
              accountColors[i]
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">{account.type}</p>
                <p className="mt-0.5 font-semibold">{account.name}</p>
              </div>
              <CreditCard className="h-5 w-5 text-white/60" />
            </div>
            <p className="mt-4 text-2xl font-bold">{formatCurrency(account.balance)}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-xs text-white/70">Available: {formatCurrency(account.available)}</p>
              <p className="font-mono text-xs text-white/60">{account.number}</p>
            </div>
            {/* decorative circle */}
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="section-card p-5">
        <h4 className="mb-3 text-sm font-semibold text-gray-700">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Send ACH', icon: ArrowUpRight, color: 'text-brand-600 bg-brand-50' },
            { label: 'Receive Wire', icon: ArrowDownLeft, color: 'text-teal-600 bg-teal-50' },
            { label: 'Pay Bills', icon: Building, color: 'text-purple-600 bg-purple-50' },
            { label: 'Transfer', icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
          ].map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 p-3 transition-colors hover:border-gray-200 hover:bg-gray-50"
            >
              <div className={cn('rounded-lg p-2', color)}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium text-gray-600">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
