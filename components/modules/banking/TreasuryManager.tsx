import { ShieldCheck, TrendingUp, CalendarDays, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import { useStore } from '@/lib/store';

export function TreasuryManager() {
  const { bankingStats } = useStore();
  
  // Estimate quarterly tax (Mock calculation: 3 months of revenue * 25% effective tax rate)
  const estimatedQuarterlyTax = bankingStats.monthlyRevenue * 3 * 0.25; 
  
  // Potential yield on a 3-month Treasury at 5.15% APY
  const potentialYield = estimatedQuarterlyTax * (0.0515 / 4); 

  return (
    <div className="section-card border-border/50 shadow-sm relative overflow-hidden group">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-3xl -mr-32 -mt-32 transition-opacity group-hover:opacity-100 opacity-50" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 dark:bg-emerald-400/5 rounded-full blur-3xl -ml-24 -mb-24 transition-opacity group-hover:opacity-100 opacity-50" />

      <div className="relative z-10 p-6 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 ring-1 ring-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Smart Treasury Strategy</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Optimize your idle tax liabilities</p>
            </div>
          </div>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-500/20 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            5.15% APY
          </span>
        </div>
      </div>

      <div className="relative z-10 p-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-border/50">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Estimated Q2 Tax Liability</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold tracking-tight">${estimatedQuarterlyTax.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                  <span className="text-xs text-muted-foreground">due June 15th</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Don't let your tax reserve sit idle. Lock your estimated quarterly taxes into a <strong>Short-Term Treasury CD</strong> earning <strong className="text-foreground">5.15% APY</strong>. 
            </p>
            
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <CalendarDays className="w-4 h-4" />
              <span>Auto-matures & deposits on June 10th (5 days before taxes are due)</span>
            </div>
          </div>

          <div className="w-full md:w-64 shrink-0 bg-background rounded-xl border border-border p-5 shadow-sm">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Projected Yield</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-emerald-500 font-medium">+</span>
              <span className="text-3xl font-bold text-foreground">${potentialYield.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-5">
              Risk-free return over 90 days. Backed by the US Government.
            </p>
            <button className="w-full group/btn flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] rounded-lg py-2.5 text-sm font-semibold shadow-sm">
              Lock in 5.15% APY
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-border/40 text-[11px] text-muted-foreground flex items-start gap-2">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
        <p className="leading-relaxed opacity-80">
          Treasury CDs are FDIC insured up to $250,000. Early withdrawal penalties may apply if funds are accessed before the maturity date. Rates are subject to change. Theraflow is a financial technology company, not a bank.
        </p>
      </div>
    </div>
  );
}
