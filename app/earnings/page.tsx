'use client';

import { useStore } from '@/lib/store';
import { useToast } from '@/lib/toast';
import { CreditCard, Download, TrendingUp, Calendar, DollarSign, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function EarningsPage() {
  const userRole = useStore(state => state.userRole);
  const { showToast } = useToast();

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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <CreditCard className="h-8 w-8 text-primary" />
            Earnings & Paystubs
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your compensation and download pay statements.
          </p>
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

          <div className="section-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-muted-foreground mb-4">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-sm">Last Net Pay</h3>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight">$1,308.63</p>
              <p className="text-sm text-muted-foreground mt-1 font-medium">
                Paid on Apr 30, 2026
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
              <p className="text-3xl font-bold tracking-tight">May 15</p>
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
