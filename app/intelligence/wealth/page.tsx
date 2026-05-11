'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { WealthOptimizer } from '@/components/modules/intelligence/WealthOptimizer';
import { CPTOptimizer } from '@/components/modules/intelligence/CPTOptimizer';
import { FractionalCashflow } from '@/components/modules/intelligence/FractionalCashflow';
import { WriteOffRadar } from '@/components/modules/intelligence/WriteOffRadar';
import { PracticeValuation } from '@/components/modules/intelligence/PracticeValuation';
import { WealthGodTierFeatures } from '@/components/modules/intelligence/WealthGodTierFeatures';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WealthOptimizerPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link 
          href="/intelligence" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Intelligence Hub
        </Link>
      </div>
      
      <div className="page-header mb-8">
        <div>
          <h1 className="page-title">Wealth Command Center</h1>
          <p className="page-subtitle">Your AI CFO. Maximize reimbursements, automate profit distributions, and project enterprise value.</p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Revenue Maximization</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <CPTOptimizer />
            <WriteOffRadar />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Cashflow Automation</h2>
          <FractionalCashflow />
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Tax Strategy Simulator</h2>
          <WealthOptimizer />
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">Equity Building</h2>
          <PracticeValuation />
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-brand-400 flex items-center gap-2">
            God-Tier Optimizations
          </h2>
          <WealthGodTierFeatures />
        </section>
      </div>
      
    </DashboardLayout>
  );
}
