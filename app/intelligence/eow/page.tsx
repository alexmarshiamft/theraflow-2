'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EndOfWeekSimulator } from '@/components/modules/intelligence/EndOfWeekSimulator';
import { CalendarClock } from 'lucide-react';

export default function EndOfWeekPage() {
  return (
    <DashboardLayout>
      <div className="px-8 pt-6 pb-12 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <CalendarClock className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">End of Week Automation</h1>
              <p className="text-slate-400 text-sm">Eliminate the Friday afternoon administrative scramble.</p>
            </div>
          </div>
        </div>

        {/* Simulator Component */}
        <div className="py-8">
          <EndOfWeekSimulator />
        </div>
      </div>
    </DashboardLayout>
  );
}
