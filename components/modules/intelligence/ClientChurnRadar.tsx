import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Activity, UserX, ArrowRight, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ClientChurnRadar() {
  return (
    <Card className="bg-slate-900/60 border-rose-500/20 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-2xl rounded-full" />
      <CardHeader className="pb-3 border-b border-white/5">
        <CardTitle className="text-lg font-bold text-white flex items-center justify-between w-full">
          <span className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-rose-400" />
            Predictive Churn Radar
          </span>
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-rose-500/10">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-slate-300">JS</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-white">John S. (ID: 4402)</h4>
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">High Risk</span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Client was consistently weekly. Recently late-canceled 2 sessions and rescheduled to bi-weekly. 
                AI attendance analysis indicates a <span className="text-rose-300 font-semibold">78% probability of premature termination</span>.
              </p>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white" size="sm">
                  Review Treatment Plan
                </Button>
                <Button className="flex-1 bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/20" size="sm">
                  Send Check-In SMS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
