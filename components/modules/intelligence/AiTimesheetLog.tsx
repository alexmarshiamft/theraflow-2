import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Bot, Clock, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function AiTimesheetLog() {
  return (
    <Card className="bg-slate-900/60 border-brand-500/20 shadow-xl overflow-hidden relative mt-6">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-2xl rounded-full" />
      <CardHeader className="pb-3 border-b border-white/5">
        <CardTitle className="text-lg font-bold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-brand-400" />
            AI Billing & Timesheet Automator
          </span>
          <Badge variant="default" className="bg-brand-500/20 text-brand-300 border border-brand-500/30">
            <Zap className="h-3 w-3 mr-1 inline-block" /> Live Active Tracking
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-slate-400 mb-4">
          All associate movements, clinical sessions, and documentation hours are automatically tracked in the background to eliminate manual timesheets and ensure CPT compliance.
        </p>

        <div className="space-y-4">
          {/* CPT Recoding Event */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5 flex items-start gap-3 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 group-hover:w-2 transition-all" />
            <RotateCcw className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5 ml-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-semibold text-amber-300">Auto-Recoding CPT Code</h5>
                <span className="text-xs text-slate-500">Just now</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Alexander Marshi concluded a Telehealth session at <span className="font-mono text-amber-200">39 minutes</span>. 
                The scheduled CPT code <strong className="text-rose-400 line-through">90837</strong> (53+ min) has been automatically downgraded to <strong className="text-emerald-400">90834</strong> (38-52 min) to prevent insurance clawbacks.
              </p>
            </div>
          </div>

          {/* Background Hours Tracking Event */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5 flex items-start gap-3 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500 group-hover:w-2 transition-all" />
            <Clock className="h-5 w-5 text-brand-400 flex-shrink-0 mt-0.5 ml-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-semibold text-brand-300">Passive Timesheet Tracking</h5>
                <span className="text-xs text-slate-500">12 mins ago</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Detected David Foster spending 45 minutes on clinical documentation. <strong className="text-brand-300">0.75 non-clinical hours</strong> automatically added to his weekly BBS timesheet.
              </p>
            </div>
          </div>

          {/* Compliance Validation Event */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-white/5 flex items-start gap-3 relative overflow-hidden group">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 group-hover:w-2 transition-all" />
            <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5 ml-2" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h5 className="text-sm font-semibold text-emerald-300">Timesheet Audited & Locked</h5>
                <span className="text-xs text-slate-500">4 hours ago</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Eliana Nivon's weekly timesheet was validated against her Google Calendar. 1:10 supervision ratio confirmed. <strong>Signed and locked via DocuSign</strong>.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
