'use client';

import { Activity, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EnergyOrb } from './EnergyOrb';

export function BurnoutRadar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors h-full flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-rose-500" />
            <h3 className="text-lg font-medium text-slate-100">Burnout Radar</h3>
          </div>
          <p className="text-sm text-slate-400">AI-driven associate energy levels</p>
        </div>
        <div className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-medium border border-rose-500/30 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk Detected
        </div>
      </div>

      <div className="mt-2 flex-1 flex flex-col justify-around gap-6">
        {/* Provider 1 */}
        <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
          <EnergyOrb riskLevel={92} size="sm" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300 font-medium">Dr. Sarah Jenkins</span>
              <span className="text-rose-400 font-bold">92%</span>
            </div>
            <p className="text-xs text-slate-500 leading-tight">Critical load. +15% caseload increase.</p>
          </div>
        </div>

        {/* Provider 2 */}
        <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
          <EnergyOrb riskLevel={68} size="sm" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300 font-medium">Michael Chang, LMFT</span>
              <span className="text-amber-400 font-bold">68%</span>
            </div>
            <p className="text-xs text-slate-500 leading-tight">Elevated load. Trauma cases spike.</p>
          </div>
        </div>

        {/* Provider 3 */}
        <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
          <EnergyOrb riskLevel={24} size="sm" />
          <div className="flex-1">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300 font-medium">Emily Thorne, LCSW</span>
              <span className="text-emerald-400 font-bold">24%</span>
            </div>
            <p className="text-xs text-slate-500 leading-tight">Optimal pacing. 90% note completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

