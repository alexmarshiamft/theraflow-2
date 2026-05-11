'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { TaxSummary } from '@/components/modules/tax/TaxSummary';
import { FilingsList } from '@/components/modules/tax/FilingsList';
import { StatCard } from '@/components/ui/StatCard';
import {
  Wallet,
  Landmark,
  FileText,
  DollarSign,
} from 'lucide-react';

export default function TaxPage() {
  const ytdGross = 3771.04; // YTD Gross
  const ytdTaxes = 524.06; // YTD Taxes Withheld
  const ytdNet = 2850.32; // YTD Net Pay
  
  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Earnings & Taxes</h1>
          <p className="page-subtitle">Manage your W-2 earnings, pay stubs, and tax documents</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={`YTD Gross Pay`}
          value={`$${ytdGross.toLocaleString('en-US')}`}
          change="Before taxes & deductions"
          changeType="neutral"
          icon={Wallet}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatCard
          title="YTD Taxes Withheld"
          value={`$${ytdTaxes.toLocaleString('en-US')}`}
          change="Federal, State, FICA"
          changeType="neutral"
          icon={Landmark}
          iconColor="text-rose-600"
          iconBg="bg-rose-50"
        />
        <StatCard
          title="YTD Net Pay"
          value={`$${ytdNet.toLocaleString('en-US')}`}
          change="Take-home pay"
          changeType="up"
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="Available Documents"
          value="14"
          change={`12 Pay Stubs, 2 Tax Forms`}
          changeType="neutral"
          icon={FileText}
          iconColor="text-blue-500"
          iconBg="bg-blue-50"
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
