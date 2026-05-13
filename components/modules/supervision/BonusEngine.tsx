'use client';

import { useState } from 'react';
import { Trophy, GraduationCap, PlusCircle, Award, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export type AssociateMetrics = {
  notesOnTime: number;
  totalNotes: number;
  longSessions: number;
  totalSessions: number;
  retainedClients: number;
  totalClients: number;
  attendedSessions: number;
  bookedSessions: number;
  complianceViolations: number;
};

type BonusEngineProps = {
  metrics: AssociateMetrics;
};

export function BonusEngine({ metrics }: BonusEngineProps) {
  const [fundingAction, setFundingAction] = useState<string | null>(null);

  // Safe division to prevent NaN
  const safeDiv = (num: number, den: number) => (den === 0 ? 0 : num / den);

  const timeliness = safeDiv(metrics.notesOnTime, metrics.totalNotes) * 30;
  const sessionMax = safeDiv(metrics.longSessions, metrics.totalSessions) * 25;
  const retention = safeDiv(metrics.retainedClients, metrics.totalClients) * 20;
  const utilization = safeDiv(metrics.attendedSessions, metrics.bookedSessions) * 15;
  const compliance = metrics.complianceViolations === 0 ? 10 : 0;

  const tScore = Math.round(timeliness + sessionMax + retention + utilization + compliance);

  let tier = 3;
  let tierLabel = 'Tier 3 (No Bonus)';
  let tierColor = 'text-rose-500';
  let tierBg = 'bg-rose-500/10';

  if (tScore >= 90) {
    tier = 1;
    tierLabel = 'Tier 1 (Full Allocation)';
    tierColor = 'text-emerald-500';
    tierBg = 'bg-emerald-500/10';
  } else if (tScore >= 80) {
    tier = 2;
    tierLabel = 'Tier 2 (Partial Allocation)';
    tierColor = 'text-indigo-500';
    tierBg = 'bg-indigo-500/10';
  }

  const handleFund = (type: string) => {
    setFundingAction(type);
    setTimeout(() => {
      setFundingAction('success');
      setTimeout(() => setFundingAction(null), 2000);
    }, 1500);
  };

  return (
    <div className="mt-4 border border-slate-800 rounded-xl bg-slate-950/50 overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className={`w-4 h-4 ${tierColor}`} />
          <h4 className="text-sm font-bold text-slate-300">T-Score Performance</h4>
        </div>
        <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tierColor} ${tierBg}`}>
          {tierLabel}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-end gap-3 mb-4">
          <div className="text-4xl font-black text-white leading-none">{tScore}</div>
          <div className="text-sm font-medium text-slate-500 pb-1">/ 100</div>
        </div>

        {/* Mini progress bars */}
        <div className="space-y-2 mb-6">
          <MetricBar label="Timeliness (30%)" value={timeliness} max={30} />
          <MetricBar label="90837 Optimization (25%)" value={sessionMax} max={25} />
          <MetricBar label="Retention (20%)" value={retention} max={20} />
          <MetricBar label="Utilization (15%)" value={utilization} max={15} />
          <MetricBar label="Compliance (10%)" value={compliance} max={10} color={compliance === 10 ? 'bg-emerald-500' : 'bg-rose-500'} />
        </div>

        {/* Actionable Rewards */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tax-Advantaged Rewards</h4>
          
          {tier === 3 ? (
            <div className="flex items-start gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-xs text-rose-200">Associate is performing below Tier 2 standard. Performance Improvement Plan is recommended prior to any bonus allocation.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <RewardButton 
                icon={GraduationCap}
                label="Sec. 127 Student Loan Paydown"
                amount="$250"
                actionId="student_loan"
                currentAction={fundingAction}
                onFund={handleFund}
              />
              <RewardButton 
                icon={Award}
                label="Sec. 132 Clinical Cert (EMDR)"
                amount="$1,200"
                actionId="ceu"
                currentAction={fundingAction}
                onFund={handleFund}
              />
              {tier === 1 && (
                <RewardButton 
                  icon={PlusCircle}
                  label="Triple-Tax Free HSA Deposit"
                  amount="$100"
                  actionId="hsa"
                  currentAction={fundingAction}
                  onFund={handleFund}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value, max, color = 'bg-indigo-500' }: { label: string, value: number, max: number, color?: string }) {
  const percentage = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-[10px] font-medium text-slate-400 truncate">{label}</div>
      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${percentage}%` }} />
      </div>
      <div className="w-8 text-right text-[10px] font-bold text-slate-300">{Math.round(value)}</div>
    </div>
  );
}

function RewardButton({ 
  icon: Icon, 
  label, 
  amount, 
  actionId,
  currentAction,
  onFund 
}: { 
  icon: any, 
  label: string, 
  amount: string, 
  actionId: string,
  currentAction: string | null,
  onFund: (id: string) => void 
}) {
  const isExecuting = currentAction === actionId;
  const isSuccess = currentAction === 'success' && !isExecuting; // Simplified visual state for demo

  return (
    <button
      onClick={() => onFund(actionId)}
      disabled={currentAction !== null}
      className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 transition-all group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-slate-700 rounded-md text-slate-300 group-hover:text-white transition-colors">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-medium text-slate-200">{label}</span>
      </div>
      
      {isExecuting ? (
        <div className="w-3.5 h-3.5 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mr-1" />
      ) : isSuccess ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1" />
      ) : (
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-emerald-400">{amount}</span>
          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
        </div>
      )}
    </button>
  );
}
