'use client';

import { Shield, ArrowRight, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function AuditSimulator() {
  const router = useRouter();

  return (
    <Card className="overflow-hidden relative bg-slate-950 border-slate-800 group hover:border-emerald-500/50 transition-colors duration-500">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors duration-500" />

      <CardHeader className="relative z-10 border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-emerald-500" />
            Insurance Audit Defense
          </CardTitle>
        </div>
        <p className="text-sm text-slate-400 mt-1">Simulate an unexpected regulatory or insurance audit to test systemic defense capabilities.</p>
      </CardHeader>

      <CardContent className="pt-6 relative z-10">
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-emerald-500/30 transition-colors">
            <Shield className="h-8 w-8 text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Full Audit Package Compilation</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
              Launch the dedicated Audit Command Center to automatically weave the "Golden Thread" across Intake, Treatment Plans, and Progress Notes.
            </p>
          </div>
          <Button 
            onClick={() => router.push('/compliance/audit-defense')}
            className="mt-4 bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Launch Command Center
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
