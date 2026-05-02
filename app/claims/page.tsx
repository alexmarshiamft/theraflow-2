'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { useStore } from '@/lib/store';
import { formatCurrency } from '@/lib/utils';
import { FileText, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { ClaimsList } from '@/components/modules/claims/ClaimsList';

export default function ClaimsPage() {
  const { claims } = useStore();

  const totalClaims = claims.length;
  const pendingCount = claims.filter(c => c.status === 'submitted').length;
  const rejectedCount = claims.filter(c => c.status === 'rejected' || c.status === 'denied').length;
  const totalPaid = claims
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.amount, 0);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Insurance Clearinghouse</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage electronic claims (837), ERAs (835), and rejections.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Claims"
          value={totalClaims.toString()}
          icon={FileText}
          change="+12 this week"
          changeType="up"
        />
        <StatCard
          title="Pending Adjudication"
          value={pendingCount.toString()}
          icon={Clock}
          change="Awaiting ERAs"
          changeType="neutral"
        />
        <StatCard
          title="Rejections & Denials"
          value={rejectedCount.toString()}
          icon={AlertTriangle}
          change="2 new"
          changeType="down"
        />
        <StatCard
          title="Total Paid (YTD)"
          value={formatCurrency(totalPaid)}
          icon={CheckCircle}
          change="+8% vs last month"
          changeType="up"
        />
      </div>

      <div className="grid gap-6">
        <ClaimsList />
      </div>
    </DashboardLayout>
  );
}
