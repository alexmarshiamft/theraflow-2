'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { TaxSummary } from '@/components/modules/tax/TaxSummary';
import { FilingsList } from '@/components/modules/tax/FilingsList';
import { StatCard } from '@/components/ui/StatCard';
import {
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  FileText,
} from 'lucide-react';

export default function TaxPage() {
  const { filings, transactions } = useStore();

  const totalFilings = filings.length;
  const filedCount = filings.filter(f => f.status === 'filed').length;
  const pendingCount = filings.filter(f => f.status !== 'filed').length;
  
  const estimatedTax = transactions
    .filter(t => t.category === 'Tax' && t.type === 'debit')
    .reduce((acc, t) => acc + t.amount, 101100); // 101100 base for demo

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Tax Preparation</h1>
          <p className="page-subtitle">Manage tax filings, estimated payments, and financial documents</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="2024 Tax Estimate"
          value={`$${estimatedTax.toLocaleString('en-US')}`}
          change="Federal, state & payroll"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatCard
          title="Filings This Year"
          value={totalFilings.toString()}
          change={`${filedCount} filed, ${pendingCount} pending`}
          changeType="neutral"
          icon={FileText}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Estimated Deductions"
          value="$12,400"
          change="$3,720 in tax savings"
          changeType="up"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Next Payment Due"
          value="Jun 17"
          change="Q2 2024"
          changeType="down"
          icon={AlertTriangle}
          iconColor="text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <TaxSummary />
        </div>
        <div className="xl:col-span-3">
          <FilingsList />
        </div>
      </div>
    </DashboardLayout>
  );
}
