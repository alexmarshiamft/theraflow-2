'use client';

import { AlertTriangle, CheckCircle2, Clock, DollarSign, TrendingDown } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TaxEstimate {
  label: string;
  amount: number;
  category: string;
}

const estimates: TaxEstimate[] = [
  { label: 'Federal Income Tax', amount: 42_800, category: 'federal' },
  { label: 'Self-Employment Tax', amount: 18_400, category: 'federal' },
  { label: 'State Income Tax (CA)', amount: 22_100, category: 'state' },
  { label: 'Payroll Tax (Employer)', amount: 14_200, category: 'payroll' },
  { label: 'Business Property Tax', amount: 3_600, category: 'local' },
];

const categoryColors: Record<string, string> = {
  federal: 'bg-brand-500',
  state: 'bg-teal-500',
  payroll: 'bg-purple-500',
  local: 'bg-amber-500',
};

const categoryBg: Record<string, string> = {
  federal: 'bg-brand-50 border-brand-200',
  state: 'bg-teal-50 border-teal-200',
  payroll: 'bg-purple-50 border-purple-200',
  local: 'bg-amber-50 border-amber-200',
};

const categoryText: Record<string, string> = {
  federal: 'text-brand-700',
  state: 'text-teal-700',
  payroll: 'text-purple-700',
  local: 'text-amber-700',
};

const total = estimates.reduce((s, e) => s + e.amount, 0);

const quarterlyPayments = [
  { quarter: 'Q1 2024', due: 'Apr 15, 2024', amount: 25_275, status: 'paid' },
  { quarter: 'Q2 2024', due: 'Jun 17, 2024', amount: 25_275, status: 'upcoming' },
  { quarter: 'Q3 2024', due: 'Sep 16, 2024', amount: 25_275, status: 'pending' },
  { quarter: 'Q4 2024', due: 'Jan 15, 2025', amount: 25_275, status: 'pending' },
];

export function TaxSummary() {
  return (
    <div className="space-y-4">
      {/* Estimated Tax Breakdown */}
      <div className="section-card p-5">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">2024 Tax Estimate</h3>
            <p className="text-sm text-gray-500">Based on current year projections</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Estimated</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(total)}</p>
          </div>
        </div>

        {/* Bar breakdown */}
        <div className="mb-4 flex h-4 w-full overflow-hidden rounded-full">
          {estimates.map((e) => (
            <div
              key={e.label}
              className={cn('h-full transition-all', categoryColors[e.category])}
              style={{ width: `${(e.amount / total) * 100}%` }}
              title={`${e.label}: ${formatCurrency(e.amount)}`}
            />
          ))}
        </div>

        <div className="space-y-2">
          {estimates.map((e) => (
            <div key={e.label} className={cn('flex items-center justify-between rounded-lg border p-3', categoryBg[e.category])}>
              <div className="flex items-center gap-2">
                <div className={cn('h-2.5 w-2.5 rounded-full', categoryColors[e.category])} />
                <span className={cn('text-sm font-medium', categoryText[e.category])}>{e.label}</span>
              </div>
              <span className={cn('font-semibold', categoryText[e.category])}>{formatCurrency(e.amount)}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3">
          <TrendingDown className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700">
            <span className="font-semibold">{formatCurrency(12_400)} in deductions</span> identified — estimated savings of {formatCurrency(3_720)}
          </p>
        </div>
      </div>

      {/* Quarterly Payments */}
      <div className="section-card overflow-hidden">
        <div className="border-b border-gray-100 p-5">
          <h3 className="text-base font-semibold text-gray-900">Quarterly Estimated Payments</h3>
          <p className="text-sm text-gray-500">IRS Form 1040-ES schedule</p>
        </div>
        <div className="divide-y divide-gray-100">
          {quarterlyPayments.map((q) => (
            <div key={q.quarter} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                {q.status === 'paid' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                ) : q.status === 'upcoming' ? (
                  <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-300 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{q.quarter}</p>
                  <p className="text-xs text-gray-500">Due: {q.due}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn('font-semibold', q.status === 'paid' ? 'text-emerald-600' : q.status === 'upcoming' ? 'text-amber-600' : 'text-gray-500')}>
                  {formatCurrency(q.amount)}
                </p>
                <p className="text-xs capitalize text-gray-400">{q.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Status */}
      <div className="section-card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Tax Escrow Account</h3>
          <span className="text-sm font-bold text-gray-900">{formatCurrency(31_520.75)}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-teal-500"
            style={{ width: '62%' }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>62% of next quarterly payment funded</span>
          <span className="flex items-center gap-1 text-amber-600 font-medium">
            <DollarSign className="h-3 w-3" />
            {formatCurrency(15_754.25)} remaining
          </span>
        </div>
      </div>
    </div>
  );
}
