'use client';

import { CheckCircle2, Clock, Play, Users } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { RunPayrollModal } from './RunPayrollModal';

interface PayrollRun {
  id: string;
  period: string;
  payDate: string;
  employees: number;
  grossPay: number;
  netPay: number;
  taxes: number;
  status: 'draft' | 'processing' | 'completed' | 'scheduled';
}

const currentYear = new Date().getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const currentMonthIndex = new Date().getMonth();
const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
const prevPrevMonthIndex = prevMonthIndex === 0 ? 11 : prevMonthIndex - 1;
const currentMonth = monthNames[currentMonthIndex];
const prevMonth = monthNames[prevMonthIndex];
const prevPrevMonth = monthNames[prevPrevMonthIndex];
const nextMonth = monthNames[(currentMonthIndex + 1) % 12];
const nextMonthNum = ((currentMonthIndex + 1) % 12 + 1).toString().padStart(2, '0');
const currentMonthNum = (currentMonthIndex + 1).toString().padStart(2, '0');
const prevMonthNum = (prevMonthIndex + 1).toString().padStart(2, '0');

const payrollRuns: PayrollRun[] = [
  {
    id: 'PR001',
    period: `${currentMonth} 16–31, ${currentYear}`,
    payDate: `${currentYear}-${nextMonthNum}-01`,
    employees: 12,
    grossPay: 38_400.00,
    netPay: 28_650.00,
    taxes: 9_750.00,
    status: 'draft',
  },
  {
    id: 'PR002',
    period: `${currentMonth} 1–15, ${currentYear}`,
    payDate: `${currentYear}-${currentMonthNum}-17`,
    employees: 12,
    grossPay: 37_800.00,
    netPay: 28_150.00,
    taxes: 9_650.00,
    status: 'completed',
  },
  {
    id: 'PR003',
    period: `${prevMonth} 16–30, ${currentYear}`,
    payDate: `${currentYear}-${currentMonthNum}-01`,
    employees: 11,
    grossPay: 35_200.00,
    netPay: 26_300.00,
    taxes: 8_900.00,
    status: 'completed',
  },
  {
    id: 'PR004',
    period: `${prevMonth} 1–15, ${currentYear}`,
    payDate: `${currentYear}-${prevMonthNum}-17`,
    employees: 11,
    grossPay: 34_900.00,
    netPay: 26_100.00,
    taxes: 8_800.00,
    status: 'completed',
  },
];

const statusConfig = {
  draft: { variant: 'default' as const, label: 'Draft', icon: Clock },
  processing: { variant: 'warning' as const, label: 'Processing', icon: Play },
  completed: { variant: 'success' as const, label: 'Completed', icon: CheckCircle2 },
  scheduled: { variant: 'info' as const, label: 'Scheduled', icon: Clock },
};

export function PayrollSummary() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const ytdGross = 312_500;
  const ytdTaxes = 79_300;
  const ytdNet = 233_200;

  return (
    <div className="space-y-4">
      {/* YTD Summary */}
      <div className="section-card p-5">
        <h3 className="mb-4 text-base font-semibold text-foreground">Year-to-Date Summary</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-muted/50 p-4 text-center border border-border/50">
            <p className="text-xs font-medium text-muted-foreground">Gross Pay</p>
            <p className="mt-1 text-xl font-bold text-foreground">{formatCurrency(ytdGross)}</p>
          </div>
          <div className="rounded-xl bg-red-500/5 p-4 text-center border border-red-500/10">
            <p className="text-xs font-medium text-red-500">Taxes Withheld</p>
            <p className="mt-1 text-xl font-bold text-red-500">{formatCurrency(ytdTaxes)}</p>
          </div>
          <div className="rounded-xl bg-emerald-500/5 p-4 text-center border border-emerald-500/10">
            <p className="text-xs font-medium text-emerald-500">Net Paid</p>
            <p className="mt-1 text-xl font-bold text-emerald-500">{formatCurrency(ytdNet)}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-brand-500/10 border border-brand-500/20 p-3">
          <Users className="h-4 w-4 text-brand-500 flex-shrink-0" />
          <p className="text-sm text-brand-500">
            <span className="font-semibold">12 active employees</span> · Next payroll due{' '}
            <span className="font-semibold">{nextMonth} 1, {currentYear}</span>
          </p>
        </div>
      </div>

      {/* Payroll Runs */}
      <div className="section-card overflow-hidden border border-border">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="text-base font-semibold text-foreground">Payroll Runs</h3>
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="bg-brand-600 hover:bg-brand-700">
            <Play className="h-3.5 w-3.5 mr-1.5" /> Run Payroll (AI Audit)
          </Button>
        </div>
        <div className="divide-y divide-border">
          {payrollRuns.map((run) => {
            const { variant, label } = statusConfig[run.status];
            return (
              <div key={run.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{run.period}</p>
                    <Badge variant={variant}>{label}</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Pay date: {formatDate(run.payDate)} · {run.employees} employees
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs text-muted-foreground">Gross</p>
                  <p className="font-semibold text-foreground/90">{formatCurrency(run.grossPay)}</p>
                </div>
                <div className="hidden text-right md:block">
                  <p className="text-xs text-muted-foreground">Taxes</p>
                  <p className="font-semibold text-red-500">{formatCurrency(run.taxes)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Net Pay</p>
                  <p className="font-semibold text-emerald-500">{formatCurrency(run.netPay)}</p>
                </div>
                {run.status === 'draft' && (
                  <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)}>
                    Review
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <RunPayrollModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        period={`${currentMonth} 16–31, ${currentYear}`}
      />
    </div>
  );
}
