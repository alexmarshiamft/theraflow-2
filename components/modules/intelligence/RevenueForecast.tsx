'use client';

import { TrendingUp, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

export function RevenueForecast() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-slate-700 transition-colors md:col-span-2">
      <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-brand-500" />
            <h3 className="text-lg font-medium text-slate-100">6-Month Revenue Forecast</h3>
          </div>
          <p className="text-sm text-slate-400">Predictive model based on historical claim success & patient retention</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white mb-1 flex items-center justify-end">
            <DollarSign className="h-6 w-6 text-slate-400" />
            1.2M
          </div>
          <p className="text-sm text-brand-400 font-medium">+18.4% Projected Growth</p>
        </div>
      </div>

      <div className="relative h-64 w-full mt-4 z-10 flex items-end justify-between gap-2 px-2">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-slate-800 pb-6 pl-2 pointer-events-none">
          {[4, 3, 2, 1, 0].map((i) => (
            <div key={i} className="w-full border-t border-slate-800/50 flex items-center">
              <span className="absolute -left-8 text-xs text-slate-600 font-medium">
                {i === 0 ? '0' : `${i * 2}50k`}
              </span>
            </div>
          ))}
        </div>

        {/* Bar Chart Visualization */}
        {[
          { month: 'Jul', actual: 45, projected: 0 },
          { month: 'Aug', actual: 52, projected: 0 },
          { month: 'Sep', actual: 60, projected: 0 },
          { month: 'Oct', actual: 0, projected: 68 },
          { month: 'Nov', actual: 0, projected: 75 },
          { month: 'Dec', actual: 0, projected: 88 },
        ].map((data, i) => (
          <div key={i} className="flex flex-col items-center flex-1 z-10 h-full justify-end group/bar">
            <div className="relative w-full max-w-[60px] flex items-end h-[calc(100%-24px)]">
              {data.actual > 0 ? (
                <div 
                  className="w-full bg-slate-700 hover:bg-slate-600 rounded-t-md transition-all duration-1000 ease-out"
                  style={{ height: active ? `${data.actual}%` : '0%', transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none">
                    ${data.actual * 2.5}k
                  </div>
                </div>
              ) : (
                <div 
                  className="w-full bg-brand-500/30 border border-brand-500/50 hover:bg-brand-500/40 rounded-t-md transition-all duration-1000 ease-out backdrop-blur-sm"
                  style={{ height: active ? `${data.projected}%` : '0%', transitionDelay: `${i * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-500/10 to-transparent"></div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-brand-900 text-brand-300 text-xs py-1 px-2 rounded pointer-events-none border border-brand-500/30">
                    ${data.projected * 2.5}k Est.
                  </div>
                </div>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium mt-2 h-6 flex items-center">
              {data.month}
              {data.projected > 0 && <span className="ml-1 text-[10px] text-brand-500">*</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
