import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function AuditDefender({ role }: { role: string }) {
  return (
    <div className="mb-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-4 shadow-lg shadow-rose-500/5 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="h-12 w-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30 flex-shrink-0">
        <ShieldAlert className="h-6 w-6 text-rose-400" />
      </div>
      
      <div className="flex-1">
        <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
          BBS Audit Defender: Action Required
        </h3>
        <p className="text-sm text-slate-300 mt-1">
          <strong className="text-white">Ratio Violation Risk:</strong> 
          {role === 'owner' 
            ? " Associate Alexander Marshi has logged 11 client hours this week but only 1 supervision unit is scheduled. This violates the 1:10 BBS requirement and risks hour rejection." 
            : " You have logged 11 client hours this week but only 1 supervision unit is scheduled. This violates the 1:10 BBS requirement."}
        </p>
      </div>

      <div className="flex-shrink-0">
        <Button className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 w-full md:w-auto">
          {role === 'owner' ? "Schedule Triage Supervision" : "Request Triage Supervision"}
        </Button>
      </div>
    </div>
  );
}
