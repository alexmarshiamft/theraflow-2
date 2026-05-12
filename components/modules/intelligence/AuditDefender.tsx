import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/lib/store';

export function AuditDefender({ role }: { role: string }) {
  const { trackedHours } = useStore();
  
  // Real Math Calculation
  const totalBBSHours = trackedHours ? trackedHours.reduce((sum, h) => sum + (h.durationMinutes / 60), 0) : 0;
  const cfcHours = trackedHours ? trackedHours
    .filter(h => h.type === 'Couples, Families, Children')
    .reduce((sum, h) => sum + (h.durationMinutes / 60), 0) : 0;
    
  const cfcRequired = 500;
  const cfcRemaining = Math.max(0, cfcRequired - cfcHours);
  
  // Calculate weeks remaining until Dec 31, 2026 (approx 33 weeks from May 11, 2026)
  const today = new Date('2026-05-11');
  const targetDate = new Date('2026-12-31');
  const weeksRemaining = Math.max(1, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7)));
  
  const cfcPerWeekNeeded = Math.ceil(cfcRemaining / weeksRemaining);
  
  // Calculate total projected hours if they continue at their recent run rate (let's say ~30 total hours logged per week)
  const projectedTotalHours = Math.round(totalBBSHours + (30 * weeksRemaining));
  return (
    <div className="mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg shadow-rose-500/5 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="h-12 w-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30 flex-shrink-0">
        <ShieldAlert className="h-6 w-6 text-rose-400" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          BBS Audit Defender: Caseload Bottleneck
        </h3>
        <p className="text-sm text-rose-900/80 dark:text-slate-300 mt-1">
          <strong className="text-rose-900 dark:text-white">Retention Risk:</strong> 
          {role === 'owner' 
            ? ` Your strongest clinician, Alexander Marshi, needs ${cfcPerWeekNeeded} more Couples/Family (CFC) hours per week to hit their December licensure target. They are a high flight risk if CFC hours aren't routed to them immediately. If CFC clients are unavailable, consider increasing their compensation to offset the licensure delay.` 
            : ` You need ${cfcPerWeekNeeded} more Couples/Family (CFC) hours per week to hit your requirement, but your caseload is near-full. Make an exit plan for December when you'll have an estimated ${projectedTotalHours.toLocaleString()} total hours.`}
        </p>
      </div>

      <div className="flex-shrink-0">
        <Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 w-full md:w-auto">
          {role === 'owner' ? "Initiate Caseload Restructure" : "Generate Exit Plan"}
        </Button>
      </div>
    </div>
  );
}
