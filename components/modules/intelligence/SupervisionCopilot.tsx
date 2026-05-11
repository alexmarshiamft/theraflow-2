import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Users, AlertTriangle, Lightbulb, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SupervisionCopilot() {
  return (
    <Card className="bg-slate-900/80 border-purple-500/20 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />
      <CardHeader className="pb-3 border-b border-white/5 bg-slate-800/30">
        <CardTitle className="text-lg font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-400" />
            AI Supervision Copilot
          </span>
          <span className="text-xs text-purple-300 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
            Next 1:1 in 2 Hours
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Subject: Alexander Marshi, AMFT</h4>
          <p className="text-sm text-slate-400">
            The AI has analyzed Alexander's clinical week and generated the following agenda for your supervision session.
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-semibold text-amber-300">Acuity Spike Detected</h5>
              <p className="text-xs text-slate-300 mt-1">Alexander took on 2 new couples with high-conflict indicators. Suggest reviewing case conceptualization and boundary setting.</p>
            </div>
          </div>

          <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-semibold text-rose-300">Compliance Warning</h5>
              <p className="text-xs text-slate-300 mt-1">Client attendance dropped 4%. Check for counter-transference or signs of burnout causing schedule slippage.</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-semibold text-emerald-300">Suggested Action</h5>
              <p className="text-xs text-slate-300 mt-1">Propose utilizing the Working Condition Fringe benefit to cover EMDR Part 2 training. He is currently 94.85% compliant with notes.</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)]">
            Start Supervision Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
