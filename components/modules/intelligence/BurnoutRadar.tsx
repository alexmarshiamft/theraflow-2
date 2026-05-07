'use client';

import { Activity, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BurnoutRadar() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-rose-500" />
            <h3 className="text-lg font-medium text-slate-100">Burnout Radar</h3>
          </div>
          <p className="text-sm text-slate-400">AI-driven staff fatigue prediction</p>
        </div>
        <div className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-medium border border-rose-500/30 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          High Risk Detected
        </div>
      </div>

      <div className="mt-8">
        <div className="space-y-6">
          {/* Provider 1 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Dr. Sarah Jenkins</span>
              <span className="text-rose-400 font-medium">92% Risk</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: active ? '92%' : '0%' }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Driven by: +15% caseload increase, consecutive cancellations.</p>
          </div>

          {/* Provider 2 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Michael Chang, LMFT</span>
              <span className="text-amber-400 font-medium">68% Risk</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-1000 ease-out delay-150"
                style={{ width: active ? '68%' : '0%' }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Driven by: Complex trauma cases, documentation backlog.</p>
          </div>

          {/* Provider 3 */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-300">Emily Thorne, LCSW</span>
              <span className="text-emerald-400 font-medium">24% Risk</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out delay-300"
                style={{ width: active ? '24%' : '0%' }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">Optimal pacing. 90% note completion rate within 24h.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
