'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useStore } from '@/lib/store';
import { EmployeeList } from '@/components/modules/payroll/EmployeeList';
import { PayrollSummary } from '@/components/modules/payroll/PayrollSummary';
import { StatCard } from '@/components/ui/StatCard';
import {
  Clock,
  CreditCard,
  DollarSign,
  Users,
} from 'lucide-react';

export default function PayrollPage() {
  const { employees } = useStore();

  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const onLeaveEmployees = employees.filter(e => e.status === 'on-leave').length;
  
  // Estimate next payroll based on annual salaries / 24 pay periods + hourly
  const estimatedPayroll = employees.reduce((acc, emp) => {
    if (emp.payType === 'salary') return acc + (emp.salary / 24);
    if (emp.payType === 'hourly') return acc + (emp.salary * 80); // 80 hours per pay period roughly
    return acc;
  }, 0);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1 className="page-title">Payroll Management</h1>
          <p className="page-subtitle">Manage employees, run payroll, and track compensation</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Employees"
          value={activeEmployees.toString()}
          change={`${onLeaveEmployees} on leave`}
          changeType="neutral"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatCard
          title="Next Payroll"
          value={`$${Math.round(estimatedPayroll).toLocaleString()}`}
          change="Estimated (Next Period)"
          changeType="neutral"
          icon={CreditCard}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="YTD Gross Pay"
          value="$312,500"
          change="5 payroll runs completed"
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
        />
        <StatCard
          title="YTD Taxes Withheld"
          value="$79,300"
          change="Federal + State + FICA"
          changeType="neutral"
          icon={Clock}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <PayrollSummary />
        <EmployeeList />
      </div>
    </DashboardLayout>
  );
}
